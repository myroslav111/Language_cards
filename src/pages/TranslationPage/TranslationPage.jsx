import React from 'react';
import { motion } from 'framer-motion';
import Translation from 'components/Translation';

function TranslationPage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        // height: '100%'
        // initial={{ width: 0 }}
        // animate={{ width: '100% ' }}
        // exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
      >
        <Translation />
      </motion.div>
    </>
  );
}

export default TranslationPage;
