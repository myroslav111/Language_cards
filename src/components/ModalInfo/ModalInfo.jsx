import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Box from '@mui/material/Box';
import './ModalInfo.css';
import { nanoid } from 'nanoid';
import { dataForModalAddWord, dataForModalCards } from 'DiscribeForUse/DiscribeForUse'; 


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


const ModalInfo = ({ onOpen, onSetOpen }) => {
  const [currentPage, setCurrentPage] = useState([]);

  const location = useLocation();

  const handleClose = () => onSetOpen(false);

  const onClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };


  useEffect(() => {
    const pageCards = location.pathname === '/cards';
    const pageHome = location.pathname === '/';

    switch (true) {
      case pageCards:
        setCurrentPage(dataForModalCards);
        return;
      case pageHome:
        setCurrentPage(dataForModalAddWord);
        return;
      default:
        return;
    }
  }, [location.pathname]);


  return (
    <>
      {/* animation */}
      <CSSTransition in={onOpen} unmountOnExit classNames="fades" timeout={250}>
        {/* modal */}
        <div className="overlay" onClick={onClickBackdrop}>
          <Box sx={CardMaterialUIStyle}>
            <ul>
              {currentPage.map(el => (
                <li
                  key={nanoid()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '4px',
                  }}
                >
                  {el.wraper}
                  {el.icon}
                  <span className="modal-text">{el.text}</span>
                </li>
              ))}
            </ul>
          </Box>
        </div>
      </CSSTransition>
    </>
  );
};


export default ModalInfo;