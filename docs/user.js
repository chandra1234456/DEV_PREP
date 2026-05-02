import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const listDiv = document.getElementById('contentList');
const searchInput = document.getElementById('searchInput');
const difficultyButtons = document.querySelectorAll("#difficultyFilters button");

let allQuestions = [];
let currentDifficulty = "All";

async function loadData() {
    listDiv.innerHTML = "Loading...";
    allQuestions = [];

    try {
        const categoriesSnapshot = await getDocs(collection(db, "Categories"));

        for (const categoryDoc of categoriesSnapshot.docs) {
            const categoryName = categoryDoc.id;

            const questionsSnapshot = await getDocs(
                collection(db, "Categories", categoryName, "questions")
            );

            questionsSnapshot.forEach((questionDoc) => {
                const item = questionDoc.data();
                allQuestions.push({ ...item, category: categoryName, id: questionDoc.id });
            });
        }

        renderQuestions();

    } catch (error) {
        console.error(error);
        listDiv.innerHTML = "<p>Error loading data.</p>";
    }
}

function renderQuestions() {
    listDiv.innerHTML = "";

    // Filter by difficulty
    let filtered = allQuestions;
    if (currentDifficulty !== "All") {
        filtered = filtered.filter(q => q.difficulty === currentDifficulty);
    }

    // Apply search filter
    const searchQuery = searchInput.value.toLowerCase();
    if (searchQuery) {
        filtered = filtered.filter(q => q.question.toLowerCase().includes(searchQuery));
    }

    if (filtered.length === 0) {
        listDiv.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">◎</div>
                <p>No questions found.</p>
            </div>`;
        return;
    }

    filtered.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = "question-card";
        card.style.animationDelay = `${index * 0.05}s`;

        const shortAnswerLimit = 100;
        const isShortAnswer = item.answer && item.answer.length <= shortAnswerLimit;
        const previewAnswer = !isShortAnswer && item.answer
            ? item.answer.substring(0, 80) + "..."
            : item.answer;

        // Difficulty badge
        const diffMap = {
            Basic:        'badge-basic',
            Intermediate: 'badge-intermediate',
            Advanced:     'badge-advanced',
        };
        const badgeClass = diffMap[item.difficulty] || 'badge-all';
        const badgeLabel = item.difficulty || 'General';

        card.innerHTML = `
            <div class="card-flex">
                <div class="card-text">
                    <h3>${item.question}</h3>
                    ${previewAnswer ? `<p class="answer-box">${previewAnswer}</p>` : ""}
                    <span class="badge ${badgeClass}">${badgeLabel}</span>
                </div>
                <div class="card-button">
                    ${!isShortAnswer && item.answer
                        ? `<button onclick="viewDetails('${item.category}', '${item.id}')">
                               View Answer
                               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:6px;">
                                 <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                               </svg>
                           </button>`
                        : ""}
                </div>
            </div>
            <span class="card-arrow">↗</span>
        `;

        listDiv.appendChild(card);
    });
}

// Navigate to details page
window.viewDetails = (category, id) => {
    window.location.href = `details.html?category=${category}&id=${id}`;
};

// Search
searchInput.addEventListener('input', () => renderQuestions());

// Difficulty filter
difficultyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentDifficulty = btn.dataset.difficulty;
        renderQuestions();
    });
});

loadData();