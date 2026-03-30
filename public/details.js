import { db } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const category = params.get('category');
const id = params.get('id');

const answerContainer = document.getElementById('answerContainer');

async function loadAnswer() {
    try {
        const docRef = doc(db, "Categories", category, "questions", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            answerContainer.innerHTML = `
                <h3>${data.question}</h3>
                <p class="answer-box">${data.answer}</p>
            `;
        } else {
            answerContainer.innerHTML = "<p>Answer not found.</p>";
        }
    } catch (error) {
        console.error(error);
        answerContainer.innerHTML = "<p>Error loading answer.</p>";
    }
}

loadAnswer();