const dotenv = require('dotenv');
const express = require("express");
const cors = require("cors");
const helmet = require('helmet');
const admin = require("firebase-admin");
const OpenAI = require("openai");

dotenv.config();

const app = express();

// Initialize Firebase Admin SDK
var serviceAccount = require("./firebase/voyager-4d279-firebase-adminsdk-q9dfx-2145fe62b7.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://voyager-4d279-default-rtdb.firebaseio.com",
  storageBucket: "gs://voyager-4d279.appspot.com"
});

app.use(cors({ origin: "http://localhost:3001" }));
app.use(express.json());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://accounts.google.com/gsi/client"],
      frameSrc: ["'self'", "https://accounts.google.com/gsi/"],
      connectSrc: ["'self'", "https://accounts.google.com/gsi/"]
    }
  }
}));



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });



// Routes 
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const fileRoutes = require('./routes/fileRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
