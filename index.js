// Require necessary packages
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create an instance of the express server
const app = express();

// Enable CORS for all routes
app.use(cors());

const allProducts = require('./productsData/productsData.json')
console.log(allProducts);
const allCategories = require('./productsData/categories.json');
console.log(allCategories);

// Define a simple route that returns a JSON response
app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// get products data

app.get('/allproducts', (req,res)=> {
    res.send(allProducts);
    console.log(allProducts)
});
app.get('/allproducts/:category',(req,res)=> {
  const category =(req.params.category);
  const selectProducts = allProducts.find( product => product.category === category);
  res.send(selectProducts);
});



app.get('/allproducts/:_id',(req,res)=>{
  const _id = parseInt(req.params._id);
  const selectedProduct = allProducts.find(product => product._id===_id);
  res.send(selectedProduct);
})

app.get('/categories',(req,res)=>{
  res.send(allCategories);
  // console.log(allCategories);
})

app.get('/category/:category_name', (req,res)=> {
  const categoryName = req.params.category_name;

  const productCategories = allProducts.filter(ctg => ctg.category === categoryName);
  res.send(productCategories);
  // console.log(productCategories);
  
});


// Start the server on the specified port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
