"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Post } from "../types/post";
import Image from "next/image";

const AdminPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/posts");
      const data = await res.json();

      setPosts(data.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id: string) => {
    await fetch(`http://localhost:4000/api/posts/${id}`, { method: "DELETE" });
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <button
        onClick={() => router.push("/admin/new")}
        className="bg-blue-600 text-white rounded-full mb-4 ml-auto shadow-lg hover:bg-blue-700 transition h-16 aspect-[1]"
      >
        +
      </button>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post._id}
            className="p-4 border rounded-lg shadow  bg-white"
          >
            <Image
              src={
                post.featureImageUrl
                  ? `http://localhost:4000/${post.featureImageUrl}`
                  : "/images/default.jpg"
              }
              alt={post.title}
              width={300}
              height={200}
              priority={true}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{post.title}</h3>
            <p className="text-gray-600">{post.shortDescription}</p>
            <button
              onClick={() => deletePost(post._id)}
              className="mt-2 bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
