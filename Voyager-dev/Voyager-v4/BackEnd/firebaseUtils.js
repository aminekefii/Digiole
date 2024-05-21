// firebaseUtils.js

const admin = require('firebase-admin');

// Function to upload thread details JSON to Firebase Storage
async function uploadThreadDetailsToStorage(userId, threadId) {
  try {
    const threadDetails = { threadId: threadId };
    const threadDetailsJson = JSON.stringify(threadDetails, null, 2);
    const buffer = Buffer.from(threadDetailsJson, 'utf8');

    const bucket = admin.storage().bucket();
    const file = bucket.file(`users/${userId}/thread_details.json`);

    // Upload the buffer as a file to Firebase Storage
    await file.save(buffer, {
      metadata: {
        contentType: 'application/json',
      }
    });

    console.log("Thread details JSON uploaded to Firebase Storage successfully.");
  } catch (error) {
    console.error("Error uploading thread details JSON:", error);
  }
}

module.exports = { uploadThreadDetailsToStorage };