"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Posts from "./components/Posts";
import { Post } from "@/types/post";
import SearchSidebar from "./components/SearchSidebar";

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();

        const sortedPosts = data.sort(
          (a: Post, b: Post) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setPosts(sortedPosts);
        setFilteredPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);

    const results = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(results);
  };

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
            <header className="text-white py-8 mt-16 bg-transparent text-center">
        <h1 className="text-6xl font-bold mb-2">Your Blog</h1>
        <p className="text-xl text-gray-400">Your Stories, Our Platform.</p>
      </header>

      <div className="container mx-auto p-6 flex flex-col items-center gap-8">
        {/* "Start Blogging" Button */}
        <button
          onClick={() => router.push("/new-post")}
          className="mb-6 px-8 py-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-500 flex items-center gap-2"
        >
          <span className="text-xl">+</span> Start Blogging
        </button>

        {/* Search Bar */}
        <SearchSidebar searchQuery={searchQuery} onSearch={handleSearch} />

        {/* Blog List */}
        <div className="w-full max-w-4xl grid gap-6">
          {currentPosts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No posts found.</p>
          ) : (
            <Posts posts={currentPosts} />
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
              >
                Previous
              </button>
              <span className="self-center">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
