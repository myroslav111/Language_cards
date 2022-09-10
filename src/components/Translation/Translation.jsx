import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ReplyIcon from '@mui/icons-material/Reply';
import RefreshIcon from '@mui/icons-material/Refresh';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import getTranslate from 'service/apiTranslate';


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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80vw',
        // marginRight: 'auto',
        // marginLeft: 'auto',
        height: '80vh',
        position: 'absolute',
        top: '60px',
      }}
    >
      {/* width: 100%;
    margin-right: auto;
    margin-left: auto;
    height: 90vh;
    position: absolute;
    top: 60px; */}
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          marginTop: '10px',
          marginBottom: '10px',
          marginLeft: '60px',
        }}
      >
        {/* select */}
        <Box sx={{ marginRight: '5px' }}>
          <FormControl>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: 'grey' }}
            ></InputLabel>
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
              <MenuItem value={'de'}>D</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* textarea */}
        <TextareaAutosize
          value={textForTranslate}
          onChange={e => setTextForTranslate(e.target.value)}
          maxRows={18}
          aria-label="maximum height"
          placeholder="встав сюди текст"
          style={{
            height: 200,
            width: 250,
            border: 'none',
            borderRadius: '8px',
            background: '',
            padding: '5px',
            outline: 'none',
            boxShadow:
              'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
          }}
        />
      </div>

      <KeyboardDoubleArrowDownIcon fontSize="large" color="success" />

      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          marginTop: '10px',
          marginLeft: '60px',
        }}
      >
        {/* <span>en</span> */}
        {/* select */}
        <Box sx={{ marginRight: '5px' }}>
          <FormControl>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: 'grey' }}
            ></InputLabel>
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
              <MenuItem value={'de'}>D</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* textarea */}
        <TextareaAutosize
          disabled
          maxRows={18}
          aria-label="maximum height"
          placeholder="тут буде переклад"
          // defaultValue=""
          value={translated}
          style={{
            height: 200,
            width: 250,
            border: 'none',
            borderRadius: '8px',
            background: '',
            padding: '5px',
            outline: 'none',
            boxShadow:
              'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
          }}
        />
      </div>

      <Stack
        spacing={2}
        direction="row"
        sx={{
          marginTop: '10px',
          // width: '400px',
          justifyContent: 'space-around',
          // padding: '5px',
          marginLeft: '145px',
        }}
      >
        <div
          style={{
            cursor: 'pointer',
            background: 'white',
            width: '37px',
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
        </div>
        <div
          style={{
            cursor: 'pointer',
            background: 'white',
            width: '37px',
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
          />
        </div>
        <Button onClick={handleTranslate} variant="contained" color="success">
          Перекласти
        </Button>
      </Stack>
    </div>
  );
}


export default Translation;