const admin = require("firebase-admin");

const uploadFileToFirebase = async (userId, filePath, fileName) => {
  const storage = admin.storage().bucket();
  const firebaseStoragePath = `users/${userId}/uploadedFiles/${fileName}`;
  await storage.upload(filePath, {
    destination: firebaseStoragePath
  });
  return firebaseStoragePath;
};

module.exports = {
  uploadFileToFirebase
};
