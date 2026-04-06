// ============================================
// Toast Notification System
// ============================================
function showToast(message, type = 'info', duration = 4000) {
    // Remove existing toasts
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;

    const icons = {
        success: 'bx bxs-check-circle',
        error: 'bx bxs-error-circle',
        info: 'bx bxs-info-circle',
        warning: 'bx bxs-error'
    };

    toast.innerHTML = `
        <i class='${icons[type] || icons.info}'></i>
        <span>${message}</span>
        <i class='bx bx-x toast-close'></i>
    `;

    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('toast-show');
    });

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.remove('toast-show');
        setTimeout(() => toast.remove(), 400);
    });

    // Auto dismiss
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.remove('toast-show');
            setTimeout(() => toast.remove(), 400);
        }
    }, duration);
}

// ============================================
// Email Confirmation Modal
// ============================================
function showEmailConfirmModal(email) {
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.innerHTML = `
        <div class="confirm-modal">
            <div class="confirm-icon">
                <i class='bx bxs-envelope bx-tada'></i>
            </div>
            <h2>Check Your Email!</h2>
            <p>We've sent a confirmation link to</p>
            <div class="confirm-email">${email}</div>
            <p class="confirm-sub">Please click the link in the email to verify your account, then come back and login.</p>
            <button class="confirm-btn" id="confirm-ok-btn">
                <i class='bx bxs-check-circle'></i> Got it!
            </button>
        </div>
    `;
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        overlay.classList.add('confirm-show');
    });

    document.getElementById('confirm-ok-btn').addEventListener('click', () => {
        overlay.classList.remove('confirm-show');
        setTimeout(() => {
            overlay.remove();
            // Switch back to login form
            document.querySelector('.wrapper').classList.remove('active');
        }, 400);
    });
}

// ============================================
// Login Form Handler
// ============================================
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const btn = loginForm.querySelector('.btn');

        // Show loading
        btn.disabled = true;
        btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Logging in...';

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            btn.disabled = false;
            btn.textContent = 'Login';

            if (error.message.includes('Email not confirmed')) {
                showToast('Please confirm your email first! Check your inbox.', 'warning', 5000);
            } else if (error.message.includes('Invalid login credentials')) {
                showToast('Wrong email or password. Please try again.', 'error');
            } else {
                showToast(error.message, 'error');
            }
        } else {
            showToast('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1200);
        }
    });
}

// ============================================
// Register Form Handler
// ============================================
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fullName = document.getElementById('reg-name').value;
        const phone = document.getElementById('reg-phone').value;
        const type = document.getElementById('reg-type').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;

        if (!type) {
            showToast('Please select a user type (Client or Worker)', 'warning');
            return;
        }

        const btn = registerForm.querySelector('.btn');
        btn.disabled = true;
        btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Creating account...';

        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName,
                    phone_number: phone,
                    user_type: type
                }
            }
        });

        btn.disabled = false;
        btn.textContent = 'Sign Up';

        if (error) {
            if (error.message.includes('rate limit') || error.message.includes('Rate limit')) {
                showToast('Too many attempts! Please wait a few minutes and try again.', 'warning', 6000);
            } else {
                showToast(error.message, 'error');
            }
        } else if (data?.session) {
            // Email confirmation is OFF — user is auto-logged in
            showToast('Account created successfully! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1200);
        } else {
            // Email confirmation is ON — show check-email modal
            registerForm.reset();
            showEmailConfirmModal(email);
        }
    });
}
