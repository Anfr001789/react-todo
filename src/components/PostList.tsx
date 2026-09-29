import type { Post } from "../types/post";

// Props adalah data yang diterima oleh komponen
interface PostListProps {
    posts: Post[];
}

// Komponen untuk menampilkan daftar posting
function PostList({ posts }: PostListProps) {
    // Jika array kosong, tampilkan pesan
    if (posts.length === 0) {
        return <p>Belum ada data posting.</p>;
    }

    return (
        <section>
            <h2>Daftar Posting</h2>

            <div className="post-grid">
                {posts.map(function (post) {
                    return (
                        <article className="post-card" key={post.id}>
                            <small>Posting #{post.id}</small>

                            <h3>{post.title}</h3>

                            <p>{post.body}</p>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default PostList;
