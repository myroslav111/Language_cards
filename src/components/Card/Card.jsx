import React, { useState, useEffect, useContext } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SoundButton from 'components/SoundButton/SoundButton';
import DeleteWord from 'components/DeleteWord';
import RemoveWord from 'components/RemoveWord';
import { Context } from 'components/App';
import apiForRegisteredUsers from 'service/apiForRegistered';
import apiForUnregisteredUsers from 'service/api';
import './Card.css';
import SoundInterval from 'components/SoundInterval';

function Card() {
  const { lang } = useContext(Context);
  const [currentLanguage, setCurrentLanguage] = useState(() =>
    localStorage.getItem('language')
  );
  const [stateForSwitchWord, setStateForSwitchWord] = useState(true);
  const [indexWord, setIndexWord] = useState(0);
  const [word, setWord] = useState([]);
  const [userObj, setUserObj] = useState(null);
  const [email] = useState(localStorage.getItem('email') || '');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('language')) {
      setCurrentLanguage(localStorage.getItem('language'));
    } else {
      setCurrentLanguage(lang);
    }
    (async () => {
      setLoader(true);

      try {
        /** if email true it means user authorised and we write his words to state unless write common words*/
        if (!email) {
          const commonWordsForUnregisteredUsers =
            await apiForUnregisteredUsers.getAllWords();
          setWord(commonWordsForUnregisteredUsers);
        }

        if (email && currentLanguage === 'en') {
          /** all users */
          const usersData = await apiForRegisteredUsers.getAllWordsAuth();
          /** finde user data */
          const [user] = usersData.filter(user => user.email === email);
          setUserObj(user);
          setWord(user.data);
        }

        if (email && currentLanguage === 'de') {
          /** all users */
          const usersData = await apiForRegisteredUsers.getAllWordsAuth();
          /** finde user data */
          const [user] = usersData.filter(user => user.email === email);
          setUserObj(user);
          setWord(user.dataDe);
        }
      } catch (error) {
        console.log(error);
      }
      setLoader(false);
    })();
  }, [email, lang, currentLanguage]);

  /** pass 10 words */
  const paginatorToTenPlus = () => {
    if (word.length - 9 > indexWord) {
      setIndexWord(prev => prev + 10);
    }
  };

  /** pass 10 words */
  const paginatorToTenMinus = () => {
    if (9 < indexWord) {
      setIndexWord(prev => prev - 10);
    }
  };

  return (
    <>
      <div className="wraper-card">
        {/* animation from library */}
        <SwitchTransition>
          <CSSTransition
            key={stateForSwitchWord}
            addEndListener={(node, done) =>
              node.addEventListener('transitionend', done, false)
            }
            classNames="fade"
          >
            {/* black card */}
            <div
              className="card"
              onClick={e => setStateForSwitchWord(state => !state)}
            >
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
                currentLanguage={currentLanguage}
              />
              {/* кнопка озвучування картки тексту (Англійська) (з перевіркою)*/}
              <SoundButton
                onWord={word}
                onIndexWord={indexWord}
                currentLanguage={currentLanguage}
              />
              <SoundInterval
                onWord={word}
                onIndexWord={indexWord}
                currentLanguage={currentLanguage}
              />

              {word.length > 0 && (
                <span className="card__text">
                  {stateForSwitchWord
                    ? word[indexWord]?.en
                    : word[indexWord]?.ru}
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
          <button onClick={paginatorToTenMinus} className="paginator__btn-plus">
            <span>-10</span>
          </button>
          <span>
            {word.indexOf(word[indexWord]) + 1} - from - {word.length}
          </span>
          <button onClick={paginatorToTenPlus} className="paginator__btn-plus">
            +10
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
