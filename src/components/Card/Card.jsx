import React from 'react';
import { useState, useEffect } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import api from 'service/api';
import apiSecond from 'service/apiForRegistered';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SettingsEthernetSharpIcon from '@mui/icons-material/SettingsEthernetSharp';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import './Card.css';
import { red } from '@mui/material/colors';

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

  useEffect(() => {
    (async () => {
      setLoader(true);
      try {
        if (!email) {
          const data = await api.getWords();
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
        <SwitchTransition>
          <CSSTransition
            key={state ? 'Goodbye, world!' : 'Hello, world!'}
            addEndListener={(node, done) =>
              node.addEventListener('transitionend', done, false)
            }
            classNames="fade"
          >
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
        </div>{' '}
        <div className="description__wrap">
          <span>{word.length} - Words</span>
        </div>
      </div>
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
            <span className="modal-text">
              - тицай в картку вона покаже переклад
            </span>
            <br />
            <span className="modal-text">
              - тицай в картку повторно вона сховає переклад
            </span>
            <br />
            <span className="modal-text">летс го вчитись 🚀</span>
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
          >
            <RemoveCircleOutlineIcon fontSize="small" color="primary" />
            <span className="modal-text">
              - видалення картки на поточну сессію
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
      </Modal>
    </>
  );
}

export default Card;
