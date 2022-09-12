import Typography from '@mui/material/Typography';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SettingsEthernetSharpIcon from '@mui/icons-material/SettingsEthernetSharp';
import { red } from '@mui/material/colors';
import StyleIcon from '@mui/icons-material/Style';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AddIcon from '@mui/icons-material/Add';


const typography = (
  <Typography
    id="modal-modal-description"
    sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
  />
);


export const dataForModalAddWord = [
  {
    wraper: typography,
    icon: <StyleIcon fontSize="small" color="primary" />,
    text: 'Місце з картками',
  },
  {
    wraper: typography,
    icon: <LibraryAddIcon fontSize="small" color="secondary" />,
    text: 'Місце, де додають картки',
  },
  {
    wraper: typography,
    icon: <AddIcon fontSize="small" color="success" />,
    text: 'кнопка додає слово до карток',
  },
];


export const dataForModalCards = [
  {
    wraper: typography,
    icon: <RemoveCircleOutlineIcon fontSize="small" color="primary" />,
    text: 'видалення картки з поточної сесії',
  },
  {
    wraper: typography,
    icon: <DeleteForeverIcon fontSize="small" sx={{ color: red[500] }} />,
    text: 'видалення картки назавжди',
  },
  {
    wraper: typography,
    icon: <SettingsEthernetSharpIcon fontSize="small" color="success" />,
    text: 'гортаєм слова',
  },
];