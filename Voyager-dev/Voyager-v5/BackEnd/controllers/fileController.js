const multer = require("multer");
const path = require("path");
const admin = require("firebase-admin");
const fs = require("fs");
const fsPromises = require("fs").promises;
const dotenv = require('dotenv');
dotenv.config();
const { uploadFileToFirebase } = require('../services/firebaseService');
const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
const uploadFolder = path.join(__dirname, '../uploads');
const downloadFolder = path.join(__dirname, '../downloads');
const assistantFilePath = path.join(__dirname, '../voyager_assistant.json');

const multerStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 1024 * 1024 * 10 }
}).single('file');

const uploadFile = async (req, res) => {
  const userId = req.user.uid;
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).json({ error: 'Failed to upload file' });
    }

    try {
      const fileName = req.file.filename;
      const filePath = path.join(uploadFolder, fileName);
      const firebaseStoragePath = await uploadFileToFirebase(userId, filePath, fileName);

      const assistantData = await fsPromises.readFile(assistantFilePath, "utf8");
      const assistantDetails = JSON.parse(assistantData);

      // Upload the file to OpenAI
      const file = await openai.files.create({
        file: fs.createReadStream(filePath),
        purpose: "assistants",
      });

      let existingFileIds = assistantDetails.file_ids || [];

      // Update the assistant
      await openai.beta.assistants.update(assistantDetails.assistantId, {
        file_ids: [...existingFileIds, file.id],
      });

      assistantDetails.file_ids = [...existingFileIds, file.id];
      await fsPromises.writeFile(
        assistantFilePath,
        JSON.stringify(assistantDetails, null, 2)
      );

      console.log("File uploaded and successfully added to assistant\n");

      res.status(200).json({ fileId: file.id, firebasePath: firebaseStoragePath });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  });
};



const getUploadedFiles = async (req, res) => {
  try {
    const userId = req.user.uid;
    const bucket = admin.storage().bucket();
    const [files] = await bucket.getFiles({ prefix: `users/${userId}/uploadedFiles/` });

    const fileNames = await Promise.all(files.map(async (file) => {
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-17-2025' 
      });
      return {
        name: file.name.split('/').pop(),
        url: url
      };
    }));

    res.status(200).json({ files: fileNames });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve files' });
  }
};

const deleteFile = async (req, res) => {
  try {
    const userId = req.user.uid;
    const fileName = req.params.fileName;
    const filePath = `users/${userId}/uploadedFiles/${fileName}`;

    // Delete the file from Firebase Storage
    await admin.storage().bucket().file(filePath).delete();

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
};

const downloadFile = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../downloads', filename);

  res.download(filePath, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Error downloading file');
    }
  });
};

const checkFileReady = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../downloads', filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File not available:', err);
      res.json({ ready: false, error: 'File not available' });
    } else {
      res.json({ ready: true });
    }
  });
};

module.exports = {
  uploadFile,
  getUploadedFiles,
  deleteFile,
  downloadFile,
  checkFileReady
};
