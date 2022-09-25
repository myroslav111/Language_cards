import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Context } from 'components/App';

export default function SelectLanguge() {
  // const [currentLanguage, setCurrentLanguage] = useState(() =>
  //   localStorage.getItem('language')
  // );
  const { lang } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState('');
  const { currentLanguageOnApp } = useContext(Context);

  const handleChange = event => {
    setLanguage(event.target.value || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      setOpen(false);
      return;
    }
    localStorage.setItem('language', language);
    // document.location.reload();
    currentLanguageOnApp(language);
    setOpen(false);
  };

  return (
    <div>
      <img
        src={
          lang === 'en'
            ? 'https://img.icons8.com/doodle/48/000000/great-britain.png'
            : 'https://img.icons8.com/doodle/48/000000/germany.png'
        }
        alt="flag"
        onClick={handleClickOpen}
        width="35"
        height="35"
      />

      {/* <TopicIcon color="success" fontSize="large"  /> */}
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <DialogTitle
          style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '30px',
            fontWeight: '700',
          }}
        >
          Вибери мову
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel
                htmlFor="demo-dialog-native"
                style={{
                  fontSize: '15px',
                  fontFamily: '"Caveat", cursive',
                  fontWeight: '700',
                }}
              >
                Мова
              </InputLabel>
              <Select
                native
                value={language}
                onChange={handleChange}
                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                style={{
                  fontSize: '15px',
                  fontFamily: '"Caveat", cursive',
                  fontWeight: '700',
                }}
              >
                <option disabled={lang === 'en'} value={'en'}>
                  EN
                </option>
                <option disabled={lang === 'de'} value={'de'}>
                  DE
                </option>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <div style={{ textAlign: 'center' }}>
          <a
            style={{ color: 'inherit', textDecoration: 'none' }}
            target="_blank"
            href="https://icons8.com/icon/MAZrmTk77idC/germany"
            alt="Иконки от Icons8"
            rel="noreferrer"
          >
            Germany icon by Icons8
          </a>
        </div>
        <DialogActions>
          <Button
            style={{
              fontFamily: '"Caveat", cursive',
              fontWeight: '700',
            }}
            onClick={handleClose}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
