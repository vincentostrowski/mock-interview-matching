import { Link } from "react-router-dom";
import tmacc from "../assets/Tmacc.png";

const Navbar = () => {
  return (
    <nav className="navbar flex justify-between items-center p-4 bg-black text-white">
      <div className="flex items-center gap-4">
        <Link to="/">
          <img src={tmacc} alt="tmacc" className="w-14" />
        </Link>
        <Link to="/interview">Interview</Link>
        <Link to="/schedule">Schedule</Link>
        <Link to="/history">History</Link>
        <Link to="/resources">Resources</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
