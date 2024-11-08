import { Post } from "@/app/types/post";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER;

const fetchPost = async (id: string): Promise<Post> => {
  const res = await fetch(`${BASE_URL}/api/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  const data = await res.json();
  return data.data;
};

export default async function PostDetailPage({ params }: any) {
  const { id } = await params;
  const post = await fetchPost(id);

  const sanitizedContent = DOMPurify.sanitize(post.fullDescription || "", {
    USE_PROFILES: { html: true },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <Image
        src={
          post.mainImageUrl
            ? `${BASE_URL}/${post.mainImageUrl}`
            : "/images/default.jpg"
        }
        alt={post.title}
        width={600}
        height={400}
        priority={true}
        className="w-full h-80 object-cover rounded-lg"
      />
      <h1 className="text-3xl font-bold mt-4">{post.title}</h1>
      <div
        className="text-lg mt-4"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
}
