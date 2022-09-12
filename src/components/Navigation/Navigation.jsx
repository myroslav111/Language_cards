import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import StyleIcon from '@mui/icons-material/Style';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import 'animate.css';
import './Navigation.css';


const Navigation = () => {
  const [name] = useState(localStorage.getItem('name') || '');
  const [image] = useState(localStorage.getItem('profilePic') || '');

  
  return (
    <div className="header">
      <div className="header__wrap">
        <NavLink to="/" className="link">
          <LibraryAddIcon />
        </NavLink>
        {/* icon-photo, avatar */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar alt={name} src={image} />
          <span className="name">{name}</span>
        </Stack>
        <NavLink to="/cards" className="link ">
          <StyleIcon />
        </NavLink>
      </div>
    </div>
  );
}


export default Navigation;