import AddWord from 'components/pages/AddWord';
import ListCard from 'components/pages/ListCard';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
// import { AnimatePresence } from 'framer-motion/dist/framer-motion';

function AnimateRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AddWord />} />
        <Route path="/cards" element={<ListCard />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimateRoutes;
