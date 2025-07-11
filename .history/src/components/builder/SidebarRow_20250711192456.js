import React from 'react';
import { Link } from 'react-router-dom';


const SidebarMenuItem = ({ icon, label, href, onClick }) => {
    if (onClick) {
      return (
        <li className="menu-item">
          <a href="#" onClick={onClick}>
            <span><i className={`fas ${icon}`}></i> {label}</span>
          </a>
        </li>
      );
    }
  
    return (
      <li className="menu-item">
        <NavLink
          to={href}
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <span><i className={`fas ${icon}`}></i> {label}</span>
        </NavLink>
      </li>
    );
  };
  
  export default SidebarMenuItem;

  
const SidebarRow = ({ icon, label, href, onClick }) => {
  if (onClick) {
    return (
      <li className="menu-item" onClick={onClick}>
        <p>
          <span><i className={`fas ${icon}`}></i>{label}</span>
        </p>
      </li>
    );
  }

  return (
    <li className="menu-item">
      <Link to={href}>
        <span><i className={`fas ${icon}`}></i>{label}</span>
      </Link>
    </li>
  );
};

export default SidebarRow;