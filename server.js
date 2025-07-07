const express = require('express');
const needle = require('needle');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Halaman utama
app.get('/', (req, res) => res.render('index'));

// Endpoint API OTP (SPA via AJAX)
app.get('/api/send-otp/:phone', (req, res) => {
  const phone = req.params.phone;
  const formattedPhone = phone.replace(/^0/, '+62');
  needle.get(`https://core.ktbs.io/v2/user/registration/otp/${formattedPhone}`, (err, resp, body) => {
    const time = new Date().toLocaleTimeString();
    if (body && !body.errors) {
      res.json({ success: true, message: `[${time}] ✅ Sukses kirim ke ${formattedPhone}` });
    } else {
      res.json({ success: false, message: `[${time}] ❌ Gagal kirim ke ${formattedPhone}` });
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Running at http://localhost:${PORT}`);
});
