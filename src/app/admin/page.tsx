"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Post } from "../types/post";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER;

const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch(`${BASE_URL}/api/posts`, {
    cache: "no-store",
  });
  const data = await res.json();

  return data.data.posts;
};

const AdminPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (_) {
        setError("Sorry, something went wrong 😔");
      }
    };
    loadPosts();
  }, []);

  const deletePost = async (id: string) => {
    try {
      await fetch(`${BASE_URL}/api/posts/${id}`, {
        method: "DELETE",
      });

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (_) {
      setError("Sorry, could not delete the post 😔");
    }
  };

  return (
    <>
      {" "}
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="flex flex-col">
          <button
            onClick={() => router.push("/admin/new")}
            className="bg-blue-600 text-white rounded-full mb-4 ml-auto shadow-lg hover:bg-blue-700 transition h-14 aspect-[1] text-3xl"
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
                      ? `${BASE_URL}/${post.featureImageUrl}`
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
      )}
    </>
  );
};

export default AdminPage;
