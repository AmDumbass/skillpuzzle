import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
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

async function getUserBooks() {
    const user = auth.currentUser;
    if (!user) {
      console.log("No user is currently signed in.");
      return [];
    }
  
    const userId = user.uid;
    const userDocRef = doc(db, "book-has", userId); // Replace 'yourCollectionName' with the actual name
    const docSnap = await getDoc(userDocRef);
  
    if (docSnap.exists()) {
        const userData = docSnap.data();
        const booksArray = userData.bookHas || []; // Assuming the array field is named 'ownedBooks'
        return booksArray;
    } else {
        console.log("No such document!");
        return []; // Return an empty array if the document doesn't exist
    }
  }

async function displayUserBooks() {
    const books = await getUserBooks();
    const booksContainer = document.getElementById("book-nav-books"); // Assuming you have an element with this ID in your HTML
  
    if (booksContainer) {
        booksContainer.innerHTML = ""; // Clear any previous content
  
        if (books.length === 0) {
            booksContainer.textContent = "No books owned yet.";
        } else {
            books.forEach((book) => {
                const bookElement = document.createElement("div");
                bookElement.textContent = book; // Assuming 'book' is just a string representing the book title
                booksContainer.appendChild(bookElement);
            });
        }
    } else {
        console.error("Element with ID 'book-nav-books' not found.");
    }
}
  
onAuthStateChanged(auth, (user) => {
    if (user) {
        displayUserBooks();
    }
})