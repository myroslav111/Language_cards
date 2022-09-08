import translateApi from 'axios';

// const text = 'hello';
// const translateFrom = 'en';
// const translateTo = 'uk';
async function getTranslate(text, translateFrom, translateTo) {
  const { data } = await translateApi.get(
    `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
  );
  //   console.log(data);
  return data;
}
// getTranslate();
export default getTranslate;
