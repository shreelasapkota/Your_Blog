import Link from 'next/link';
import { Post } from '@/types/post';

const ListItem = ({ slug, title, summary, date }: Partial<Post>) => {
  return (
    <div className='overflow-hidden rounded-lg bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/10'>
      <Link href={`/posts/${slug}`} className='block group'>
        {/* Date Section */}
        <p className='text-sm text-zinc-400'>{new Date(date!).toLocaleDateString()}</p>
        
        {/* Title Section */}
        <h2 className='text-2xl font-semibold tracking-tight text-zinc-100'>
          {title}
        </h2>
        
        {/* Summary Section */}
        <p className='text-zinc-400 mt-3'>{summary}</p>
        
        {/* Read More Link */}
        <p className='text-sm text-blue-400 group-hover:text-blue-100 transition-colors duration-200'>
          Read more →
        </p>
      </Link>
    </div>
  );
};

export default ListItem;
