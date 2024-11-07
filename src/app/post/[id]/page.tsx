import { Post } from "@/app/types/post";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";

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

  const dirty = "<p>Hello</p>";
  console.log(dirty);

  const sanitizedContent = DOMPurify.sanitize(post.fullDescription!, {
    USE_PROFILES: { html: true },
  });

  const markup = `<div><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam maxime ipsa necessitatibus ratione ipsam, numquam sunt atque possimus voluptas. Quidem ea doloribus eius ipsa aliquid officiis voluptatibus saepe illo id. Harum debitis autem, recusandae est quo unde nemo. </p><p className="pt-8">Dolore, sunt voluptates deleniti numquam, dolorum assumenda esse voluptatibus ducimus ad officia quis! Eius assumenda voluptas saepe quibusdam. Eligendi nemo autem perspiciatis sunt optio cum, ipsa incidunt delectus. Odit aut autem magnam iste, tempora impedit voluptatem id modi ratione ipsam nostrum est! Tenetur nostrum ea eveniet animi ipsum maiores labore modi eaque corrupti unde, minus tempore, sapiente culpa esse eligendi praesentium error!</p></div>`;

  return (
    <div className="max-w-2xl mx-auto">
      <Image
        src={
          post.mainImageUrl
            ? `http://localhost:4000/${post.mainImageUrl}`
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
