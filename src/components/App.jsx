import { Route, Routes } from 'react-router-dom';
// import AuthForm from './AuthForm';
import Navigation from './Navigation/Navigation';
import AddWord from './pages/AddWord';
import ListCard from './pages/ListCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<AddWord />} />
        <Route path="/cards" element={<ListCard />} />
      </Routes>
      <ToastContainer autoClose={3000} />
      {/* <AuthForm /> */}
    </>
  );
};
