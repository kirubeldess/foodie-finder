import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";

export function SearchBar({ onSearch, searchTerm, setSearchTerm }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="flex w-full max-w-md items-center space-x-3 rounded-lg bg-white shadow-md p-1.5">
      <Input
        type="text"
        placeholder="Search for a meal..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow bg-transparent border-none focus:ring-0 focus:outline-none text-gray-800 placeholder-gray-400"
      />
      <Button
        onClick={() => onSearch(searchTerm)}
        className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-2 rounded-md shadow"
      >
        <SearchIcon className="h-5 w-5" />
        <span>Search</span>
      </Button>
    </div>
  );
}
