import { Route, Routes } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import AddWord from './pages/AddWord';
import ListCard from './pages/ListCard';

export const App = () => {
  return (
    <>
      <Navigation />
      {/* <Provider store={store}> */}
      <Routes>
        <Route path="/" element={<AddWord />} />
        <Route path="/cards" element={<ListCard />} />
      </Routes>
      {/* </Provider> */}
    </>
  );
};
