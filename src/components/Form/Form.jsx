import React from 'react';
import { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import api from 'service/api';
import './Form.css';

function Form() {
  const [en, setEn] = useState('');
  const [ru, setRu] = useState('');

  const handleSubmit = e => {
    // e.preventDefault()
    if (!en || !ru) return;
    api.addWord({ en, ru });
    setEn('');
    setRu('');
  };

  return (
    <>
      <label>
        EN
        <input
          type="text"
          name="en"
          className="input"
          onChange={e => setEn(e.target.value)}
          value={en}
        />
      </label>
      <br />
      <label>
        RU
        <input
          type="text"
          name="ru"
          className="input"
          onChange={e => setRu(e.target.value)}
          value={ru}
        />
      </label>

      <button onClick={handleSubmit} type="submit" className="button__add">
        <AddCircleOutlineIcon />
      </button>
    </>
  );
}

export default Form;
