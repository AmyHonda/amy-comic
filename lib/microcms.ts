import { createClient } from 'microcms-js-sdk';

console.log("✅ 環境変数チェック：");
console.log("MICROCMS_SERVICE_DOMAIN:", process.env.MICROCMS_SERVICE_DOMAIN);
console.log("MICROCMS_API_KEY:", process.env.MICROCMS_API_KEY);

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
});
