// AscendQE Email Service (AWS SES REST API via SigV4)
// Native zero-dependency Node.js implementation using crypto and https

import crypto from 'node:crypto'
import https from 'node:https'
import { config } from '../config/index.js'

function calculateAwsSigV4Key(secretKey: string, dateStamp: string, regionName: string, serviceName: string): Buffer {
  const kSecret = Buffer.from('AWS4' + secretKey, 'utf8')
  const kDate = crypto.createHmac('sha256', kSecret).update(dateStamp).digest()
  const kRegion = crypto.createHmac('sha256', kDate).update(regionName).digest()
  const kService = crypto.createHmac('sha256', kRegion).update(serviceName).digest()
  const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest()
  return kSigning
}

async function executeAwsSesApiRequest(
  action: string,
  params: Record<string, string>
): Promise<{ success: boolean; error?: string; messageId?: string }> {
  const accessKey = (process.env.AWS_ACCESS_KEY_ID || config.awsAccessKeyId || '').trim()
  const secretKey = (process.env.AWS_SECRET_ACCESS_KEY || config.awsSecretAccessKey || '').trim()
  const region = (process.env.AWS_REGION || config.awsRegion || 'ap-south-1').trim()

  if (!accessKey || !secretKey) {
    const error = 'AWS credentials missing. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in GoDaddy environment variables.'
    console.error(`❌ [EmailService] ${error}`)
    return { success: false, error }
  }

  params.Action = action
  params.Version = '2010-12-01'

  const host = `email.${region}.amazonaws.com`
  const postBody = Object.keys(params)
    .sort()
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&')

  const now = new Date()
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '')
  const dateStamp = amzDate.slice(0, 8)

  const canonicalHeaders = `content-type:application/x-www-form-urlencoded; charset=utf-8\nhost:${host}\nx-amz-date:${amzDate}\n`
  const signedHeaders = 'content-type;host;x-amz-date'
  const payloadHash = crypto.createHash('sha256').update(postBody).digest('hex')
  const canonicalRequest = `POST\n/\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`

  const algorithm = 'AWS4-HMAC-SHA256'
  const credentialScope = `${dateStamp}/${region}/ses/aws4_request`
  const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${crypto.createHash('sha256').update(canonicalRequest).digest('hex')}`

  const signingKey = calculateAwsSigV4Key(secretKey, dateStamp, region, 'ses')
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex')
  const authHeader = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`

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
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            const messageIdMatch = data.match(/<MessageId>(.*?)<\/MessageId>/)
            resolve({
              success: true,
              messageId: messageIdMatch ? messageIdMatch[1] : undefined,
            })
          } else {
            let errorMsg = `AWS SES returned HTTP ${res.statusCode}`
            const msgMatch = data.match(/<Message>(.*?)<\/Message>/s)
            if (msgMatch) {
              errorMsg += `: ${msgMatch[1].trim()}`
            } else {
              errorMsg += `: ${data.replace(/<[^>]+>/g, '').trim()}`
            }
            console.error('❌ [EmailService] AWS SES error:', errorMsg)
            resolve({ success: false, error: errorMsg })
          }
        })
      }
    )

    req.on('error', (err) => {
      console.error('❌ [EmailService] Network error:', err.message)
      resolve({ success: false, error: `Network error connecting to AWS SES: ${err.message}` })
    })

    req.on('timeout', () => {
      req.destroy()
      resolve({ success: false, error: 'Connection to AWS SES timed out.' })
    })

    req.write(postBody)
    req.end()
  })
}

export interface SendEmailPayload {
  subject: string
  htmlBody: string
  textBody: string
  replyTo?: string
  attachment?: {
    filename: string
    content: Buffer
    contentType: string
  }
}

export async function sendSesEmail(payload: SendEmailPayload): Promise<{ success: boolean; error?: string; messageId?: string }> {
  const sender = (process.env.SENDER_MAIL || config.senderMail || 'hello@ascendqe.com').trim()
  const recipient = (process.env.RECIPIENT_MAIL || config.recipientMail || 'hello@ascendqe.com').trim()

  // If there is an attachment, use SendRawEmail with MIME multipart
  if (payload.attachment) {
    const boundary = `----=_Part_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    const mimeLines = [
      `From: ${sender}`,
      `To: ${recipient}`,
      payload.replyTo ? `Reply-To: ${payload.replyTo}` : '',
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
      `Content-Type: ${payload.attachment.contentType}; name="${payload.attachment.filename}"`,
      `Content-Disposition: attachment; filename="${payload.attachment.filename}"`,
      'Content-Transfer-Encoding: base64',
      '',
      payload.attachment.content.toString('base64'),
      '',
      `--${boundary}--`,
    ].filter((line) => line !== null && line !== undefined)

    const rawMime = mimeLines.join('\r\n')
    return executeAwsSesApiRequest('SendRawEmail', {
      Source: sender,
      'Destinations.member.1': recipient,
      'RawMessage.Data': Buffer.from(rawMime).toString('base64'),
    })
  }

  // Standard email without attachment via SendEmail
  const params: Record<string, string> = {
    Source: sender,
    'Destination.ToAddresses.member.1': recipient,
    'Message.Subject.Data': payload.subject,
    'Message.Subject.Charset': 'UTF-8',
    'Message.Body.Html.Data': payload.htmlBody,
    'Message.Body.Html.Charset': 'UTF-8',
    'Message.Body.Text.Data': payload.textBody,
    'Message.Body.Text.Charset': 'UTF-8',
  }

  if (payload.replyTo && payload.replyTo.includes('@')) {
    params['ReplyToAddresses.member.1'] = payload.replyTo.trim()
  }

  return executeAwsSesApiRequest('SendEmail', params)
}
