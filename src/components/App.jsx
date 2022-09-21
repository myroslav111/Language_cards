import { useState, createContext } from 'react';
import Navigation from './Navigation';
import AnimateRoutes from './AnimateRoutes';
import FooterMobileUser from './FooterMobileUser';
import AuthForm from './AuthForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export const Context = createContext();

export const App = () => {
  const [email] = useState(localStorage.getItem('email') || '');
  const [lang, setLang] = useState(localStorage.getItem('language'));

  /** func. for swetch current leng on the page form of add new word. It is used in form */
  const currentLanguageOnApp = lan => {
    setLang(lan);
  };

  return (
    <Context.Provider value={{ currentLanguageOnApp, lang }}>
      <div className="main-wraper">
        <Navigation />
        <AnimateRoutes />
        {email ? <FooterMobileUser /> : <AuthForm />}
        <ToastContainer autoClose={1500} />
      </div>
    </Context.Provider>
  );
};
