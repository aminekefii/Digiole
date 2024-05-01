import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCVEVWYVbAemcqNTiNnrJvsi4mEUWTa6OQ",
  authDomain: "voyager-4d279.firebaseapp.com",
  projectId: "voyager-4d279",
  storageBucket: "voyager-4d279.appspot.com",
  messagingSenderId: "798262084626",
  appId: "1:798262084626:web:5be4bf5933862c4377c4cb",
  measurementId: "G-9L86NDNBML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


const storage = getStorage(app);


export { app, auth };

// Storage
export async function ProfilePic(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
}