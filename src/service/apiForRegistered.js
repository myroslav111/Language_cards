import secondApi from 'axios';

// secondApi.defaults.baseURL = 'https://63126265b466aa9b03896a0c.mockapi.io';

// получает данные о всех зарегистрированных пользователях
async function getUserAuth() {
  const { data } = await secondApi.get(
    'https://63126265b466aa9b03896a0c.mockapi.io/user-lang'
  );
    // console.log("getUserAuth", data );
  return data;
}

// ?????? та же что и выше
async function getAllWordsAuth() {
  const { data } = await secondApi.get(
    'https://63126265b466aa9b03896a0c.mockapi.io/user-lang'
  );
    // console.log("getAllWordsAuth", data);
  return data;
}

// добавляет слово только для авторизированных пользователей
async function addWordAuth(id, word) {
  const { data } = await secondApi.put(
    `https://63126265b466aa9b03896a0c.mockapi.io/user-lang/${id}`,
    word
  );
    // console.log("addWordAuth", data);
  return data;
}

// добавляет нового пользователя
async function addUser(obj) {
  const { data } = await secondApi.post(
    'https://63126265b466aa9b03896a0c.mockapi.io/user-lang',
    obj
  );
  //   console.log("addUser", data);
  return data;
}

// удаляет слово, только для авторизированного пользователя
async function deleteWordAuth(id) {
  const response = await secondApi.delete(
    `https://63126265b466aa9b03896a0c.mockapi.io/user-lang/${id}`
  );
  return response;
}

const apiSecond = {
  getUserAuth: getUserAuth,
  getAllWordsAuth: getAllWordsAuth,
  addWordAuth: addWordAuth,
  deleteWordAuth: deleteWordAuth,
  addUser: addUser,
};


export default apiSecond;