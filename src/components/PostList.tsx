import { Link } from "react-router-dom";

import PostCard from "./PostCard";

const posts = import.meta.glob("../posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const postList = Object.keys(posts).map(name => name?.split('/')?.at(-1)?.split('.')[0]);

console.log(postList);

function PostList() {

    return (
        <div>
            {postList.map((post) => (
                <Link to={`/posts/${post}`}>
                    <PostCard title={post || "default"}/>
                </Link>
                
            ))}
        </div>
    );
}

export default PostList;
