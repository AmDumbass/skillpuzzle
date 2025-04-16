import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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
const db = getFirestore(app);

const buy_4 = document.getElementById("buy-book-4-btn");

async function requestBuy(requestType) {
    try {
        const user = auth.currentUser;
        if (!user) {
            console.log("User not logged in");
            window.location.href = "/login";
            return;
        }

        const userId = user.uid;
        const userName = user.displayName;
        const userEmail = user.email;
        const timestamp = Timestamp.now();

        const docRef = await addDoc(collection(db, "buy-request"), {
            userId: userId,
            timestamp: timestamp,
            userName: userName,
            userEmail: userEmail,
            requestType: requestType
        });

        console.log("Contact request saved with ID: ", docRef.id);

        window.location.href = "/thank-you";
    } catch (error) {
        console.error("Error saving contact request: ", error);
    }
}

buy_4.onclick = () => requestBuy('Sách 4');