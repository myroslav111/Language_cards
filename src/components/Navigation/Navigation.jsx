import React from 'react';
import { NavLink } from 'react-router-dom';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import StyleIcon from '@mui/icons-material/Style';
import './Navigation.css';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

function Navigation() {
  const [name] = useState(localStorage.getItem('name') || '');
  const [image] = useState(localStorage.getItem('profilePic') || '');
  console.log(image);
  return (
    <div className="header">
      <div className="header__wrap">
        <NavLink to="/" className="link">
          <LibraryAddIcon />
        </NavLink>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <img
            alt={name}
            src="https://lh3.googleusercontent.com/a-/AFdZucqsMvYj4eU7s0ctgAB71fdJ2rRawqIVOznviNr8Rg=s96-c"
          /> */}
          <Avatar alt={name} src={image} />
          <span className="name">{name}</span>
        </Stack>
        <NavLink to="/cards" className="link">
          <StyleIcon />
        </NavLink>
      </div>
    </div>
  );
}

export default Navigation;
