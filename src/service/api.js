import axios from 'axios';

axios.defaults.baseURL = 'https://6310ad45826b98071a47c864.mockapi.io';

async function getWords() {
  const { data } = await axios.get('/lang');
  //   console.log(data);
  return data;
}

async function addWord(word) {
  const { data } = await axios.post('/lang', word);
  //   console.log(data);
  return data;
}

async function deleteWord(id) {
  const response = await axios.delete(`/lang/${id}`);
  return response;
}

const api = {
  getWords: getWords,
  addWord: addWord,
  deleteWord: deleteWord,
};

export default api;
