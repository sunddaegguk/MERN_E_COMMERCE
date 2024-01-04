import React, { useContext } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { useRef } from 'react';
import nav_dropdown from '../Assets/dropdown_icon.png';
const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </div>
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu('shop');
          }}
        >
          <Link style={{ textDecoration: 'none' }} to="/">
            Shop
          </Link>
          {menu === 'shop' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('mens');
          }}
        >
          <Link style={{ textDecoration: 'none' }} to="mens">
            Mens
          </Link>
          {menu === 'mens' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('womens');
          }}
        >
          <Link style={{ textDecoration: 'none' }} to="womens">
            Womens
          </Link>
          {menu === 'womens' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('kids');
          }}
        >
          <Link style={{ textDecoration: 'none' }} to="kids">
            Kids
          </Link>
          {menu === 'kids' ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/cart">
          <img src={cart_icon} alt="cart_icon" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
