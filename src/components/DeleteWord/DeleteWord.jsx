import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import apiForRegisteredUsers from 'service/apiForRegistered';
import apiForUnregisteredUsers from 'service/api';
import './DeleteWord.css';

const DeleteWord = ({
  onWord,
  onSetWord,
  onIndexWord,
  onUserObj,
  currentLanguage,
}) => {
  const deleteWord = async e => {
    e.stopPropagation();
    /** this action for unregistered users */
    if (onWord[onIndexWord]?.id) {
      try {
        apiForUnregisteredUsers.deleteWord(onWord[onIndexWord]?.id);
        onSetWord(onWord.filter(word => word.id !== onWord[+onIndexWord].id));
      } catch (error) {
        console.log(error);
      }
    }
    /** this action for are registered users */
    if (onWord[onIndexWord]?.idCard && currentLanguage === 'en') {
      /** rewrite user obj */
      try {
        onUserObj.data = [
          ...onUserObj.data.filter(
            word => word.idCard !== onWord[+onIndexWord].idCard
          ),
        ];
        onSetWord(
          onWord.filter(word => word.idCard !== onWord[+onIndexWord].idCard)
        );
        apiForRegisteredUsers.addWordAuth(onUserObj.id, onUserObj);
      } catch (error) {
        console.log(error);
      }
    }

    /** this action for are unregistered users */
    if (onWord[onIndexWord]?.idCard && currentLanguage === 'de') {
      /** rewrite user obj */
      try {
        onUserObj.dataDe = [
          ...onUserObj.dataDe.filter(
            word => word.idCard !== onWord[+onIndexWord].idCard
          ),
        ];
        onSetWord(
          onWord.filter(word => word.idCard !== onWord[+onIndexWord].idCard)
        );
        apiForRegisteredUsers.addWordAuth(onUserObj.id, onUserObj);
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
