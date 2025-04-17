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
    const userDocRef = doc(db, "book-has", userId);
    const docSnap = await getDoc(userDocRef);
  
    if (docSnap.exists()) {
        const userData = docSnap.data();
        const booksArray = userData.bookHas || [];
        return booksArray;
    } else {
        console.log("No such document!");
        return [];
    }
  }

async function displayUserBooks() {
    const books = await getUserBooks();
    const booksContainer = document.getElementById("book-nav-books");
    const bookContainer = document.getElementById("book-container");

    if (booksContainer) {
        booksContainer.innerHTML = "";
  
        if (books.length === 0) {
            booksContainer.textContent = "No books owned yet.";
        } else {
            const bookContent = {
                book1: {
                    title: "Chủ đề 1: An toàn cá nhân",
                    episodes: [
                        "Tập 1: Cảnh giác với người lạ", 
                        "Tập 2: An toàn giao thông", 
                        "Tập 3: An toàn với ổ điện", 
                        "Tập 4: Tránh xa vật sắc nhọn", 
                        "Tập 5: Sử dụng công nghệ an toàn"
                    ]
                },
                book2: {
                    title: "Chủ đề 2: Chăm sóc bản thân",
                    episodes: [
                        "Tập 1: Cùng đánh răng nào", 
                        "Tập 2: Rửa tay sạch, bảo vệ sức khỏe", 
                        "Tập 3: Tập dọn đồ chơi", 
                        "Tập 4: Phân biệt giày trái, phải", 
                        "Tập 5: Học cách đi vệ sinh"
                    ]
                },
                book3: {
                    title: "Chủ đề 3: Quản lí cảm xúc",
                    episodes: [
                        "Tập 1: Thật là vui", 
                        "Tập 2: Vì sao Zino buồn vậy?", 
                        "Tập 3: Zino ơi, đừng tức giận nhé!", 
                        "Tập 4: Đừng sợ, mạnh mẽ lên nào", 
                        "Tập 5: Hãy nói ra cảm xúc"
                    ]
                },
                book4: {
                    title: "Chủ đề 4: Tương tác xã hội",
                    episodes: [
                        "Tập 1: Các bạn nhỏ cùng chia sẻ đồ chơi", 
                        "Tập 2: Chơi cùng nhau nào", 
                        "Tập 3: Thể hiện nhu cầu", 
                        "Tập 4: Học cách chờ đến lượt", 
                        "Tập 5: Không dùng bạo lực"
                    ]
                },
                book5: {
                    title: "Chủ đề 5: Bảo vệ môi trường",
                    episodes: [
                        "Tập 1: Học cách tái chế", 
                        "Tập 2: Đừng xả rác nhé!", 
                        "Tập 3: Hãy giữ sông, suối sạch sẽ", 
                        "Tập 4: Trồng cây thật là vui", 
                        "Tập 5: Tiết kiệm nước thật là tốt"
                    ]
                },
                book6: {
                    title: "Chủ đề 6: Kỹ năng giao tiếp",
                    episodes: [
                        "Tập 1: Kỹ năng giao tiếp", 
                        "Tập 2: Xin chào và tạm biệt", 
                        "Tập 3: Xin lỗi và cảm ơn", 
                        "Tập 4: Học cách xưng hô đúng", 
                        "Tập 5: Nói đồng ý và từ chối"
                    ]
                }
            };

            books.forEach((book) => {
                const bookElement = document.createElement("div");
                const cleanedBook = book.trim().toLowerCase();

                const content = bookContent[cleanedBook];

                if (content) {
                    const episodesHTML = content.episodes.map((ep, index) => 
                        `<li><button data-book="${cleanedBook}" data-episode="${index}">${ep}</button></li>`
                    ).join("");

                    bookElement.innerHTML = 
                        `<h3>${content.title}</h3>
                        <ul>${episodesHTML}</ul>`;
                } else {
                    bookElement.textContent = book;
                }

                booksContainer.appendChild(bookElement);
            });

            // Add event listeners for all episode buttons
            booksContainer.addEventListener('click', (event) => {
                if (event.target && event.target.tagName === 'BUTTON') {
                    const bookKey = event.target.getAttribute('data-book');
                    const episodeIndex = event.target.getAttribute('data-episode');

                    if (bookKey && episodeIndex !== null) {
                        // const selectedEpisode = bookContent[bookKey].episodes[episodeIndex];
                        // Replace the content of the book-container element with the selected episode
                        if (bookContainer) {
                            bookContainer.innerHTML = `<iframe height="500px" width="900px" src="/books folder/en/${bookKey}/ep${Number(episodeIndex) + 1}/"></iframe>`;
                        }
                    }
                }
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