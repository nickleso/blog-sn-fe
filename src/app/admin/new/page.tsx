"use client";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER;

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

    const res = await fetch(`${BASE_URL}/api/posts`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) router.push("/admin");
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
            maxLength={500}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Short Description</label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full border rounded p-2"
            maxLength={4900}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Full Description</label>
          <textarea
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            className="w-full border rounded p-2"
            maxLength={4900}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Feature Image</label>
          <div className="flex items-center space-x-2">
            <label className="bg-blue-600 text-white rounded px-4 py-2 cursor-pointer hover:bg-blue-700 transition">
              Choose Feature Image
              <input
                type="file"
                onChange={(e) => handleFileChange(e, setFeatureImage)}
                className="hidden"
              />
            </label>
            {featureImage && (
              <span className="text-gray-600">{featureImage.name}</span>
            )}
          </div>
        </div>
        <div>
          <label className="block font-medium">Main Image</label>
          <div className="flex items-center space-x-2">
            <label className="bg-blue-600 text-white rounded px-4 py-2 cursor-pointer hover:bg-blue-700 transition">
              Choose Main Image
              <input
                type="file"
                onChange={(e) => handleFileChange(e, setMainImage)}
                className="hidden"
              />
            </label>
            {mainImage && (
              <span className="text-gray-600">{mainImage.name}</span>
            )}
          </div>
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
