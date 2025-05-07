


import { useState } from 'react';
import axios from 'axios';
import './App.css';

function getCurrency(amount, currency) {
  return axios.post('/api/convert', {
    amount: amount,
    currency: currency
  })
  .then(response => {
    return response.data.result;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    throw error;
  });
}

function App() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const Convert = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid positive amount');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const resultValue = await getCurrency(amount, currency);
      setResult(resultValue);
    } catch (err) {
      setError('Failed to convert. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      
      <h1>Currency Converter</h1>
      <div>
        <label htmlFor="INR">Enter Amount in INR:</label>
        <input
          type="number"
          id="INR"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
        <label htmlFor="currency">Select Currency:</label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>

        <button onClick={Convert} disabled={loading}>
        
          {loading ? 'Converting...' : 'Convert'}

        </button>
        
        {error && <p className="error">{error}</p>}

        {result && (
          <div id="result">

            Result: <span id="result_value">{result.convertedAmount} {currency}</span>
            
          </div>
        )}
      </div>
    </div>
  );
}

export default App;