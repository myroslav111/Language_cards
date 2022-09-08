import secondApi from 'axios';

// secondApi.defaults.baseURL = 'https://63126265b466aa9b03896a0c.mockapi.io';

async function getWordsAuth() {
  const { data } = await secondApi.get(
    'https://63126265b466aa9b03896a0c.mockapi.io/user-lang'
  );
  //   console.log(data);
  return data;
}

async function addWordAuth(id, word) {
  const { data } = await secondApi.put(
    `https://63126265b466aa9b03896a0c.mockapi.io/user-lang/${id}`,
    word
  );
  //   console.log(data);
  return data;
}

async function addUser(obj) {
  const { data } = await secondApi.post(
    'https://63126265b466aa9b03896a0c.mockapi.io/user-lang',
    obj
  );
  //   console.log(data);
  return data;
}

async function deleteWordAuth(id) {
  const response = await secondApi.delete(
    `https://63126265b466aa9b03896a0c.mockapi.io/user-lang/${id}`
  );
  return response;
}

const apiSecond = {
  getWordsAuth: getWordsAuth,
  addWordAuth: addWordAuth,
  deleteWordAuth: deleteWordAuth,
  addUser: addUser,
};


export default apiSecond;