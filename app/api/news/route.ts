import { NextResponse } from 'next/server';
import { createClient } from 'microcms-js-sdk';

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
});

export async function GET() {
  const data = await client.get({ endpoint: 'news' });
  return NextResponse.json(data);
}
