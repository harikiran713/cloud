// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjQGB8bgQFdwu98F3isMuF2he6XCMaSF8",
  authDomain: "iridescence-page.firebaseapp.com",
  projectId: "iridescence-page",
  storageBucket: "iridescence-page.appspot.com",
  messagingSenderId: "353853960233",
  appId: "1:353853960233:web:9314ffc594041692356c38",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
