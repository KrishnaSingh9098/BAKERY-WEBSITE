import 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';  // Import Home component
import Login from './Pages/Login';  // Import Login component
import Emailverify from './Pages/Emailverify';  // Import Email Verification component
import ResetPassword from './Pages/ResetPassword';  // Import Reset Password component
import Orders from './Components/Order';  // Import Orders page
import Cart from './Components/Cart';  // Import Cart page
import Profile from './Components/Profile';  // Import Profile page
import Navbar from './Components/Navbar';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify/.css'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar/>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page */}
          <Route path="/login" element={<Login />} /> {/* Login page */}
          <Route path="/verify-email" element={<Emailverify />} /> {/* Email verification */}
          <Route path="/reset-password" element={<ResetPassword />} /> {/* Reset password */}
          <Route path="/orders" element={<Orders />} /> {/* Orders page */}
          <Route path="/cart" element={<Cart />} /> {/* Cart page */}
          <Route path="/profile" element={<Profile />} /> {/* Profile page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
