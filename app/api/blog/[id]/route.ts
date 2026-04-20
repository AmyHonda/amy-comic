// app/api/blog/[id]/route.ts
import { NextResponse } from 'next/server';
import { createClient } from 'microcms-js-sdk';

const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
    apiKey: process.env.MICROCMS_API_KEY || '',
});

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const data = await client.get({ endpoint: 'blogs', contentId: id });
    return NextResponse.json(data);
}