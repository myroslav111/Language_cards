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

export const App = () => {
  // const routes = [
  //   { path: '/', Component: AddWord },
  //   { path: '/cards', Component: ListCard },
  // ];

  return (
    <>
      <Navigation />
      <AnimateRoutes />
      {/* <Routes> */}
      {/* <Routes>
        <Route path="/" element={<AddWord />} />
        <Route path="/cards" element={<ListCard />} />
      </Routes> */}
      {/* {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path}>
            {({ match }) => (
              <CSSTransition
                timeout={1000}
                classNames="page"
                unmountOnExit
                in={match != null}
              >
                <Component />
              </CSSTransition>
            )}
          </Route>
        ))}
      </Routes> */}
      <ToastContainer autoClose={3000} />
      {/* <AuthForm /> */}
    </>
  );
};
