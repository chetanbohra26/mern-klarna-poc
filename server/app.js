const express = require('express');
const cors = require('cors');
const axios = require('axios');
const morgan = require('morgan');

require('dotenv').config();

const products = [
  {
    id: "PRODUCT_1",
    name: 'Product 1',
    price: 100
  },
  {
    id: "PRODUCT_2",
    name: 'Product 2',
    price: 150
  },
  {
    id: "PRODUCT_3",
    name: 'Product 3',
    price: 300
  },
];

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan());

app.get('/products', (req, res) => {
  res.json({ success: true, data: products });
});

const PORT = process.env.BE_PORT || 7071;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on port ${PORT}`)
})