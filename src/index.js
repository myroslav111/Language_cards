import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import apiSecond from 'service/apiForRegistered';
import { App } from 'components/App';
import './service/firebase';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/Language_cards/">
    <App />
  </BrowserRouter>
);
