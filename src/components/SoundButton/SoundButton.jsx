import React from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import './SoundButton.css';


const SoundButton = ({ onWord, onIndexWord }) => {
  // логіка кнопки озвучування
  const handleClickSound = e => {
    e.preventDefault();
    const soundWordIndex = onWord.filter(
      el => el.idCard === onWord[+onIndexWord].idCard
    );

    const synth = window.speechSynthesis;
    // зупинемо все, що вже синтезується раніше
    synth.cancel();

    //  читання тексту
    const utterance = new SpeechSynthesisUtterance(soundWordIndex[0].en);
    utterance.lang = 'en-US';
    synth.speak(utterance);
  };

  const handleClickButton = e => {
    e.stopPropagation();
  };


  return (
    <>
      {onWord.length > 0 && (
        <button className="sound__text" onClick={handleClickButton}>
          <VolumeUpIcon sx={{ color: 'white' }} onClick={handleClickSound}>
            Sound text
          </VolumeUpIcon>
        </button>
      )}
    </>
  );
};


export default SoundButton;