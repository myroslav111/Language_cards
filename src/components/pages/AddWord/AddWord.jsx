import AuthForm from 'components/AuthForm';
import Form from 'components/Form';
import React from 'react';
import './AddWord.css';

function AddWord() {
  return (
    <>
      <div className="form__wrap">
        <Form />
      </div>
      <AuthForm />
    </>
  );
}

export default AddWord;
