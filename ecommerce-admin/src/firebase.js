import { initializeApp } from "firebase/app";  
import { getStorage } from "firebase/storage";  

// Your web app's Firebase configuration  
const firebaseConfig = {  
  apiKey: "AIzaSyAjQGB8bgQFdwu98F3isMuF2he6XCMaSF8",  
  authDomain: "iridescence-page.firebaseapp.com",  
  projectId: "iridescence-page",  
  storageBucket: "iridescence-page.appspot.com",  
  messagingSenderId: "353853960233",  
  appId: "1:353853960233:web:9314ffc594041692356c38"  
};  

// Initialize Firebase  
const app = initializeApp(firebaseConfig);  

// Initialize Cloud Storage and get a reference to the service  
const storage = getStorage(app);  

export { app, storage };  