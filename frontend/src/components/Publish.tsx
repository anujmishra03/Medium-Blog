import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { Appbar } from "./Appbar";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
          published: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/blogs");
    } catch (error) {
      console.error("Error publishing blog:", error);
      setError("Failed to publish blog. Please try again.");
    }
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-[90%] max-w-xl">
          <h2 className="text-xl font-bold mb-4">Publish New Blog</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 mb-4 w-full"
            rows={5}
          />
          <button
            onClick={handlePublish}
            className={`px-4 py-2 rounded-lg text-white ${
              !title.trim() || !content.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500"
            }`}
            disabled={!title.trim() || !content.trim()}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};
