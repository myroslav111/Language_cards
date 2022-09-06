import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import apiSecond from 'service/apiForRegistered';

// функционал регистрации через гугле
export const firebaseConfig = {
  apiKey: 'AIzaSyAZWL6jBhtQG0JPHEylLfigAUp0NuMMCN0',
  authDomain: 'lang-cards-1e9e8.firebaseapp.com',
  projectId: 'lang-cards-1e9e8',
  storageBucket: 'lang-cards-1e9e8.appspot.com',
  messagingSenderId: '869660962106',
  appId: '1:869660962106:web:2cdc123c173b74c3f7f403',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const singInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(result => {
      console.log(result);
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      console.log(email);
      (async () => {
        const dataRegistered = await apiSecond.getWordsAuth();
        console.log(dataRegistered);
        const userEmail = dataRegistered.some(user => user.email === email);
        console.log(userEmail);
        if (!userEmail) {
          const userObj = {};
          userObj.name = name;
          userObj.email = email;
          userObj.profilePic = profilePic;
          userObj.data = [];
          console.log(userObj);
          apiSecond.addUsder(userObj);
        }
      })();
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      localStorage.setItem('profilePic', profilePic);
    })
    .catch(error => {
      console.log(error);
    });
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/Language_cards/">
    {/* <UserContext.Provider value={emailP}> */}
    <App />
    {/* </UserContext.Provider> */}
  </BrowserRouter>
);
