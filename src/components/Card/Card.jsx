import React from 'react';
import { useState, useEffect } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import api from 'service/api';
import apiSecond from 'service/apiForRegistered';
import './Card.css';

function Card() {
  const [state, setState] = useState(true);
  const [indexWord, setIndexWord] = useState(0);
  const [word, setWord] = useState([]);
  const [userObj, setUserObj] = useState(null);
  const [email] = useState(localStorage.getItem('email') || '');

  useEffect(() => {
    (async () => {
      try {
        if (!email) {
          const data = await api.getWords();
          setWord(data);
        }
        const dataRegistered = await apiSecond.getWordsAuth();
        const user = dataRegistered.filter(user => user.email === email);
        setUserObj(user[0]);
        setWord(user[0].data);
      } catch (error) {
        console.log(error);
      }
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
    </>
  );
}

export default Card;
