import { useState } from 'react';
import Navigation from './Navigation';
import AnimateRoutes from './AnimateRoutes';
import FooterMobileUser from './FooterMobileUser';
import AuthForm from './AuthForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export const App = () => {
  const [email] = useState(localStorage.getItem('email') || '');
  return (
    <div className="main-wraper">
      <Navigation />
      <AnimateRoutes />
      {email ? <FooterMobileUser /> : <AuthForm />}
      <ToastContainer autoClose={3000} />
    </div>
  );
};
