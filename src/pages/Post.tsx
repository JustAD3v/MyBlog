import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Post() {

    const { slug } = useParams(); 

    const posts = import.meta.glob("../posts/*.md", {
        eager: true,
        query: "?raw",
        import: "default",
    });

    const path = `../posts/${slug}.md`;

    console.log(path);
    console.log(posts);

    const content = posts[path];

    if (!content) {
        return (
            <div> Post not found </div>
        );
    }

    return (
        <div className="card">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {content as string}
            </ReactMarkdown>
        </div>
    );
}

export default Post;