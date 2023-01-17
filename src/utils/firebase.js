import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4fyLMeEWQstf-1Je2rYZE3a_rsFr-Aak",
  authDomain: "electron-musicfy-e41be.firebaseapp.com",
  projectId: "electron-musicfy-e41be",
  storageBucket: "electron-musicfy-e41be.appspot.com",
  messagingSenderId: "1050712830724",
  appId: "1:1050712830724:web:d301d27da26ad5a6f61651",
};

export const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase);
