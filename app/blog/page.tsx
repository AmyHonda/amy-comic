// app/blog/page.tsx
import Link from 'next/link';
import '../../styles/blog.css';

type Blog = {
  id: string;
  title: string;
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

export default async function BlogListPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
    cache: 'no-store',
  });
  const data = await res.json();
  const blogs: Blog[] = data.contents;

  return (
    <main className="blog-list">
      <h1>ブログ</h1>
      <div className="blog-grid">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`} className="blog-card">
            {blog.eyecatch && (
              <img src={blog.eyecatch.url} alt={blog.title} loading="lazy" />
            )}
            <div className="blog-card-body">
              {blog.category && (
                <span className="blog-category">{blog.category.name}</span>
              )}
              <p className="blog-title">{blog.title}</p>
              <p className="blog-date">{formatDateJP(blog.publishedAt)}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}