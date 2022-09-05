import React from 'react';
import { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import api from 'service/api';
import apiSecond from 'service/apiForRegistered';
import './Form.css';
import { nanoid } from 'nanoid';
// import AddTaskIcon from '@mui/icons-material/AddTask';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { toast } from 'react-toastify';
// import { async } from '@firebase/util';

function Form() {
  const [en, setEn] = useState('');
  const [ru, setRu] = useState('');
  const [email] = useState(localStorage.getItem('email') || '');
  const [objUser, setObjUser] = useState(null);
  const [succes, setSucces] = useState(false);

  console.log(document.documentElement.scrollHeight);
  useEffect(() => {
    async function fetch() {
      try {
        const data = await apiSecond.getWordsAuth();
        const id = data.find(e => e.email === email);
        // setIdUser(id);
        setObjUser(id);
      } catch (error) {
        console.log(error);
      } finally {
        // document.location.reload();
      }
    }
    fetch();
  }, [email]);

  const handleSubmit = async e => {
    // e.preventDefault()
    if (!en || !ru) return toast.warn('🦄 ви повинні додати слово');
    setSucces(true);
    let idCard = nanoid();
    if (!email) {
      api.addWord({ en, ru });
    }
    if (email) {
      objUser.data?.push({ en, ru, idCard });
      await apiSecond.addWordAuth(objUser.id, {
        ...objUser,
      });
    }
    // console.log(objUser);
    toast.success('🚀 ми додали слово до ваших карток!');
    setEn('');
    setRu('');
    setSucces(false);
  };

  return (
    <>
      <h1>Add words for learn</h1>
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
        UA
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
