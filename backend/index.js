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
//Image Storage Engline
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

//Creating Upload Endpoint for Images
app.use('/images', express.static('upload/images'));
app.post('/upload', upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}}`,
  });
});

//Schema for Creating products
const Product = mongoose.model('Product', {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  new_price: {
    type: Number,
    require: true,
  },
  old_price: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post('/addproduct', async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log('saved');
  res.json({
    success: true,
    message: 'Product Saved',
  });
});

//Creatinf API for deleting products
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log('Removed');
  res.json({
    success: true,
    message: 'Product Removed',
  });
});
//Creating API for getting all products
app.get('/allproducts', async (req, res) => {
  let products = await Product.find({});
  console.log('All products Fetched');
  res.send(products);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
