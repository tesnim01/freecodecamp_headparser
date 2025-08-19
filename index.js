// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS so the API is remotely testable
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Basic routing
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Hello API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// Whoami API endpoint
app.get('/api/whoami', (req, res) => {
  // Get client IP, prefer x-forwarded-for for deployed apps
  const ipaddress = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];

  res.json({ ipaddress, language, software });
});

// Listen for requests
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
