import React, { useState, useEffect } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import Box from '@mui/material/Box';
import { red } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
// import InfoIcon from '@mui/icons-material/Info';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SettingsEthernetSharpIcon from '@mui/icons-material/SettingsEthernetSharp';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import api from 'service/api';
import apiSecond from 'service/apiForRegistered';
import './Card.css';

const CardMaterialUIStyle = {
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


function Card() {
  const [state, setState] = useState(true);
  const [indexWord, setIndexWord] = useState(0);
  const [word, setWord] = useState([]);
  const [userObj, setUserObj] = useState(null);
  const [email] = useState(localStorage.getItem('email') || '');
  const [loader, setLoader] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    (async () => {
      setLoader(true);
      try {
        if (!email) {
          const data = await api.getAllWords();
          setWord(data);
        }
        if (email) {
          const dataRegistered = await apiSecond.getWordsAuth();
          const user = dataRegistered.filter(user => user.email === email);
          setUserObj(user[0]);
          setWord(user[0].data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoader(false);
    })();
  }, [email]);

  const removeWord = e => {
    e.stopPropagation();
    if (word[indexWord]?.id) {
      setWord(word.filter(w => w.id !== word[+indexWord].id));
    }
    if (word[indexWord]?.idCard) {
      setWord(word.filter(w => w.idCard !== word[+indexWord].idCard));
    }
    return;
  };

  const deleteWord = async e => {
    e.stopPropagation();
    if (word[indexWord]?.id) {
      try {
        api.deleteWord(word[indexWord]?.id);
        setWord(word.filter(w => w.id !== word[+indexWord].id));
      } catch (error) {
        console.log(error);
      }
    }
    if (word[indexWord]?.idCard) {
      try {
        userObj.data = [
          ...userObj.data.filter(w => w.idCard !== word[+indexWord].idCard),
        ];
        setWord(word.filter(w => w.idCard !== word[+indexWord].idCard));
        apiSecond.addWordAuth(userObj.id, userObj);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="q">
        {/* animation from library */}
        <SwitchTransition>
          <CSSTransition
            key={state ? 'Goodbye, world!' : 'Hello, world!'}
            addEndListener={(node, done) =>
              node.addEventListener('transitionend', done, false)
            }
            classNames="fade"
          >
            {/* black card */}
            <div className="card" onClick={e => setState(state => !state)}>
              {loader && (
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress sx={{ color: '#ff9800' }} />
                </Box>
              )}
              {word.length > 0 && (
                <button
                  id={word[indexWord]?.id}
                  className="remove__text"
                  onClick={removeWord}
                >
                  <RemoveCircleIcon />
                </button>
              )}
              {word.length > 0 && (
                <button
                  id={word[indexWord]?.id}
                  className="delete__text"
                  onClick={deleteWord}
                >
                  <DeleteForeverIcon />
                </button>
              )}

              {word.length > 0 && (
                <span className="card__text">
                  {state ? word[indexWord]?.en : word[indexWord]?.ru}
                </span>
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
        {/* buttons to the left and to the right */}
        <div className="paginator">
          {indexWord > 0 ? (
            <span
              className="paginator__btn"
              onClick={e => setIndexWord(prev => prev - 1)}
            >
              <NavigateBeforeIcon />
            </span>
          ) : null}
          {indexWord < word.length - 1 ? (
            <span
              className="paginator__btn"
              onClick={e => setIndexWord(prev => prev + 1)}
            >
              <NavigateNextIcon />
            </span>
          ) : null}
        </div>
        {/* words count */}
        <div className="description__wrap">
          <span>{word.length} - Words</span>
        </div>
      </div>
      {/* info icon */}
      {!email && (
        <div className="info__card" onClick={handleOpen}>
          <PrivacyTipIcon fontSize="large" />
        </div>
      )}

      {/* animation */}
      <CSSTransition in={open} unmountOnExit classNames="fades" timeout={250}>
        {/* modal */}
        <div className="overlay" onClick={onClickBackdrop}>
          <Box sx={CardMaterialUIStyle}>
            <Typography id="modal-modal-title">
              <span className="modal-text">
                - тицяй в картку i вона покаже переклад
              </span>
              <br />
              <span className="modal-text">
                - тицяй в картку повторно i вона сховає переклад
              </span>
              <br />
              <span className="modal-text"> летс гоу вчитись 🚀</span>
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
            >
              <RemoveCircleOutlineIcon fontSize="small" color="primary" />
              <span className="modal-text">
                - видалення картки з поточної сесії
              </span>
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
            >
              <DeleteForeverIcon fontSize="small" sx={{ color: red[500] }} />
              <span className="modal-text"> - видалення картки назавжди</span>
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
            >
              <SettingsEthernetSharpIcon fontSize="small" color="success" />
              <span className="modal-text"> - гортаєм слова</span>
            </Typography>
          </Box>
        </div>
      </CSSTransition>
    </>
  );
}


export default Card;