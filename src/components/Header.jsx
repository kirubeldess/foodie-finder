import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full absolute top-0 left-0 z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tight text-white drop-shadow-md">
          Foodie Finder
        </Link>
      </div>
    </header>
  );
}
