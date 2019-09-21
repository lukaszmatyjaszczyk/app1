import React from 'react';
import { NavLink  } from 'react-router-dom';
import './Menu.css';

const Menu = () => (
  <ul className="topMenu">
    <li><NavLink  to="/home" activeClassName="active">HOME</NavLink ></li>
    <li><NavLink  to="/about-us" activeClassName="active">ABOUT US</NavLink ></li>
  </ul>
);

export default Menu;