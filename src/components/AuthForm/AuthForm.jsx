import React, { useState } from 'react';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { NavLink } from 'react-router-dom';
import { signInWithGoogle } from 'index';
import './AuthForm.css';
import ModalInfo from 'components/ModalInfo';
import FooterContainer from 'components/FooterContainer';
import ButtonGoogleAuth from 'components/ButtonGoogleAuth';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';


function AuthForm() {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleSubmit = () => {
    setEmail('setEmail');
    signInWithGoogle();
  };

  const handleUpDate = () => {
    document.location.reload();
  };


  return (
    <>
      <FooterContainer>
        {/* иконка инфо */}
        <HelpCenterIcon
          color="secondary"
          fontSize="large"
          onClick={handleOpen}
        />
        {/* icon translation link to page*/}
        <NavLink to="/translate">
          {/* <div className="translate"> */}
          <GTranslateIcon fontSize="large" color="primary" />
          {/* </div> */}
        </NavLink>
        {!email ? (
          <ButtonGoogleAuth
            handleSubmit={handleSubmit}
            text={'Го реєструватись via Google'}
          />
        ) : (
          <div className="screensaver">
            <ButtonGoogleAuth
              handleSubmit={handleUpDate}
              text={'Go finished'}
            />
          </div>
        )}
      </FooterContainer>{' '}
      {/* Modal */}
      <ModalInfo onOpen={open} onSetOpen={setOpen} />
    </>
  );
}


export default AuthForm;