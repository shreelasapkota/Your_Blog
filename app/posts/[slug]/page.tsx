import { Suspense } from 'react';
import { use } from 'react';
import PostContent from './PostContent';

import PostSkeleton from './PostSkeleton';

export default function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Unwrap params using React.use()
  const resolvedParams = use(params);

  return (
    <div className='min-h-screen bg-gray-900'>
      
      <Suspense fallback={<PostSkeleton />}>
        <PostContent slug={resolvedParams.slug} />
      </Suspense>
    </div>
  );
}
