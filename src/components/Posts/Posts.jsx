import PostCard from "../PostCard/PostCard";
import "./Posts.css";
const Posts = ({ posts = [] }) => (
  <div className='posts'>
    {posts.map((post) => (
      <PostCard
        key={post.id}
        title={post.title}
        body={post.body}
        id={post.id}
        cover={post.cover}
      />
    ))}
  </div>
);
export default Posts;
