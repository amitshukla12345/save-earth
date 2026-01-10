/**
 * auth.js
 * Handles login and register logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // --- Helper: Clear Error on Input ---
    function clearError(input) {
        input.addEventListener('input', () => {
            input.classList.remove('input-error');
        });
    }

    // --- Login Logic ---
    if (loginForm) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        clearError(emailInput);
        clearError(passwordInput);

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = loginForm.querySelector('.btn-auth');

            // Get stored credentials
            const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

            if (storedUser && storedUser.email === emailInput.value && storedUser.password === passwordInput.value) {
                // Success
                submitBtn.innerText = 'Logging in...';
                submitBtn.disabled = true;
                // Remove any previous errors
                emailInput.classList.remove('input-error');
                passwordInput.classList.remove('input-error');

                setTimeout(() => {
                    localStorage.setItem('isLoggedIn', 'true');
                    window.location.href = 'home.html';
                }, 1000);
            } else {
                // Failure - Show Red Lines
                emailInput.classList.add('input-error');
                passwordInput.classList.add('input-error');
                alert('Invalid Email or Password! Please try again.');
            }
        });
    }

    // --- Register Logic ---
    if (registerForm) {
        const passInput = document.getElementById('password');
        const confirmInput = document.getElementById('confirm-password');

        clearError(passInput);
        clearError(confirmInput);

        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = passInput.value;
            const confirm = confirmInput.value;

            if (password !== confirm) {
                // Show Red Lines on Mismatch
                passInput.classList.add('input-error');
                confirmInput.classList.add('input-error');
                alert("Passwords do not match!");
                return;
            }

            const submitBtn = registerForm.querySelector('.btn-auth');
            submitBtn.innerText = 'Creating Account...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Store user data
                const user = { name, email, password };
                localStorage.setItem('registeredUser', JSON.stringify(user));

                alert('Account Created Successfully! Please Login.');
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
