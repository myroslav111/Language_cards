import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Form from 'components/Form';
// import AuthForm from 'components/AuthForm';
import './AddWord.css';

function AddWord() {
  const [name] = useState(localStorage.getItem('name') || '');

  return (
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
      {!name && (
        <div className="form__wrap">
          <Form />
        </div>
      )}

      {name && (
        <>
          <div className="form__wrap">
            <Form />
          </div>
        </>
      )}
      {/* {!name && <AuthForm />} */}
    </motion.div>
  );
}

export default AddWord;
