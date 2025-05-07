export default function handler(req, res) {
  const Rates = {
    USD: 0.012,
    EUR: 0.011
  };

  if (req.method === 'POST') {
    const { amount, currency } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }
    if (!currency || !Rates[currency.toUpperCase()]) {
      return res.status(400).json({ error: 'Invalid currency' });
    }

    const rate = Rates[currency.toUpperCase()];
    const convertedAmount = amount * rate;

    return res.status(200).json({
      result: {
        convertedAmount,
        rate
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
  