import express = require('express');

const app = express();

//Add CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//Sample Get Method
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

//Start Server on port 3000
app.listen(3000);