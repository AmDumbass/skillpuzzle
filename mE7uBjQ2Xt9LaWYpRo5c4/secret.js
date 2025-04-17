import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, Timestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
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
const db = getFirestore(app);
const auth = getAuth(app);

async function firstVisit(book) {
    try {
        const user = auth.currentUser;
        
        const userId = user.uid;
        const docRef = doc(db, "book-has", userId);
        const docSnap = await getDoc(docRef);

        let bookHas = [];

        if (docSnap.exists()) {
            const data = docSnap.data();
            bookHas = Array.isArray(data.bookHas) ? data.bookHas : [];
        }

        if (!bookHas.includes(book)) 
            bookHas.push(book);

        await setDoc(docRef, {
            userId: userId,
            bookHas: bookHas
        }, { merge: true });

        window.location.href = "/book";
    } catch (error) {
        console.error("Error saving request: ", error);
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        firstVisit("book4");
    } else {
        console.log("User not logged in");
        // window.location.href = "/login";
    }
});