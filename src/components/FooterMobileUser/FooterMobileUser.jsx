import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Popper from '@mui/material/Popper';
import { Box } from '@mui/material';
import { red } from '@mui/material/colors';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import HomeIcon from '@mui/icons-material/Home';
import TopicIcon from '@mui/icons-material/Topic';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import ModalInfo from 'components/ModalInfo';
import FooterContainer from 'components/FooterContainer/FooterContainer';
import './FooterMobileUser.css';
import '../AuthForm/AuthForm.css';

const FooterMobileUser = () => {
  const [email] = useState(localStorage.getItem('email') || '');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const openPoper = Boolean(anchorEl);
  const id = openPoper ? 'simple-popper' : undefined;

  const handleExit = () => {
    localStorage.setItem('name', '');
    localStorage.setItem('email', '');
    localStorage.setItem('profilePic', '');

    document.location.reload();
  };

  return (
    <>
      {email && (
        // <div className="footer__wrap">
        //   <div className="footer">
        <FooterContainer>
          <HelpCenterIcon
            className="footer__icon"
            color="secondary"
            fontSize="large"
            onClick={handleOpen}
          />
          {/* icon translation link to page*/}
          <NavLink to="/translate">
            <GTranslateIcon fontSize="large" color="primary" />
          </NavLink>

          <HomeIcon
            className="footer__icon"
            color="primary"
            fontSize="large"
            onClick={handleClick}
          />
          <Popper id={id} open={openPoper} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
              поки-що в розробці
            </Box>
          </Popper>

          <TopicIcon
            className="footer__icon"
            color="success"
            fontSize="large"
            onClick={handleClick}
          />

          <ExitToAppIcon
            className="footer__icon"
            sx={{ color: red[500] }}
            fontSize="large"
            onClick={handleExit}
          />
        </FooterContainer>
        //   </div>
        // </div>
      )}
      <ModalInfo onOpen={open} onSetOpen={setOpen} />
    </>
  );
};

export default FooterMobileUser;
