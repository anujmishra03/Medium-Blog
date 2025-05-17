import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { Spinner } from "../components/Spinner";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return  <div className="flex justify-center items-center h-screen">
      <Spinner/>
      </div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Appbar />
      <div className="max-w-3xl mx-auto mt-6 space-y-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              authorName={blog.author.name || ""}
              title={blog.title}
              content={blog.content}
              publishDate={""}            />
          ))
        ) : (
          <div className="text-center text-gray-500">No blogs available.</div>
        )}
      </div>
    </div>
  );
};
