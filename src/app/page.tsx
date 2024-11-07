import Link from "next/link";
import { Post } from "./types/post";

const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch("http://localhost:4000/api/posts", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  const data = await res.json();
  return data.data.posts;
};

export default async function HomePage() {
  const posts = await fetchPosts();

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link href={`/post/${post._id}`} key={post._id}>
          <div className="p-4 border rounded-lg shadow hover:shadow-lg transition">
            <img
              src={`http://localhost:4000/${post.featureImageUrl}`}
              alt={post.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{post.title}</h3>
            <p className="text-gray-600">{post.shortDescription}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
