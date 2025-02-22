'use client';

import { useEffect, useState } from 'react';
import { Post } from '@/types/post';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PostContentProps {
  slug: string;
}

export default function PostContent({ slug }: PostContentProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchPost();
  }, [slug]);

  if (error) {
    return (
      <div className='container mx-auto p-16 pt-16 text-justify'>
        <h1 className='text-2xl text-red-500'>{error}</h1>
      </div>
    );
  }

  if (!post) {
    return null; // The Suspense fallback will show instead
  }

  return (
    
    <article className='container mx-auto p-16 pt-16 text-justify'>
      <Link href="/" className="inline-block mb-6 text-zinc-400 hover:text-zinc-100 transition-colors">
        ← Back to Blog
      </Link>
      
      
      <h1 className='mb-4 text-4xl font-bold tracking-tight text-zinc-100'>{post.title}</h1>
      <p className='text-gray-500 mb-8'>
        {new Date(post.date).toLocaleDateString()}
      </p>
      
      <div className='prose prose-invert prose-zinc max-w-none'>{post.content}</div>
    </article>
  );
}
