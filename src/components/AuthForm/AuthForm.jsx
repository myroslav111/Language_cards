import React, { useState, useEffect } from 'react';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { NavLink } from 'react-router-dom';
import { signInWithGoogle } from 'index';
import './AuthForm.css';
import ModalInfo from 'components/ModalInfo';

function AuthForm() {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [src] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {}, [email]);

  const handleSubmit = () => {
    setEmail('setEmail');
    signInWithGoogle();
  };

  const handleUpDate = () => {
    document.location.reload();
  };

  return (
    <>
      {!email ? (
        <div className="google-btn" onClick={handleSubmit}>
          <div className="google-icon-wrapper">
            <img className="google-icon" src={src} alt="icon" />
          </div>
          <p className="btn-text">
            <b className="text-g"> Го реєструватись via Google</b>
          </p>
        </div>
      ) : (
        <div className="screensaver">
          <div className="google-btn color" onClick={handleUpDate}>
            <div className="google-icon-wrapper">
              <img className="google-icon" src={src} alt="icon" />
            </div>
            <p className="btn-text text-button-green">
              <b>Go</b>
            </p>
          </div>
        </div>
      )}

      {/* icon translation link to page*/}
      <NavLink to="/translate">
        <div
          className="translate"
          // style={{
          //   background: 'white',
          //   width: '37px',
          //   height: '37px',
          //   display: 'flex',
          //   alignItems: 'center',
          //   justifyContent: 'center',
          //   borderRadius: '8px',
          // }}
        >
          <GTranslateIcon fontSize="large" color="primary" />
        </div>
      </NavLink>
      {/* иконка инфо */}
      <div
        className="info"
        onClick={handleOpen}
        // style={{
        //   background: 'white',
        //   width: '37px',
        //   height: '37px',
        //   display: 'flex',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        //   borderRadius: '8px',
        // }}
      >
        <PrivacyTipIcon fontSize="large" />
      </div>

      {/* Modal */}
      <ModalInfo onOpen={open} onSetOpen={setOpen} />
    </>
  );
}

export default AuthForm;
