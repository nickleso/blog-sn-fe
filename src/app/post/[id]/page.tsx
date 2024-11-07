import { Post } from "@/app/types/post";

const fetchPost = async (id: string): Promise<Post> => {
  const res = await fetch(`http://localhost:4000/api/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  const data = await res.json();
  return data.data;
};

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const post = await fetchPost(id);

  return (
    <div className="max-w-2xl mx-auto">
      <img
        src={`http://localhost:4000/${post.mainImageUrl}`}
        alt={post.title}
        className="w-full h-80 object-cover rounded-lg"
      />
      <h1 className="text-3xl font-bold mt-4">{post.title}</h1>
      <p className="mt-2 text-gray-700">{post.fullDescription}</p>
    </div>
  );
}
