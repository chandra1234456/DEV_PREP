import { db } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const category = params.get('category');
const id = params.get('id');

const answerContainer = document.getElementById('answerContainer');

function getDifficultyClass(difficulty) {
    const level = difficulty?.toLowerCase();
    if (level === 'easy') return 'badge-easy';
    if (level === 'intermediate') return 'badge-intermediate';
    if (level === 'hard') return 'badge-hard';
    return 'badge-intermediate';
}

function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

async function loadAnswer() {
    try {
        const docRef = doc(db, "Categories", category, "questions", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            const codeBlock = data.code
                ? `
                    <p class="detail-section-title">Code Example</p>
                    <pre><code>${escapeHtml(data.code)}</code></pre>
                `
                : '';

            answerContainer.innerHTML = `
                <p class="detail-question">${data.question}</p>
                <div class="detail-meta">
                    <span class="badge ${getDifficultyClass(data.difficulty)}">${data.difficulty}</span>
                </div>
                <p class="detail-section-title">Answer</p>
                <div class="answer-box">${data.answer}</div>
                ${codeBlock}
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