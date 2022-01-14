const express = require('express');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(express.json());

const favLangs = ['html', 'css', 'javascript', 'react'];

app.get('/api/get-records', (req, res) => {
  res.json({ langs: favLangs });
});

app.post('/api/add-record', (req, res) => {
  const record = req.body.record;
  favLangs.push(record);
  res.json({ status: 'ok' });
});

app.listen(1337, () => {
  console.log('server running on 1337');
});
