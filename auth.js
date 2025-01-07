import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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
const provider = new GoogleAuthProvider();
const googleLoginButton = document.getElementById("google-login-btn");

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, redirect to account page
        window.location.href = '/account.html';
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
            
            window.history.back();
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
});