import React from 'react';
import { singInWithGoogle } from '../../index';
import { useState, useEffect } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import StyleIcon from '@mui/icons-material/Style';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AddIcon from '@mui/icons-material/Add';

import './AuthForm.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AuthForm() {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [src] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [bool, setBool] = useState(false);
  useEffect(() => {}, [email]);

  const handleSubmit = () => {
    setEmail('ysetEmail');
    singInWithGoogle();
  };

  const handleUpDate = () => {
    document.location.reload();

    // setBool(true);
  };

  return (
    <>
      {!email ? (
        <div className="google-btn" onClick={handleSubmit}>
          <div className="google-icon-wrapper">
            <img className="google-icon" src={src} alt="icon" />
          </div>
          <p className="btn-text">
            <b className="text-g">го реєструватись через google</b>
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
      <div className="info" onClick={handleOpen}>
        <InfoIcon />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title">
            {/* <span className="modal-text">
              додайте слова в поле вводу, потім натисніть кнопку +, все готово.
              летс го вчитись
            </span> */}
            <span className="modal-text">-додайте слова в поле вводу</span>
            <br />
            <span className="modal-text">-потім натисніть кнопку +</span>
            <br />
            <span className="modal-text">-все готово. летс го вчитись 🚀</span>
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
            <span className="modal-text"> - Місце де додають картки</span>
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
          >
            <AddIcon fontSize="small" color="success" />
            <span className="modal-text"> - кнопка додає слова до карток</span>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default AuthForm;
