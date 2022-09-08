import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import TranslationPage from 'components/pages/TranslationPage';

import AddWord from 'pages/AddWord';
import ListCard from 'pages/ListCard';

// import { AnimatePresence } from 'framer-motion/dist/framer-motion';


function AnimateRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AddWord />} />
        <Route path="/cards" element={<ListCard />} />
        <Route path="/translate" element={<TranslationPage />} />
      </Routes>
    </AnimatePresence>
  );
}


export default AnimateRoutes;