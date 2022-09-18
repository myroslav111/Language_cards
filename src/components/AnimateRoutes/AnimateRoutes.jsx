import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; /**liba for animate routes */
import TranslationPage from 'pages/TranslationPage';
import AddWord from 'pages/AddWord';
import ListCard from 'pages/ListCard';

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
