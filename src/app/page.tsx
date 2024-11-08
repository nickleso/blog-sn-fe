import Link from "next/link";
import { Post } from "./types/post";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER;

const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch(`${BASE_URL}/api/posts`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  const data = await res.json();

  return data.data.posts;
};

export default async function HomePage() {
  let posts: Post[] = [];
  let error = null;

  try {
    posts = await fetchPosts();
  } catch (_) {
    error = "Sorry, something went wrong 😔. Please try again later.";
  }

  return (
    <>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-600 text-center">No posts available 😔</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link href={`/post/${post._id}`} key={post._id}>
              <div className="flex flex-col h-full p-4 border rounded-lg shadow hover:shadow-lg transition bg-white">
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
                <p className="text-gray-600 flex-grow">
                  {post.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
