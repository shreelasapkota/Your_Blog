export default function PostSkeleton() {
  return (
    <div className='container mx-auto p-6 mt-16'>
      <div className='animate-pulse'>
        <div className='h-8 bg-gray-200 rounded w-3/4 mb-4'></div>
        <div className='h-4 bg-gray-200 rounded w-1/4 mb-6'></div>
        <div className='space-y-3'>
          <div className='h-4 bg-gray-200 rounded'></div>
          <div className='h-4 bg-gray-200 rounded'></div>
          <div className='h-4 bg-gray-200 rounded'></div>
        </div>
      </div>
    </div>
  );
}
