import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './Navigation';
import AnimateRoutes from './AnimateRoutes';
import FooterMobileUser from './FooterMobileUser';
import { useState } from 'react';
import './App.css';
import AuthForm from './AuthForm';

export const App = () => {
  const [email] = useState(localStorage.getItem('email') || '');
  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Navigation />
      <AnimateRoutes />
      {email ? <FooterMobileUser /> : <AuthForm />}

      <ToastContainer autoClose={3000} />
    </div>
  );
};
