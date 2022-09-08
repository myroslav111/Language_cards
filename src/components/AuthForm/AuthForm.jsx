import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
// import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import StyleIcon from '@mui/icons-material/Style';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';

import GTranslateIcon from '@mui/icons-material/GTranslate';
import { NavLink } from 'react-router-dom';

import { signInWithGoogle } from 'index';
import './AuthForm.css';


const AuthFormMaterialUIStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxWidth: 'calc(100vw - 48px)',
  maxHeight: 'calc(100vh - 24px)',
};


function AuthForm() {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [src] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {}, [email]);

  const handleSubmit = () => {
    setEmail('setEmail');
    signInWithGoogle();
  };

  const handleUpDate = () => {
    document.location.reload();
  };

  const onClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      {!email ? (
        <div className="google-btn" onClick={handleSubmit}>
          <div className="google-icon-wrapper">
            <img className="google-icon" src={src} alt="icon" />
          </div>
          <p className="btn-text">
            <b className="text-g"> Гоу реєструватись через Google</b>
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

      <CSSTransition in={open} unmountOnExit classNames="fades" timeout={250}>
        {/* modal */}
        <div className="overlay" onClick={onClickBackdrop}>
          <Box sx={AuthFormMaterialUIStyle}>
            <Typography id="modal-modal-title">
              <span className="modal-text">- додайте слова у поле вводу</span>
              <br />
              <span className="modal-text">- потім натисніть кнопку +</span>
              <br />
              <span className="modal-text">- все готово, летс гоу вчитись 🚀 </span>
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
            >
              <StyleIcon fontSize="small" color="primary" />
              <span className="modal-text"> - Місце з картками</span>
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
            >
              <LibraryAddIcon fontSize="small" color="secondary" />
              <span className="modal-text"> - Місце, де додають картки</span>
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
            >
              <AddIcon fontSize="small" color="success" />
              <span className="modal-text">
                {' '}
                - кнопка додає слово до карток
              </span>
            </Typography>
          </Box>
        </div>
      </CSSTransition>
    </>
  );
}


export default AuthForm;