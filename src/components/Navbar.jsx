import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 p-4 mb-6">
      <div className="container mx-auto flex gap-6">
        <Link
          to="/"
          className="text-white hover:text-blue-400 font-medium transition"
        >
          User
        </Link>
        <Link
          to="/admin"
          className="text-white hover:text-blue-400 font-medium transition"
        >
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
