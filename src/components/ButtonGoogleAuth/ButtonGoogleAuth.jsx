import React from 'react';

function ButtonGoogleAuth({ text, handleSubmit }) {
  const src =
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg';

  return (
    <>
      <div className="google-btn" onClick={handleSubmit}>
        <div className="google-icon-wrapper">
          <img className="google-icon" src={src} alt="icon" />
        </div>
        <div className="btn-text">
          <b className="text-g">{text} </b>
        </div>
      </div>
    </>
  );
}

// Го реєструватись via Google
export default ButtonGoogleAuth;
