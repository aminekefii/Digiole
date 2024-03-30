const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const uploadFolder = path.join(__dirname, '../../../public/uploads');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadFolder); // Specify the destination folder
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
}).single('file');

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).json({ error: 'Failed to upload file' });
    }
    console.log(req.body);
    console.log(req.file);
    res.send('File uploaded successfully');
  });
});

app.get('/files', (req, res) => {
  fs.readdir(uploadFolder, (err, files) => {
    if (err) {
      console.error('Error reading upload folder:', err);
      return res.status(500).json({ error: 'Failed to read upload folder' });
    }
    res.json({ files });
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
