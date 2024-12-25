import  { useContext } from "react"; // Import React and useContext
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate and Link from react-router-dom
import { AppContext } from "../context/Appcontext"; // Import AppContext from the correct path
import axios from "axios"; // Import axios for making HTTP requests
import { toast } from "react-toastify"; // Import toast for notifications

import "./navbar.css"; // Import your CSS file

const Navbar = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext); // Get values from context

  // Function to send the OTP for email verification
  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
  
      if (data.success) {
        navigate('/verify-email'); // Redirect to the verification page
        toast.success(data.message); // Show success notification
      } else {
        toast.error('Failed to send verification OTP. Please try again.');
      }
    } catch (error) {
      console.error(error);  // Log error for debugging
      toast.error(error?.message || 'An error occurred while verifying the Email.');
    }
  };

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      
      if (data && data.success) {
        setUserData(null);  // Clear user data
        setIsLoggedin(false); // Update the logged-in state
        navigate('/'); // Redirect to home
        toast.success('Logged out successfully');
      } else {
        toast.error('Logout failed. Please try again.');
      }
    } catch (error) {
      toast.error(error?.message || 'An error occurred while logging out.');
    }
  };

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
          {userData ? (
            <>
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
              <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
                {userData.name[0].toUpperCase()}
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10 user-dropdown">
                  <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
                    {!userData.isAccountVerified && (
                      <li onClick={sendVerificationOtp} className="py-1 px-2 hover:bg-gray-200 cursor-pointer">
                        Verify email
                      </li>
                    )}
                    <li onClick={handleLogout} className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10">
                      Log-out
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="login-button"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
