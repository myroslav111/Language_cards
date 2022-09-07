import React from 'react';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import HomeIcon from '@mui/icons-material/Home';
import TopicIcon from '@mui/icons-material/Topic';
// import GoogleIcon from '@mui/icons-material/Google';
import { red } from '@mui/material/colors';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Typography from '@mui/material/Typography';
import './FoterMobile.css';
import { Box } from '@mui/material';
import StyleIcon from '@mui/icons-material/Style';
import AddIcon from '@mui/icons-material/Add';
// import Box from '@mui/material/Box';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Popper from '@mui/material/Popper';
import '../AuthForm/AuthForm.css';

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

function FoterMobile() {
  const [email] = useState(localStorage.getItem('email') || '');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const openPoper = Boolean(anchorEl);
  const id = openPoper ? 'simple-popper' : undefined;

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
    <>
      {email && (
        <div className="footer__wrap">
          <div className="footer">
            <HelpCenterIcon
              color="secondary"
              fontSize="large"
              onClick={handleOpen}
            />
            <HomeIcon color="primary" fontSize="large" onClick={handleClick} />
            <Popper id={id} open={openPoper} anchorEl={anchorEl}>
              <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                поки-що в розробці
              </Box>
            </Popper>
            <TopicIcon color="success" fontSize="large" onClick={handleClick} />
            <ExitToAppIcon
              sx={{ color: red[500] }}
              fontSize="large"
              onClick={handleExit}
            />
          </div>
          <CSSTransition
            in={open}
            unmountOnExit
            classNames="fades"
            timeout={250}
          >
            {/* модалка */}
            <div className="user__modal" onClick={onClickBackdrop}>
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
        </div>
      )}
    </>
  );
}

export default FoterMobile;
