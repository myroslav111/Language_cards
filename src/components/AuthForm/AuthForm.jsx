import React from 'react';
import { singInWithGoogle } from '../../index';
import { useState } from 'react';
import './AuthForm.css';

function AuthForm() {
  const [email] = useState(localStorage.getItem('email') || '');
  const [src] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
  );
  return (
    <>
      {!email ? (
        <div className="google-btn" onClick={singInWithGoogle}>
          <div className="google-icon-wrapper">
            <img className="google-icon" src={src} alt="icon" />
          </div>
          <p className="btn-text">
            <b>Sign in with google</b>
          </p>
        </div>
      ) : null}
    </>
  );
}

export default AuthForm;
