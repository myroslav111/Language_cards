import React, { useState, useEffect } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import api from 'service/api';
import apiSecond from 'service/apiForRegistered';
import './Card.css';
import SoundButton from 'components/SoundButton/SoundButton';
import DeleteWord from 'components/DeleteWord';
import RemoveWord from 'components/RemoveWord';
import ModalInfo from 'components/ModalInfo';

function Card() {
  const [state, setState] = useState(true);
  const [indexWord, setIndexWord] = useState(0);
  const [word, setWord] = useState([]);
  const [userObj, setUserObj] = useState(null);
  const [email] = useState(localStorage.getItem('email') || '');
  const [loader, setLoader] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    (async () => {
      setLoader(true);
      try {
        if (!email) {
          const data = await api.getAllWords();
          setWord(data);
        }
        if (email) {
          const dataRegistered = await apiSecond.getAllWordsAuth();
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

              {/* кнопка поставити в чергу картку (з перевіркою) */}
              <RemoveWord
                onWord={word}
                onSetWord={setWord}
                onIndexWord={indexWord}
              />
              {/* кнопка видалення картки (з перевіркою)*/}
              <DeleteWord
                onWord={word}
                onSetWord={setWord}
                onIndexWord={indexWord}
                onUserObj={userObj}
              />
              {/* кнопка озвучування картки тексту (Англійська) (з перевіркою)*/}
              <SoundButton onWord={word} onIndexWord={indexWord} />

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

      {/* modal */}
      <ModalInfo onOpen={open} onSetOpen={setOpen} />
    </>
  );
}

export default Card;
