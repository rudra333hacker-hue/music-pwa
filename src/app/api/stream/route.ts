import { NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get('id');

  if (!videoId) {
    return NextResponse.json({ error: 'Query parameter id is required' }, { status: 400 });
  }

  try {
    const info = await ytdl.getInfo(videoId);
    const format = ytdl.chooseFormat(info.formats, { filter: 'audioonly', quality: 'highestaudio' });

    if (!format || !format.url) {
      return NextResponse.json({ error: 'No audio format found' }, { status: 404 });
    }

    return NextResponse.json({ url: format.url });
  } catch (error) {
    console.error('Stream API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch stream URL' }, { status: 500 });
  }
}