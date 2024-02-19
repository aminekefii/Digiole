const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "../../public/uploads"); // Specify the destination folder
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  });

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.send('File uploaded successfully');
});

app.listen(3001, () => {
  console.log("Server is running");
});
