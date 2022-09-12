import React from 'react';


function FooterContainer(props) {
  
  return (
    <>
      <div className="footer__wrap">
        <div className="footer">{props.children}</div>
      </div>
    </>
  );
}


export default FooterContainer;