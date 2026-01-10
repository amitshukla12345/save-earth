/**
 * auth.js
 * Handles login and register logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // --- Login Logic ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = loginForm.querySelector('.btn-auth');
            submitBtn.innerText = 'Logging in...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Set session
                localStorage.setItem('isLoggedIn', 'true');
                // Redirect to Home Page (which is now home.html)
                window.location.href = 'home.html';
            }, 1000);
        });
    }

    // --- Register Logic ---
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            const confirm = document.getElementById('confirm-password').value;

            if (password !== confirm) {
                alert("Passwords do not match!");
                return;
            }

            const submitBtn = registerForm.querySelector('.btn-auth');
            submitBtn.innerText = 'Creating Account...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Account Created! Please Login.');
                // Redirect to Login Page (index.html)
                window.location.href = 'index.html';
            }, 1000);
        });
    }

    // --- Logout Logic (Global) ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Logout?')) {
                localStorage.removeItem('isLoggedIn');
                // Redirect to Login Page (index.html)
                // Need to handle if we are in subfolder
                const currentPath = window.location.pathname;
                if (currentPath.includes('/html/')) {
                    window.location.href = '../index.html';
                } else {
                    window.location.href = 'index.html';
                }
            }
        });
    }
});
