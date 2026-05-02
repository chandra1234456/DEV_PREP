import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword }
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const loginBtn = document.getElementById('loginBtn');
const errorMsg = document.getElementById('errorMsg');

loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validation
    if (!email || !password) {
        errorMsg.innerText = "Please fill in all fields.";
        return;
    }

    try {
        loginBtn.disabled = true;
        loginBtn.innerText = "Logging in...";

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("Login successful:", user);

        // Role-based redirect
        if (user.email === "admin@gmail.com") {
            window.location.href = "admin.html";
        }
        else if (user.email === "bala@gmail.com") {
            window.location.href = "user.html";
        }
        else {
            errorMsg.innerText = "Unauthorized user";
        }

    } catch (error) {
        console.error(error);

        if (error.code === 'auth/invalid-credential') {
            errorMsg.innerText = "Invalid email or password.";
        } else if (error.code === 'auth/user-not-found') {
            errorMsg.innerText = "User not found.";
        } else if (error.code === 'auth/wrong-password') {
            errorMsg.innerText = "Wrong password.";
        } else {
            errorMsg.innerText = error.message;
        }
    } finally {
        loginBtn.disabled = false;
        loginBtn.innerText = "Login";
    }
});