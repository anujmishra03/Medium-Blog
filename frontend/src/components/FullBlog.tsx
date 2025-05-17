import { useState } from "react";
import type { Blog } from "../hooks";
import { Appbar } from "./Appbar";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const [showFull, setShowFull] = useState(false);

  const previewTitle = blog.title.length > 60 ? blog.title.slice(0, 60) + "..." : blog.title;
  const previewContent = blog.content.length > 300 ? blog.content.slice(0, 300) + "..." : blog.content;

  // Format the publish date to include full date and time
  const formattedDateTime = new Date(blog.publishDate).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Appbar />

      <main className="flex justify-center px-6 py-10">
        <article className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {showFull ? blog.title : previewTitle}
            </h1>
            <p className="text-sm text-gray-500">
              Posted on <time dateTime={blog.publishDate}>{formattedDateTime}</time> by{" "}
              <span className="font-medium">{blog.author?.name || "Unknown Author"}</span>
            </p>
          </header>

          <section className="prose max-w-none mb-4">
            {showFull ? blog.content : previewContent}
          </section>

          {!showFull && (
            <span
              onClick={() => setShowFull(true)}
              className="text-blue-600 hover:underline cursor-pointer text-sm"
            >
              Read More
            </span>
          )}
        </article>
      </main>
    </div>
  );
};
