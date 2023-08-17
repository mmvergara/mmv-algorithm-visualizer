import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="bg-cyan-800 py-4">
      <Link
        href="/"
        className="font-semibold hover:underline underline-offset-2 p-4"
      >
        Algorithm Visualizer | Home
      </Link>
    </nav>
  );
};

export default NavBar;
