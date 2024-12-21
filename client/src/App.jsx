import 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import Home from './components/Home';     // Home Component
import Profile from './components/Profile'; // Profile Component
import Orders from './components/Orders';   // Orders Component
import Cart from './components/Cart';       // Cart Component
// import Logout from './components/Logout';   // Logout Component


// Authenticated Part of the Website
import PageNotFound from './components/Authentication/PageNOtFound';
import Password from './components/Authentication/Password';
import Recovery from './components/Authentication/Recovery';
import Register from './components/Authentication/Register';
import Reset from './components/Authentication/Reset';
import Username from './components/Authentication/Username';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Replace "component" with "element" and pass JSX components */}
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/logout" element={<Logout />} /> */}

        <Route path="/username" element={<Username />} />
        <Route path="/password" element={<Password />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pagenotfound" element={<PageNotFound />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </Router>
  );
}

export default App;
