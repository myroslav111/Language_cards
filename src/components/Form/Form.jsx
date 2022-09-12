import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import api from 'service/api';
import apiSecond from 'service/apiForRegistered';
import { nanoid } from 'nanoid';
import './Form.css';


function Form() {
  const [en, setEn] = useState('');
  const [ru, setRu] = useState('');
  const [email] = useState(localStorage.getItem('email') || '');
  const [objUser, setObjUser] = useState(null);
  const [success, setSuccess] = useState(false);

  // console.log(document.documentElement.scrollHeight);

  useEffect(() => {
    async function fetch() {
      try {
        const data = await apiSecond.getAllWordsAuth();
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
    if (!en || !ru) return toast.warn('🦄 Ви повинні додати слово.');
    setSuccess(true);
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
    toast.success('🚀 Ми додали слово до ваших карток!');
    setEn('');
    setRu('');
    setSuccess(false);
  };

  
  return (
    <>
      {/* заголовок  */}
      <h1>Додай слово для вивчення</h1>
      {/* инпут 1 */}
      <label>
        EN
        <input
          // type="text"
          name="en"
          className="input"
          onChange={e => setEn(e.target.value)}
          value={en}
        />
      </label>
      <br />
      {/* инпут 2 */}
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
        {!success ? (
          <AddCircleOutlineIcon />
        ) : (
          <ThumbUpAltIcon sx={{ color: 'green' }} />
        )}
      </button>
    </>
  );
}


export default Form;