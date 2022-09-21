import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Popper from '@mui/material/Popper';
import { Box } from '@mui/material';
import { red } from '@mui/material/colors';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import HomeIcon from '@mui/icons-material/Home';
// import TopicIcon from '@mui/icons-material/Topic';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import ModalInfo from 'components/ModalInfo';
import FooterContainer from 'components/FooterContainer/FooterContainer';
import './FooterMobileUser.css';
import '../AuthForm/AuthForm.css';
import SelectLanguage from 'components/SelectLanguage';

const FooterMobileUser = () => {
  const [email] = useState(localStorage.getItem('email') || '');
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenModal = () => setIsOpen(true);

  /**popper functionality */
  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const openPoper = Boolean(anchorEl);

  const id = openPoper ? 'simple-popper' : undefined;

  /** because there is no user in localStorage after rewrite we are changing functionality in other components */
  const handleExitFromAccount = () => {
    localStorage.setItem('name', '');
    localStorage.setItem('email', '');
    localStorage.setItem('profilePic', '');
    localStorage.setItem('language', '');
    /** reload page */
    document.location.reload();
  };

  return (
    <>
      {email && (
        <FooterContainer>
          <div className="footer__icon">
            <HelpCenterIcon
              color="secondary"
              fontSize="large"
              onClick={handleOpenModal}
            />
          </div>
          {/* icon translation link to page*/}
          <div className="footer__icon">
            <NavLink to="/translate">
              <GTranslateIcon fontSize="large" color="primary" />
            </NavLink>
            {/* sx={{ fontSize: 30 }} */}
          </div>
          <div className="footer__icon">
            <HomeIcon
              // className="footer__icon"
              color="primary"
              fontSize="large"
              onClick={handleClick}
            />
          </div>
          <Popper id={id} open={openPoper} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
              поки-що в розробці
            </Box>
          </Popper>
          <div className="footer__icon">
            {/* <TopicIcon color="success" fontSize="large" onClick={handleClick} /> */}
            <SelectLanguage />
          </div>
          <div className="footer__icon">
            <ExitToAppIcon
              sx={{ color: red[500] }}
              fontSize="large"
              onClick={handleExitFromAccount}
            />
          </div>
        </FooterContainer>
      )}
      <ModalInfo onOpen={isOpen} onSetOpen={setIsOpen} />
    </>
  );
};

export default FooterMobileUser;
