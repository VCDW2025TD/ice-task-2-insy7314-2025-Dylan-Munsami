const fs = require('fs');
const https = require('https');
const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// 🔐 SSL options
const sslOptions = {
  key: fs.readFileSync('./ssl/privatekey.pem'),
  cert: fs.readFileSync('./ssl/certificate.pem'),
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    // Start HTTPS server after successful DB connection
    https.createServer(sslOptions, app).listen(PORT, () => {
      console.log(`✅ Secure server running at https://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
