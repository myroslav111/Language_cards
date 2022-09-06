import AuthForm from 'components/AuthForm';
import Form from 'components/Form';
import React from 'react';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CSSTransition } from 'react-transition-group';
import StyleIcon from '@mui/icons-material/Style';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';

import './AddWord.css';

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

function AddWord() {
  const [name] = useState(localStorage.getItem('name') || '');
  const [src] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleExit = () => {
    localStorage.setItem('name', '');
    localStorage.setItem('email', '');
    localStorage.setItem('profilePic', '');

    document.location.reload();
  };
  return (
    <motion.div
      style={{}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}

      // initial={{ width: 0 }}
      // animate={{ width: '100% ' }}
      // exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      {!name && (
        <div className="form__wrap">
          <Form />
        </div>
      )}

      {name && (
        <>
          <div className="form__wrap">
            <Form />
          </div>
          {/* кнопка выхода с гугла */}
          <div className="google-btn color-red" onClick={handleExit}>
            <div className="google-icon-wrapper">
              <img className="google-icon" src={src} alt="icon" />
            </div>
            <p className="btn-text">
              <b className="text-g">задовбало йду з відціль 😡</b>
            </p>
          </div>
          {/* кнопка инфо  */}
          <div className="info" onClick={handleOpen}>
            <InfoIcon />
          </div>
          <CSSTransition
            in={open}
            unmountOnExit
            classNames="fades"
            timeout={250}
          >
            {/* модалка */}
            <div className="overlay" onClick={onClickBackdrop}>
              <Box sx={style}>
                <Typography id="modal-modal-title">
                  <span className="modal-text">
                    -додайте слова в поле вводу
                  </span>
                  <br />
                  <span className="modal-text">-потім натисніть кнопку +</span>
                  <br />
                  <span className="modal-text">
                    -все готово. летс го вчитись 🚀
                  </span>
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
                  <span className="modal-text">
                    {' '}
                    - кнопка додає слова до карток
                  </span>
                </Typography>
              </Box>
            </div>
          </CSSTransition>
        </>
      )}
      {!name && <AuthForm />}
      {/* <AuthForm /> */}
    </motion.div>
  );
}

export default AddWord;
