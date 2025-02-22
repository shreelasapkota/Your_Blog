import { Post } from '@/types/post';
import ListItem from './ListItem';

interface PostsProps {
  posts: Post[];
}

const Posts = ({ posts }: PostsProps) => (
  <div className='space-y-6'>
    {posts.map((post) => (
      <ListItem key={post.slug} {...post} />
    ))}
  </div>
);

export default Posts;
