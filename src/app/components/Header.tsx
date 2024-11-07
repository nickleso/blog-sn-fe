import Link from "next/link";

const Header = () => (
  <header className="bg-blue-500 text-white p-4 shadow-lg">
    <div className="container mx-auto flex justify-between">
      <Link href="/" className="text-2xl font-bold hover:underline">
        Home
      </Link>
      <Link href="/admin" className="text-2xl font-bold hover:underline">
        Admin
      </Link>
    </div>
  </header>
);

export default Header;
