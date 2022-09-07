// import { Route, Routes, useLocation } from 'react-router-dom';
// import AuthForm from './AuthForm';
import Navigation from './Navigation/Navigation';
// import AddWord from './pages/AddWord';
// import ListCard from './pages/ListCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { CSSTransition } from 'react-transition-group';
import './App.css';
import AnimateRoutes from './AnimateRoutes';
import FooterMobile from './FooterMobile';

export const App = () => {
  return (
    <div style={{ height: '100%' }}>
      <Navigation />
      <AnimateRoutes />
      <FooterMobile />
      <ToastContainer autoClose={3000} />
    </div>
  );
};
