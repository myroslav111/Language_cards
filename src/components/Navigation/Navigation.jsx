import React from 'react';
import { NavLink } from 'react-router-dom';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import StyleIcon from '@mui/icons-material/Style';
import './Navigation.css';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import 'animate.css';

function Navigation() {
  const [name] = useState(localStorage.getItem('name') || '');
  const [image] = useState(localStorage.getItem('profilePic') || '');

  return (
    <div className="header">
      <div className="header__wrap">
        <NavLink to="/" className="link">
          <LibraryAddIcon />
        </NavLink>
        {/* иконка фотки б аватар */}
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
