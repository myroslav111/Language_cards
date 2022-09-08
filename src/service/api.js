import firstApi from 'axios';

// firstApi.defaults.baseURL = 'https://6310ad45826b98071a47c864.mockapi.io';

// async function getWords
async function getAllWords() {
  const { data } = await firstApi.get(
    'https://6310ad45826b98071a47c864.mockapi.io/lang'
  );
  //   console.log(data);
  return data;
}

async function addWord(word) {
  const { data } = await firstApi.post(
    'https://6310ad45826b98071a47c864.mockapi.io/lang',
    word
  );
  //   console.log(data);
  return data;
}

async function deleteWord(id) {
  const response = await firstApi.delete(
    `https://6310ad45826b98071a47c864.mockapi.io/lang/${id}`
  );
  return response;
}

const api = {
  getAllWords: getAllWords,
  addWord: addWord,
  deleteWord: deleteWord,
};


export default api;