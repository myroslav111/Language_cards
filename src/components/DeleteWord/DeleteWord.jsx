import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import api from 'service/api';
import apiSecond from 'service/apiForRegistered';
import './DeleteWord.css';

const DeleteWord = ({ onWord, onSetWord, onIndexWord, onUserObj }) => {
  const deleteWord = async e => {
    e.stopPropagation();
    if (onWord[onIndexWord]?.id) {
      try {
        api.deleteWord(onWord[onIndexWord]?.id);
        onSetWord(onWord.filter(w => w.id !== onWord[+onIndexWord].id));
      } catch (error) {
        console.log(error);
      }
    }
    if (onWord[onIndexWord]?.idCard) {
      try {
        onUserObj.data = [
          ...onUserObj.data.filter(
            w => w.idCard !== onWord[+onIndexWord].idCard
          ),
        ];
        onSetWord(onWord.filter(w => w.idCard !== onWord[+onIndexWord].idCard));
        apiSecond.addWordAuth(onUserObj.id, onUserObj);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {onWord.length > 0 && (
        <button
          id={onWord[onIndexWord]?.id}
          className="delete__text"
          onClick={deleteWord}
        >
          <DeleteForeverIcon />
        </button>
      )}
    </>
  );
};

export default DeleteWord;
