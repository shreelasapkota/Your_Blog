import { useRouter } from "next/navigation";

interface SearchSidebarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const SearchSidebar = ({ searchQuery, onSearch }: SearchSidebarProps) => {
  const router = useRouter();

  const handleStartBlogging = () => {
    router.push("/new-post"); // Redirects to the page to create a new post
  };

  return (
      <div className="relative w-full max-w-lg mx-auto mb-8">      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search posts..."
        className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchSidebar;
