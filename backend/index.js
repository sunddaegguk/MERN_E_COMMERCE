const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const path = require('path');

const port = 4444;
const app = express();

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

// Creating Upload Endpoint for Images
app.use('/images', express.static('upload/images'));
app.post('/upload', upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
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

//Schema Creating for User model
const Users = mongoose.model('Users', {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creating Endpoint, API for User Registration
app.post('/signup', async (req, res) => {
  try {
    // Check if the user already exists
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user and save it to the database
    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Initialize a cart for the user
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    // Assign the cart to the user and save to the database
    user.cartData = cart;
    await user.save();

    // Generate a token for the user
    const data = {
      user: {
        _id: user.id,
      },
    };
    const token = jwt.sign(data, process.env.JWT_SECRET || 'default_secret');

    // Send the response
    res.json({
      success: true,
      message: 'User Saved',
      token: token,
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});
const bcrypt = require('bcrypt');

// Creating API ENDPOINT for User Login
app.post('/login', async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });

    if (user) {
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (passwordMatch) {
        const data = {
          user: {
            _id: user.id,
          },
        };

        const token = jwt.sign(data, 'secret_ecom');
        return res.json({
          success: true,
          message: 'User Logged In',
          token: token,
        });
      } else {
        return res.json({
          success: false,
          message: 'Wrong Password',
        });
      }
    } else {
      return res.json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    console.error('Error during user login:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Creating API ENDPOINT for newcollection data
app.get('/newcollections', async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log('New Collection Fetched');
  res.send(newcollection);
});
//Creating API ENDPOINT for popular in women section
app.get('/popularinwomen', async (req, res) => {
  let products = await Product.find({ category: 'women' });
  let popular_in_women = products.slice(0, 4);
  console.log('popular_in_women fetched');
  res.send(popular_in_women);
});
//Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    res.status(401).send({ error: 'Please authenticate using a valid token' });
  }
  try {
    const data = jwt.verify(token, 'secret_ecom');
    const user = await Users.findOne({ _id: data.user._id });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate using a valid token' });
  }
};

//Creating API ENDPOINT for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
  console.log('added', req.body.itemId);
  let userData = await Users.findOne({ _id: req.user._id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send('added to cart');
});

//creating endpoint to remove product form cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
  console.log('removed', req.body.itemId);
  let userData = await Users.findOne({ _id: req.user._id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
    res.send('remove from cart');
  }
});

//Creating endpoint to get create data
app.post('/getcart', fetchUser, async (req, res) => {
  console.log(fetchUser);
  let userData = await Users.findOne({ _id: req.user._id });
  res.json(userData.cartData);
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
