import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { signInWithGoogle } from '../../service/firebase';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import ModalInfo from 'components/ModalInfo';
import FooterContainer from 'components/FooterContainer';
import ButtonGoogleAuth from 'components/ButtonGoogleAuth';
import './AuthForm.css';

function AuthForm() {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [isOpen, setIsOpen] = useState(false);

  /** isOpen modal for transition to user acount*/
  const handleOpenModal = () => setIsOpen(true);

  /** get request to avtorisation by google acount*/
  const handleSubmit = () => {
    setEmail('setEmail');
    /** get request to avtorisation by google acount */
    signInWithGoogle();
  };

  /** it's order to update user page  */
  const handleUpDateUserInterface = () => {
    document.location.reload();
  };

  return (
    <>
      <FooterContainer>
        {/* иконка инфо */}
        <HelpCenterIcon
          color="secondary"
          fontSize="large"
          onClick={handleOpenModal}
        />
        {/* icon translation link to page*/}
        <NavLink to="/translate">
          <GTranslateIcon fontSize="large" color="primary" />
        </NavLink>
        {!email ? (
          <ButtonGoogleAuth
            handleSubmit={handleSubmit}
            text={'Го реєструватись via Google'}
          />
        ) : (
          <div className="screensaver">
            <ButtonGoogleAuth
              handleSubmit={handleUpDateUserInterface}
              text={'Go finished'}
            />
          </div>
        )}
      </FooterContainer>{' '}
      {/* Modal */}
      <ModalInfo onOpen={isOpen} onSetOpen={setIsOpen} />
    </>
  );
}

export default AuthForm;
