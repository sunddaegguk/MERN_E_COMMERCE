const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const port = 4444;
const app = express();
const jswt = require('jsonwebtoken');
const path = require('path');

app.use(express.json());
app.use(cors());

//DATABASE CONNECTION WITH MONGODB
mongoose.connect(
  'mongodb+srv://ssitek22:123WNS@e-commerce.6vh6xkh.mongodb.net/e-commerce'
);

//API Creation
app.get('/', (req, res) => {
  res.send('Express App is Running');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
