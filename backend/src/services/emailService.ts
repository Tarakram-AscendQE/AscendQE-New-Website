// AscendQE email service: AWS SES REST API signed with SigV4 (zero-dependency, node:crypto + node:https).
import crypto from 'node:crypto';
import https from 'node:https';
import { config } from '../config/index.js';
import { calculateAwsSigV4Key } from './awsSignature.js';

export interface SendEmailResult {
  success: boolean;
  error?: string;
  messageId?: string;
}

export interface SendEmailPayload {
  subject: string;
  htmlBody: string;
  textBody: string;
  replyTo?: string;
  attachment?: {
    filename: string;
    content: Buffer;
    contentType: string;
  };
}

async function executeAwsSesApiRequest(action: string, params: Record<string, string>): Promise<SendEmailResult> {
  const { awsAccessKeyId: accessKey, awsSecretAccessKey: secretKey, awsRegion: region } = config.email;

  if (!accessKey || !secretKey) {
    const error = 'AWS credentials missing. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.';
    console.error(`[EmailService] ${error}`);
    return { success: false, error };
  }

  const requestParams: Record<string, string> = { ...params, Action: action, Version: '2010-12-01' };
  const host = `email.${region}.amazonaws.com`;
  const postBody = Object.keys(requestParams)
    .sort()
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(requestParams[key])}`)
    .join('&');

  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.slice(0, 8);

  const canonicalHeaders = `content-type:application/x-www-form-urlencoded; charset=utf-8\nhost:${host}\nx-amz-date:${amzDate}\n`;
  const signedHeaders = 'content-type;host;x-amz-date';
  const payloadHash = crypto.createHash('sha256').update(postBody).digest('hex');
  const canonicalRequest = `POST\n/\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;

  const algorithm = 'AWS4-HMAC-SHA256';
  const credentialScope = `${dateStamp}/${region}/ses/aws4_request`;
  const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${crypto.createHash('sha256').update(canonicalRequest).digest('hex')}`;

  const signingKey = calculateAwsSigV4Key(secretKey, dateStamp, region, 'ses');
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
  const authHeader = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return new Promise((resolve) => {
    const req = https.request(
      `https://${host}/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          Host: host,
          'X-Amz-Date': amzDate,
          Authorization: authHeader,
          'Content-Length': Buffer.byteLength(postBody),
        },
        timeout: 15000,
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            const messageIdMatch = data.match(/<MessageId>(.*?)<\/MessageId>/);
            resolve({ success: true, messageId: messageIdMatch ? messageIdMatch[1] : undefined });
            return;
          }
          const msgMatch = data.match(/<Message>(.*?)<\/Message>/s);
          const detail = msgMatch ? msgMatch[1].trim() : data.replace(/<[^>]+>/g, '').trim();
          const error = `AWS SES returned HTTP ${res.statusCode}: ${detail}`;
          console.error('[EmailService] AWS SES error:', error);
          resolve({ success: false, error });
        });
      }
    );

    req.on('error', (err) => {
      console.error('[EmailService] Network error:', err.message);
      resolve({ success: false, error: `Network error connecting to AWS SES: ${err.message}` });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ success: false, error: 'Connection to AWS SES timed out.' });
    });

    req.write(postBody);
    req.end();
  });
}

/** Keeps an attachment filename safe for a MIME header (no quotes or line breaks). */
function safeFilename(name: string): string {
  return name.replace(/[^\w.\- ]/g, '_').slice(0, 120) || 'attachment';
}

/** Sends an email from SENDER_MAIL to RECIPIENT_MAIL (SendRawEmail when there is an attachment). */
export async function sendSesEmail(payload: SendEmailPayload): Promise<SendEmailResult> {
  const { senderMail: sender, recipientMail: recipient } = config.email;

  if (payload.attachment) {
    const boundary = `----=_Part_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const filename = safeFilename(payload.attachment.filename);
    const mimeLines = [
      `From: ${sender}`,
      `To: ${recipient}`,
      ...(payload.replyTo ? [`Reply-To: ${payload.replyTo}`] : []),
      `Subject: =?UTF-8?B?${Buffer.from(payload.subject).toString('base64')}?=`,
      'MIME-Version: 1.0',
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      'Content-Type: text/html; charset=UTF-8',
      'Content-Transfer-Encoding: 7bit',
      '',
      payload.htmlBody,
      '',
      `--${boundary}`,
      `Content-Type: ${payload.attachment.contentType}; name="${filename}"`,
      `Content-Disposition: attachment; filename="${filename}"`,
      'Content-Transfer-Encoding: base64',
      '',
      payload.attachment.content.toString('base64'),
      '',
      `--${boundary}--`,
    ];

    return executeAwsSesApiRequest('SendRawEmail', {
      Source: sender,
      'Destinations.member.1': recipient,
      'RawMessage.Data': Buffer.from(mimeLines.join('\r\n')).toString('base64'),
    });
  }

  const params: Record<string, string> = {
    Source: sender,
    'Destination.ToAddresses.member.1': recipient,
    'Message.Subject.Data': payload.subject,
    'Message.Subject.Charset': 'UTF-8',
    'Message.Body.Html.Data': payload.htmlBody,
    'Message.Body.Html.Charset': 'UTF-8',
    'Message.Body.Text.Data': payload.textBody,
    'Message.Body.Text.Charset': 'UTF-8',
  };
  if (payload.replyTo && payload.replyTo.includes('@')) {
    params['ReplyToAddresses.member.1'] = payload.replyTo.trim();
  }

  return executeAwsSesApiRequest('SendEmail', params);
}
