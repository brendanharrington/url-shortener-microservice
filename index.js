require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns').promises;
const mongoose = require('mongoose');
const Url = require("./models/Url");

const app = express();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Connection error:", err));

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/shorturl", async function (req, res) {
  let original_url = req.body.url;

  try {
    const hostname = new URL(original_url).hostname;

    // Wait for DNS lookup
    await dns.lookup(hostname);

    // Check if URL already exists
    let existing = await Url.findOne({ original_url });
    if (existing) {
      return res.json({
        original_url: existing.original_url,
        short_url: existing.short_url,
      });
    }

    // Create new short_url as count+1
    const count = await Url.countDocuments({});
    const short_url = count + 1;

    const newUrl = new Url({ original_url, short_url });
    await newUrl.save();

    res.json({
      original_url: newUrl.original_url,
      short_url: newUrl.short_url,
    });
  } catch {
    res.json({ error: "invalid url" });
  }
});

app.get('/api/shorturl/:id', async function (req, res) {
  try {
    const id = parseInt(req.params.id, 10);

    const urlDoc = await Url.findOne({ short_url: id });
    if (urlDoc) {
      return res.redirect(urlDoc.original_url);
    }

    res.json({ error: "No short URL found" });
  } catch (err) {
    res.json({ error: "Server error" });
  }
});

app.listen(port, function() { console.log(`Listening on port ${port}`); });