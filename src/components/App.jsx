import { ToastContainer } from 'react-toastify';
// import { Route, Routes, useLocation } from 'react-router-dom';
// import { CSSTransition } from 'react-transition-group';
import 'react-toastify/dist/ReactToastify.css';
// import AuthForm from './AuthForm';
import Navigation from './Navigation';
// import Navigation from './Navigation/Navigation';
import AnimateRoutes from './AnimateRoutes';
import FooterMobileUser from './FooterMobileUser';
// import AddWord from './pages/AddWord';
// import ListCard from './pages/ListCard';
import './App.css';


export const App = () => {
  return (
    <div style={{ height: '100%' }}>
      <Navigation />
      <AnimateRoutes />
      <FooterMobileUser />
      <ToastContainer autoClose={3000} />
    </div>
  );
};
