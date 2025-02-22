"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !summary || !content) {
      setError("All fields are required.");
      return;
    }

    const newPost = {
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      title,
      summary,
      content,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      router.push("/"); // Redirect back to homepage
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Something went wrong. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Create a New Blog Post</h1>

        {error && <p className="text-red-400">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Summary"
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <textarea
            placeholder="Write your content here..."
            className="w-full p-3 rounded bg-gray-700 text-white h-40 focus:outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
          >
            Publish Post
          </button>
        </form>

        <button
          onClick={() => router.push("/")}
          className="mt-4 text-gray-400 hover:underline"
        >
          Back to Blog
        </button>
      </div>
    </div>
  );
};

export default NewPost;
