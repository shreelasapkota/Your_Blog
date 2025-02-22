"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const NewPostPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, summary }),
      });

      if (!response.ok) throw new Error("Failed to create post");

      setTitle("");
      setContent("");
      setSummary("");
      router.push("/");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-900 px-4 py-16">
        <div className="mx-auto max-w-2xl">
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors mb-8">
          ← Back to Blog
        </button>
        
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-zinc-100">Create a New Blog Post</h1>
      <form onSubmit={handleSubmit} className="block text-sm font-medium text-zinc-400 mb-2">
        <div className="mb-6">
          <label htmlFor="title" className="block text-lg font-semibold mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your blog title"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="summary" className="block text-lg font-semibold mb-2">Summary</label>
          <input
            type="text"
            id="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Write a brief summary"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-lg font-semibold mb-2">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here..."
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={8}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg focus:outline-none"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Post"}
        </button>

        

      </form>
    </div>
    </div>
  );
};

export default NewPostPage;
