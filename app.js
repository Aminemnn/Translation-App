// translate.js

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

app.post('/translate', async (req, res) => {
  const { textToTranslate, targetLanguage } = req.body;

  try {
    const translatedText = await translate(textToTranslate, 'en', targetLanguage);
    res.json({ translatedText });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const translate = async (text, sourceLang, targetLang) => {
  const options = {
    method: 'GET',
    url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/get',
    params: {
      langpair: `${sourceLang}|${targetLang}`,
      q: text,
      mt: '1',
      onlyprivate: '0',
      de: 'a@b.c'
    },
    headers: {
      'X-RapidAPI-Key': 'd9e7b9c31cmsh1e3054059fb1443p1ff97fjsn4e05247280c5',
      'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    
    return response.data.responseData.translatedText;
    
  } catch (error) {
    console.error('Translation Error:', error.message);
    throw error;
  }
};

