import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDmQFQGnCvqjoQbYlJeqdIEw6Phm7hiPcM",
    authDomain: "skillpuzzle-32e3a.firebaseapp.com",
    projectId: "skillpuzzle-32e3a",
    storageBucket: "skillpuzzle-32e3a.firebasestorage.app",
    messagingSenderId: "808477225029",
    appId: "1:808477225029:web:202037376f42c3761d332c",
    measurementId: "G-F87LWSGP0D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// auth.useDeviceLanguage();
const provider = new GoogleAuthProvider(auth);
const googleLoginButton = document.getElementById("google-login-btn");

onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = '/index.html';
    }
});

googleLoginButton.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        })}
);