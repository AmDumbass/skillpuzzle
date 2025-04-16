import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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

const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userPhoto = document.getElementById('user-photo');
const signOutButton = document.getElementById('sign-out-btn');

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, display their info
        userName.textContent = `Tên: ${user.displayName || 'No name available'}`;
        userEmail.textContent = `Email: ${user.email}`;
        userPhoto.src = user.photoURL || 'https://via.placeholder.com/100';  // Default photo if none is provided
    } else {
        // User is not signed in, redirect to login page
        window.location.href = '/login.html';
    }
});

// Sign out functionality
signOutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = '/index.html';
    }).catch((error) => {
        // An error happened.
        console.error('Error signing out:', error);
    });
});