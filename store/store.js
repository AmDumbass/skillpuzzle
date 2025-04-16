import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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

const buy_combo = document.getElementById("buy-book-combo-btn");
const buy_1 = document.getElementById("buy-book-combo-btn");
const buy_2 = document.getElementById("buy-book-combo-btn");
const buy_3 = document.getElementById("buy-book-combo-btn");
const buy_4 = document.getElementById("buy-book-combo-btn");
const buy_5 = document.getElementById("buy-book-combo-btn");
const buy_6 = document.getElementById("buy-book-combo-btn");

