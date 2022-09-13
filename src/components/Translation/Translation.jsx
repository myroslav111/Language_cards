import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import ReplyIcon from '@mui/icons-material/Reply';
import RefreshIcon from '@mui/icons-material/Refresh';
import getTranslate from 'service/apiTranslate';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

function Translation() {
  const [fromLanguage, setFromLanguage] = useState('en');
  const [toLanguage, setToLanguage] = useState('uk');
  const [textForTranslate, setTextForTranslate] = useState('');
  const [translated, setTranslated] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const handleRefreshInput = () => {
    setTextForTranslate('');
    setTranslated('');
  };

  const handleReverseLang = () => {
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
  };
  const handleTranslate = async () => {
    if (!textForTranslate) {
      toast.warn('🦄 Додай слово для перекладу !');
      return;
    }
    try {
      const { responseData } = await getTranslate(
        textForTranslate,
        fromLanguage,
        toLanguage
      );
      setTranslated(responseData.translatedText);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeFrom = event => {
    setFromLanguage(event.target.value);
  };

  const handleChangeTo = event => {
    setToLanguage(event.target.value);
  };
  return (
    <div
      style={{
        background: 'white',
        height: '80vh',
        borderRadius: '20px 20px 0 0',
        position: 'fixed',
        bottom: '40px',
        width: '100vw',
        zIndex: '0',
      }}
    >
      <div style={{ padding: '15px' }}>
        {/* textarea */}
        <textarea
          value={textForTranslate}
          onChange={e => setTextForTranslate(e.target.value)}
          rows="8"
          cols="18"
          aria-label="maximum height"
          placeholder="Введіть текст"
          style={{
            height: '150px',
            overflow: 'hidden',
            fontSize: '30px',
            border: 'none',
            outline: 'none',
            width: '100%',
          }}
        ></textarea>
        <VolumeUpIcon />
      </div>

      <div style={{ padding: '15px' }}>
        {/* textarea */}
        <textarea
          disabled
          value={translated}
          rows="8"
          cols="18"
          aria-label="maximum height"
          placeholder="тут буде переклад"
          style={{
            height: '150px',
            overflow: 'hidden',
            fontSize: '30px',
            border: 'none',
            outline: 'none',
            width: '100%',
          }}
        ></textarea>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '0 15px 0 15px',
          marginBottom: '25px',
        }}
      >
        {/* select */}
        <Box sx={{}}>
          <FormControl>
            <InputLabel id="demo-simple-select-label" sx={{ color: 'grey' }}>
              from
            </InputLabel>
            <Select
              sx={{
                border: 'none',
                outline: 'none',
                background: 'white',
                color: '#ff9800',
                boxShadow:
                  'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fromLanguage}
              label="lang"
              onChange={handleChangeFrom}
            >
              <MenuItem value={'en'}>EN</MenuItem>
              <MenuItem value={'uk'}>UA</MenuItem>
              <MenuItem value={'de'}>DE</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <CompareArrowsIcon
          fontSize="large"
          color="primary"
          onClick={handleReverseLang}
        />

        {/* select */}
        <Box sx={{}}>
          <FormControl>
            <InputLabel id="demo-simple-select-label" sx={{ color: 'grey' }}>
              to
            </InputLabel>
            <Select
              sx={{
                background: 'white',
                color: '#ff9800',
                boxShadow:
                  'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={toLanguage}
              label="lang"
              onChange={handleChangeTo}
            >
              <MenuItem value={'en'}>EN</MenuItem>
              <MenuItem value={'uk'}>UA</MenuItem>
              <MenuItem value={'de'}>DE</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '0 15px 0 15px',
        }}
      >
        <div
          style={{
            cursor: 'pointer',
            background: 'white',
            width: '87px',
            height: '37px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            boxShadow:
              'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
          }}
        >
          <ReplyIcon
            fontSize="large"
            color="primary"
            onClick={() => {
              navigate(location?.state?.from?.pathname ?? '/');
            }}
          />
          назад
        </div>
        <div
          style={{
            cursor: 'pointer',
            background: 'white',
            width: '97px',
            height: '37px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            boxShadow:
              'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
          }}
        >
          <RefreshIcon
            fontSize="large"
            color="primary"
            onClick={handleRefreshInput}
          />{' '}
          скинути
        </div>
        <Button onClick={handleTranslate} variant="contained" color="primary">
          Перекласти
        </Button>
        {/* </Stack> */}
      </div>
    </div>
  );
}

export default Translation;
