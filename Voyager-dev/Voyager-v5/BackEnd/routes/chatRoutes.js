const express = require('express');
const { startChat, getOrCreateAssistant, getThreads, getChatHistory, deleteThread, deleteAssistantAndFiles } = require('../controllers/chatController');
const { verifyToken } = require('../controllers/authController');
const router = express.Router();

router.post('/chat', verifyToken, startChat);

router.get('/threads', verifyToken, getThreads);
router.get('/chatHistory/:threadId', verifyToken, getChatHistory);
router.delete('/threads/:threadId', verifyToken, deleteThread);
router.delete('/delete-assistant-files', deleteAssistantAndFiles);

module.exports = router;
