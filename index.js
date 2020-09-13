const express = require('express');
const app = express();

app.use('/static', express.static(__dirname + '/build'));

app.get('/', express.static(__dirname + '/build'));

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});