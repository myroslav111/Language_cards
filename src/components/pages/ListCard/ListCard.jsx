import React from 'react';
import Card from 'components/Card';
import { motion } from 'framer-motion';

function ListCard() {
  return (
    <motion.div
      style={{
        position: 'absolute',
        height: '91%',
        top: '56px',
        // overflow: 'hidden',
        width: '100%',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}

      // initial={{ width: 0 }}
      // animate={{ width: '100%' }}
      // exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      {/* <div>ListCard</div> */}
      <Card />
    </motion.div>
  );
}

export default ListCard;
