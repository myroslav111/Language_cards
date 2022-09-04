import AuthForm from 'components/AuthForm';
import Form from 'components/Form';
import React from 'react';
import { useState } from 'react';
import './AddWord.css';

function AddWord() {
  const [name] = useState(localStorage.getItem('name') || '');
  const [src] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
  );

  const handleExit = () => {
    localStorage.setItem('name', '');
    localStorage.setItem('email', '');
    localStorage.setItem('profilePic', '');

    document.location.reload();
  };
  return (
    <>
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
          <div className="google-btn color-red" onClick={handleExit}>
            <div className="google-icon-wrapper">
              <img className="google-icon" src={src} alt="icon" />
            </div>
            <p className="btn-text text-button-green">
              <b>EXIT</b>
            </p>
          </div>
        </>
      )}
      {!name && <AuthForm />}
      {/* <AuthForm /> */}
    </>
  );
}

export default AddWord;
