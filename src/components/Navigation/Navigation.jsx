import React from 'react';
import { NavLink } from 'react-router-dom';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import StyleIcon from '@mui/icons-material/Style';
import './Navigation.css';

function Navigation() {
  return (
    <div className="header">
      <div className="header__wrap">
        <NavLink to="/" className="link">
          <LibraryAddIcon />
        </NavLink>
        <NavLink to="/cards" className="link">
          <StyleIcon />
        </NavLink>
      </div>
    </div>
  );
}

export default Navigation;
