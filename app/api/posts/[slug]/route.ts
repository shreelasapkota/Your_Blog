import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const postsPath = path.join(process.cwd(), 'public', 'posts.json');
    const postsData = await fs.readFile(postsPath, 'utf-8');
    const posts = JSON.parse(postsData);

    const post = posts.find((p: any) => p.slug === params.slug);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error reading post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}
