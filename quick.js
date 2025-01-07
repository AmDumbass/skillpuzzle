import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAhV_iCpb3JyTocRL5aWXOxMFbQVW4NnYo",
    authDomain: "skillpuzzle-5f627.firebaseapp.com",
    projectId: "skillpuzzle-5f627",
    storageBucket: "skillpuzzle-5f627.firebasestorage.app",
    messagingSenderId: "365308682982",
    appId: "1:365308682982:web:ab28961e0afbb0829b1127"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;

if (user == null){
    window.location.href="/login.html";
}
