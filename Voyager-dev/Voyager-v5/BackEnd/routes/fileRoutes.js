const express = require('express');
const { uploadFile, getUploadedFiles, deleteFile, downloadFile, checkFileReady } = require('../controllers/fileController');
const { verifyToken } = require('../controllers/authController');
const router = express.Router();

router.post('/upload', verifyToken, uploadFile);
router.get('/uploadedFiles', verifyToken, getUploadedFiles);
router.delete('/deleteFirebasefile/:fileName', verifyToken, deleteFile);
//router.delete('/delete-files', verifyToken, deleteFiles);
router.get('/downloads/:filename', downloadFile);
router.get('/file-ready/:filename', checkFileReady);

module.exports = router;
