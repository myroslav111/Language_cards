import React, { useState, useEffect, useContext } from 'react';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import apiForUnregisteredUsers from 'service/api';
import apiForRegisteredUsers from 'service/apiForRegistered';
import { Context } from 'components/App';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import './Form.css';

function Form() {
  const [currentLanguage, setCurrentLanguage] = useState(() =>
    localStorage.getItem('language')
  );
  const [en, setEnWord] = useState('');
  const [ru, setRuWord] = useState('');
  const [email] = useState(localStorage.getItem('email') || '');
  const [objUser, setObjUser] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { lang } = useContext(Context);

  // console.log(document.documentElement.scrollHeight);

  /** we need get registered users in order to rewrite his data in case of adding a new word*/
  useEffect(() => {
    async function fetch() {
      try {
        const dataRegisteredUsers =
          await apiForRegisteredUsers.getAllWordsAuth();
        const user = dataRegisteredUsers.find(e => e.email === email);
        setObjUser(user);
        setCurrentLanguage(lang);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [email, lang]);

  /** write a new word in bd */
  const handleSubmitNewWord = async () => {
    if (!en || !ru) return toast.warn('🦄 Ви повинні додати слово.');
    setIsSuccess(true);
    let idCard = nanoid();
    /** if our user unregistered */
    if (!email) {
      apiForUnregisteredUsers.addWord({ en, ru });
    }
    /** if current page is england and user is registered*/
    if (email && currentLanguage === 'en') {
      objUser.data?.push({ en, ru, idCard });
      await apiForRegisteredUsers.addWordAuth(objUser.id, {
        ...objUser,
      });
    }
    /** if current page is deuchland and user is registered*/
    if (email && currentLanguage === 'de') {
      objUser.dataDe?.push({ en, ru, idCard });
      await apiForRegisteredUsers.addWordAuth(objUser.id, {
        ...objUser,
      });
    }

    toast.success('🚀 Ми додали слово до ваших карток!');
    setEnWord('');
    setRuWord('');
    setIsSuccess(false);
  };

  return (
    <>
      {/* заголовок  */}
      <h1>Додай слово для вивчення</h1>
      {/* инпут 1 */}
      <label>
        {lang === 'en' || lang === '' ? 'EN' : 'DE'}
        <input
          type="text"
          name="en"
          className="input"
          onChange={e => setEnWord(e.target.value)}
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
          onChange={e => setRuWord(e.target.value)}
          value={ru}
        />
      </label>

      <button
        disabled={isSuccess}
        onClick={handleSubmitNewWord}
        type="submit"
        className="paginator__btn btn"
      >
        {!isSuccess ? (
          <AddCircleOutlineIcon />
        ) : (
          <ThumbUpAltIcon sx={{ color: 'green' }} />
        )}
      </button>
    </>
  );
}

export default Form;
