"use client";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";

const NewPostPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [featureImage, setFeatureImage] = useState<File | null>(null);
  const [mainImage, setMainImage] = useState<File | null>(null);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("shortDescription", shortDescription);
    formData.append("fullDescription", fullDescription);
    if (featureImage) formData.append("featureImage", featureImage);
    if (mainImage) formData.append("mainImage", mainImage);

    const res = await fetch("http://localhost:4000/api/posts", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      console.error("Failed to create post");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Short Description</label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Full Description</label>
          <textarea
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Feature Image</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setFeatureImage)}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Main Image</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setMainImage)}
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700 transition"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default NewPostPage;