import React from 'react';
import { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import api from 'service/api';
import apiSecond from 'service/apiForRegistered';
import './Form.css';
import { nanoid } from 'nanoid';
// import AddTaskIcon from '@mui/icons-material/AddTask';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
// import { async } from '@firebase/util';

function Form() {
  const [en, setEn] = useState('');
  const [ru, setRu] = useState('');
  const [email] = useState(localStorage.getItem('email') || '');
  const [objUser, setObjUser] = useState(null);
  const [succes, setSucces] = useState(false);

  useEffect(() => {
    async function fetch() {
      try {
        const data = await apiSecond.getWordsAuth();
        const id = data.find(e => e.email === email);
        // setIdUser(id);
        setObjUser(id);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [email]);

  const handleSubmit = async e => {
    // e.preventDefault()
    if (!en || !ru) return;
    setSucces(true);
    let idCard = nanoid();
    if (!email) {
      api.addWord({ en, ru });
    }
    // console.log(objUser);
    objUser.data?.push({ en, ru, idCard });
    await apiSecond.addWordAuth(objUser.id, {
      ...objUser,
    });
    setEn('');
    setRu('');
    setSucces(false);
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
        {!succes ? (
          <AddCircleOutlineIcon />
        ) : (
          <ThumbUpAltIcon sx={{ color: 'green' }} />
        )}
      </button>
    </>
  );
}

export default Form;