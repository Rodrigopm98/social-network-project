import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyCJENsXQM273tyHVT-j8Gh0-o0iQPoRN1Q",
  authDomain: "social-network-dev-e3ccc.firebaseapp.com",
  projectId: "social-network-dev-e3ccc",
  storageBucket: "social-network-dev-e3ccc.appspot.com",
  messagingSenderId: "1060621303278",
  appId: "1:1060621303278:web:00b42d643975c8fa61a2ff"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app); 