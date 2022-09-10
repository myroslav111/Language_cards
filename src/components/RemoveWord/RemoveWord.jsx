import React from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import './RemoveWord.css';

const RemoveWord = ({ onWord, onSetWord, onIndexWord }) => {
  const removeWord = e => {
    e.stopPropagation();
    if (onWord[onIndexWord]?.id) {
      onSetWord(onWord.filter(w => w.id !== onWord[+onIndexWord].id));
    }
    if (onWord[onIndexWord]?.idCard) {
      onSetWord(onWord.filter(w => w.idCard !== onWord[+onIndexWord].idCard));
    }
    return;
  };

  return (
    <>
      {onWord.length > 0 && (
        <button
          id={onWord[onIndexWord]?.id}
          className="remove__text"
          onClick={removeWord}
        >
          <RemoveCircleIcon />
        </button>
      )}
    </>
  );
};

export default RemoveWord;
