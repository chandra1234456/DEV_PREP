import { db } from './firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form      = document.getElementById('adminForm');
const statusDiv = document.getElementById('adminStatus');
const submitBtn = form.querySelector('button[type="submit"]');

function showToast(type, message) {
    const icon = type === 'success' ? '✓' : '✕';
    statusDiv.innerHTML = `
        <div class="admin-toast ${type}">
            <span>${icon}</span> ${message}
        </div>`;

    // Auto-clear after 4 seconds
    setTimeout(() => { statusDiv.innerHTML = ''; }, 4000);
}

function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.innerHTML = isLoading
        ? `Saving…
           <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round"
                style="vertical-align:middle; margin-left:8px; animation: spin 1s linear infinite;">
             <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
           </svg>`
        : `Save to Firestore
           <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round"
                style="vertical-align:middle; margin-left:8px;">
             <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
             <polyline points="17 21 17 13 7 13 7 21"/>
             <polyline points="7 3 7 8 15 8"/>
           </svg>`;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        category:   document.getElementById('category').value.trim(),
        difficulty: document.getElementById('difficulty').value,
        question:   document.getElementById('question').value.trim(),
        answer:     document.getElementById('answer').value.trim(),
        imageUri:   document.getElementById('imageUri').value.trim() || null,
        code:       document.getElementById('codeBlock').value.trim() || null,
        timestamp:  new Date()
    };

    setLoading(true);

    try {
        await addDoc(collection(db, "Categories", data.category, "questions"), data);
        showToast('success', 'Question saved successfully!');
        form.reset();
    } catch (err) {
        showToast('error', 'Error: ' + err.message);
    } finally {
        setLoading(false);
    }
});