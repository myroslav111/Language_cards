import AuthForm from 'components/AuthForm';
import Form from 'components/Form';
import React from 'react';
import { useState } from 'react';
import './AddWord.css';

function AddWord() {
  const [name] = useState(localStorage.getItem('name') || '');
  return (
    <>
      {!name && (
        <div className="form__wrap">
          <Form />
        </div>
      )}

      {name && (
        <div className="form__wrap">
          <Form />
        </div>
      )}
      {!name && <AuthForm />}
    </>
  );
}

export default AddWord;
