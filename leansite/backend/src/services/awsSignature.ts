// AWS Signature Version 4 signing key (zero-dependency).
import crypto from 'node:crypto';

export function calculateAwsSigV4Key(
  secretKey: string,
  dateStamp: string,
  regionName: string,
  serviceName: string
): Buffer {
  const kSecret = Buffer.from('AWS4' + secretKey, 'utf8');
  const kDate = crypto.createHmac('sha256', kSecret).update(dateStamp).digest();
  const kRegion = crypto.createHmac('sha256', kDate).update(regionName).digest();
  const kService = crypto.createHmac('sha256', kRegion).update(serviceName).digest();
  return crypto.createHmac('sha256', kService).update('aws4_request').digest();
}
