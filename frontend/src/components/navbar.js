import React, { useContext } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { BsAmazon } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/appContext";
import { Link } from "react-router-dom";
import { SlLogout } from "react-icons/sl";

const Navbar = ({ openSearchPage }) => {
  const { setSearchText, cart, user, appLogout, setUser, setloggedInUser } = useContext(AppContext);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const navigate = useNavigate();
  const openHomePage = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("authorization");
    setUser(null);
    setloggedInUser(null);
    appLogout();
    navigate("/login");
  };

  return (
    <nav className="homepage-nav">
      <BsAmazon />
      <h4 className="title-h4" onClick={openHomePage}>
        Amazon.in
      </h4>
      <p>
        <FaLocationDot />
        Address:
        <br />
        LPU University
      </p>
      <div className="homepage-search-container">
        <select className="category-select">
          <option value="">All</option>
          <option value="electronics">Electric</option>
          <option value="books">Books</option>
          {/* Add more categories as needed */}
        </select>
        <input type="text" onChange={handleSearch} />
        <button onClick={openSearchPage}>
          <IoSearchSharp />
        </button>
      </div>

      <div className="profile-dropdown">
        <h4 className="profile">
          <FaUser /> {user ? user.name : 'Profile'}
        </h4>
        {user && (
          <div className="dropdown-content">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>

      <h4 title={JSON.stringify(cart)}>
        <Link to="/cart" className="nav-cart-link">
          <FaShoppingCart /> Cart
        </Link>
      </h4>
      <div className="logout-button">
        <SlLogout />
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
