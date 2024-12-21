import "react";
import "./navbar.css";
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <h2 className="logo">Mama Bakers</h2>
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
          <button className="logout-button">Sign Up</button> {/* You can add a Sign Up route here if needed */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
