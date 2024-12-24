import "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom"; // Import the Link component from react-router-dom

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className="navbar">
        <h2 className="logo">Mama Baker&apos;s</h2>
        <input
          type="search"
          placeholder="Search Your Favourite Food Item"
          className="search-input"
        />
        <div className="nav-links">
          <Link to="/" className="nav-link">
            <h2>Home</h2>
          </Link>
          <Link to="/orders" className="nav-link">
            <h2>Orders</h2>
          </Link>
          <Link to="/cart" className="nav-link">
            <h2>Cart</h2>
          </Link>
          <Link to="/profile" className="nav-link">
            <h2>Profile</h2>
          </Link>
          {/* Login button */}
          <Link to="/login">
            <button onClick={()=>navigate('/login')} className="login-button">Login</button>
            {/* <button className="flex items-center gap-2 border border-gray-500 rounded-full px-2 py-2 text-gray-800 hover:bg-gray-100">Login</button> */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
