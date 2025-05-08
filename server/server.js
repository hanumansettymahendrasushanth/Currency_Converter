const express = require('express');
const cors = require('cors');

const app = express();
const port =  process.env.PORT || 3000;

//money rates
const Rates = {
  USD: 0.012, 
  EUR: 0.011  
};


app.use(cors({
  origin: 'https://currency-converter-tau-eight.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Currency Converter Backend');
});

// POST 
app.post('/convert', (req, res) => {
  const { amount, currency } = req.body;

  // Validation 
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }
  if (!currency || !Rates[currency.toUpperCase()]) {
    return res.status(400).json({ error: 'Invalid currency' });
  }

  const rate = Rates[currency.toUpperCase()];
  const convertedAmount = amount * rate;

  res.json({
    result: {
      convertedAmount
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});