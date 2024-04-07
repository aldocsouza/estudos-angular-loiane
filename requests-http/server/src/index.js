const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');
const multipart = require('connect-multiparty');

const app = express()
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  optionsSucessStatus: 200
};
app.use(cors(corsOptions));

const multipartMiddleware = multipart({ uploadDir: './uploads'});
app.post('/upload', multipartMiddleware, (req, res) => {
  const files = req.files;
  console.log(files)
  res.json({ message: files });
})

app.use((err, req, res, next) => res.json({ error: err.message }));

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
})
