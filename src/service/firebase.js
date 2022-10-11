import apiForRegisteredUsers from './apiForRegistered';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';


// firebase data config
export const firebaseConfig = {
  // apiKey: 'AIzaSyAZWL6jBhtQG0JPHEylLfigAUp0NuMMCN0',
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'lang-cards-1e9e8.firebaseapp.com',
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: 'lang-cards-1e9e8',
  //   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: 'lang-cards-1e9e8.appspot.com',
  //   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: '869660962106',
  //   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_SENDER_ID,
  appId: '1:869660962106:web:2cdc123c173b74c3f7f403',
  //   appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
// initialization of firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

// registration with google
export const signInWithGoogle = () => {
  // get user information
  signInWithPopup(auth, provider)
    .then(result => {
      // console.log(result);
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      // console.log(email);
      (async () => {
        // запрос на получение данных всех зарегистрированных в приложении пользователей
        const dataRegistered = await apiForRegisteredUsers.getUserAuth(); // rename to getUserAuth and add to apiRegistered
        // console.log(dataRegistered);
        const userEmail = dataRegistered.some(user => user.email === email);
        // console.log(userEmail);
        if (!userEmail) {
          const userObj = {};
          userObj.name = name;
          userObj.email = email;
          userObj.profilePic = profilePic;
          userObj.data = [];
          // console.log(userObj);

          apiForRegisteredUsers.addUser(userObj);
        }
      })();
      // record user data to localStorage
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      localStorage.setItem('profilePic', profilePic);
      localStorage.setItem('language', 'en');
    })
    .catch(error => {
      console.log(error);
    });
};
