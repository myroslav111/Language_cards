import Translation from 'components/Translation';
import React from 'react';
import { motion } from 'framer-motion';

function TranslationPage() {
  return (
    <>
      <motion.div
        style={{}}
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
