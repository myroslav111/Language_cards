import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Box from '@mui/material/Box';
import {
  dataForModalAddWord,
  dataForModalCards,
} from 'DiscribeForUse/DiscribeForUse';
import { nanoid } from 'nanoid';
import './ModalInfo.css';

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

  const handleCloseModal = () => onSetOpen(false);

  const onClickBackdropOfModal = e => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    /** defining which is the current page now */
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
        <div className="overlay" onClick={onClickBackdropOfModal}>
          <Box sx={CardMaterialUIStyle}>
            <ul>
              {currentPage.map(({ wraper, icon, text }) => (
                <li className="box-of-modal" key={nanoid()}>
                  {wraper}
                  {icon}
                  <span className="modal-text">{text}</span>
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
