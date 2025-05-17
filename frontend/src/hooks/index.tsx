import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";


export interface Blog{
  authorName: string;
  publishDate: string;
  "id": number  
  "title": string,
  "content": string,
  "author": {
    "name": string
  }
}
export const useBlog =({id}:{id: string})=>{
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlog(response.data.blog);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [id]);

  return {
    loading,
    blog,
  };

}




export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched blog data:", response.data); // ✅ Debug log
        setBlogs(response.data.blogs);
      } catch (err) {
        console.error("Failed to load blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { loading, blogs };
};
