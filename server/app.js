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

app.post('/create-klarna-order', async (req, res) => {
  try {
    const result = await axios({
      method: 'POST',
      url: `${process.env.KLARNA_URL}/checkout/v3/orders`,
      auth: {
        username: process.env.KLARNA_USERNAME,
        password: process.env.KLARNA_PASSWORD,
      },
      data: {
        "purchase_country": "US",
        "purchase_currency": "USD",
        "locale": "en-US",
        "order_amount": 20000,
        "order_tax_amount": 0,
        "order_lines": [
          {
            "type": "physical",
            "name": "T-shirt",
            "quantity": 2,
            "unit_price": 10000,
            "tax_rate": 0,
            "total_amount": 20000,
            "total_tax_amount": 0
          }
        ],
        "merchant_urls": {
          "terms": `${process.env.REACT_APP_URL}/terms-and-conditions`,
          "checkout": `${process.env.REACT_APP_URL}/order-status`,
          "confirmation": `${process.env.REACT_APP_URL}/order-status`,
          "push": `${process.env.REACT_APP_BACKEND_URL}/push`
        }
      }
    })
    res.json({ success: true, data: result?.data });
  }
  catch (err) {
    console.log("🚀 ~ file: app.js:68 ~ app.post ~ err:", err?.response);
    return res.status(500).json({ success: false, })
  }
});

app.post('/push', (req, res) => {
  console.log('body------->', req.body);
  console.log('headers------->', req.headers);
  console.log('query------->', req.query);

  res.status(200).send('OK');
});

const PORT = process.env.BE_PORT || 7071;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on port ${PORT}`)
})