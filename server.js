// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const upload = multer({ dest: 'public/sounds/' });

app.use(express.json());
app.use(express.static('public'));

app.post('/api/upload-sound', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const newSound = {
    id: Date.now().toString(),
    name: req.body.name,
    url: `/sounds/${req.file.filename}`
  };

  try {
    // קריאה ועדכון של הקובץ JSON
    const soundsData = await fs.readFile('public/sounds.json', 'utf8');
    const sounds = JSON.parse(soundsData).sounds;
    sounds.push(newSound);
    await fs.writeFile('public/sounds.json', JSON.stringify({ sounds }, null, 2));

    res.json(newSound);
  } catch (error) {
    console.error('Error updating sounds.json:', error);
    res.status(500).send('Error updating sounds.json');
  }
});

app.post('/api/update-sounds', async (req, res) => {
  try {
    await fs.writeFile('public/sounds.json', JSON.stringify(req.body, null, 2));
    res.send('Sounds updated successfully');
  } catch (error) {
    console.error('Error updating sounds.json:', error);
    res.status(500).send('Error updating sounds.json');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});