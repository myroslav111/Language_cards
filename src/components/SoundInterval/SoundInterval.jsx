import './SoundInterval.css';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useState, useEffect } from 'react';

let myCounter = 0;
let timeout = null;

const SoundInterval = ({ onWord, onIndexWord, currentLanguage }) => {
  const [counter, setCounter] = useState(0);
  const [togle, setTogle] = useState(false);
  console.log(onWord.length);
  //   console.log(onWord);
  useEffect(() => {
    return () => clearInterval(timeout);
  }, []);

  myCounter = counter;
  const startInterval = () => {
    setTogle(prev => !prev);

    timeout = setInterval(() => {
      handleClickSound(myCounter);
      setCounter(counter => counter + 1);

      console.log('counter: ', myCounter); // counter always return 0 but myCounter the updated value
      if (myCounter === onWord.length) clearInterval(timeout);
    }, 5000);
  };
  // логіка кнопки озвучування
  const handleClickSound = c => {
    // setTogle(prev => !prev);
    // console.log(c);
    // e.preventDefault();
    let soundWordIndex = onWord.filter((el, idx) => idx === c);

    const synth = window.speechSynthesis;
    // зупинемо все, що вже синтезується раніше
    synth.cancel();
    console.log('hallo', soundWordIndex);
    //  читання тексту
    const utterance = new SpeechSynthesisUtterance(soundWordIndex[0].en);
    if (currentLanguage === 'en') {
      utterance.lang = 'en-US';
    } else {
      utterance.lang = 'de';
    }

    synth.speak(utterance);
  };

  const handleClickButton = e => {
    e.stopPropagation();
  };

  const endOfSound = e => {
    clearInterval(timeout);
    setTogle(prev => !prev);
  };

  return (
    <button className="sound__interval" onClick={handleClickButton}>
      {!togle ? (
        <VolumeUpIcon sx={{ color: 'green' }} onClick={startInterval}>
          Sound text
        </VolumeUpIcon>
      ) : (
        <VolumeUpIcon sx={{ color: 'red' }} onClick={endOfSound}>
          Sound text
        </VolumeUpIcon>
      )}
      {/* <VolumeUpIcon sx={{ color: 'green' }} onClick={startInterval}>
        Sound text
      </VolumeUpIcon> */}
    </button>
  );
};

export default SoundInterval;
