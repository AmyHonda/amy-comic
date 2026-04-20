// app/blog/[id]/page.tsx
import '../../../styles/blog.css';

type Blog = {
    id: string;
    title: string;
    content: string;
    eyecatch?: { url: string };
    category?: { name: string };
    publishedAt: string;
};

const formatDateJP = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`,
        { cache: 'no-store' }
    );
    const blog: Blog = await res.json();

    return (
        <main className="blog-detail">
            {blog.eyecatch && (
                <img src={blog.eyecatch.url} alt={blog.title} className="blog-eyecatch" />
            )}
            <div className="blog-detail-body">
                {blog.category && (
                    <span className="blog-category">{blog.category.name}</span>
                )}
                <h1>{blog.title}</h1>
                <p className="blog-date">{formatDateJP(blog.publishedAt)}</p>
                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
            </div>
        </main>
    );
}