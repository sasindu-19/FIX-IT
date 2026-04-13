/**
 * Show a toast notification.
 * @param {string} message
 * @param {'success'|'error'|'warning'|'info'} type
 * @param {number} duration  ms before auto-dismiss (0 = no auto-dismiss)
 */
function showToast(message, type = 'info', duration = 4000) {
  const icons = {
    success: 'bx bx-check-circle',
    error: 'bx bx-error-circle',
    warning: 'bx bx-error',
    info: 'bx bx-info-circle',
  };

  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.innerHTML = `
    <i class="${icons[type] || icons.info}"></i>
    <span>${message}</span>
    <i class="bx bx-x toast-close"></i>
  `;

  document.body.appendChild(toast);

  // Slide in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('toast-show'));
  });

  const dismiss = () => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 500);
  };

  toast.querySelector('.toast-close').addEventListener('click', dismiss);
  if (duration > 0) setTimeout(dismiss, duration);
}


// ============================================================
// REAL-TIME FIELD VALIDATION HELPERS
// ============================================================

/** Mark a field as valid (removes any error state) */
function setValid(fieldId) {
  const el = document.getElementById(fieldId);
  if (!el) return;
  el.style.borderColor = '';
  el.style.boxShadow = '';
  const msg = el.parentElement.querySelector('.field-error');
  if (msg) msg.remove();
}

/** Mark a field as invalid and show an inline error message */
function setError(fieldId, message) {
  const el = document.getElementById(fieldId);
  if (!el) return;
  el.style.borderColor = 'rgba(239,68,68,.6)';
  el.style.boxShadow = '0 0 0 3px rgba(239,68,68,.12)';

  // Remove old error msg if any
  const existing = el.parentElement.querySelector('.field-error');
  if (existing) existing.remove();

  const msg = document.createElement('p');
  msg.className = 'field-error';
  msg.textContent = message;
  msg.style.cssText = 'color:#ef4444;font-size:.72rem;margin-top:5px;';
  el.parentElement.appendChild(msg);
}

/** Validate a single field and return true if valid */
function validateField(fieldId, rules) {
  const el = document.getElementById(fieldId);
  if (!el) return true;
  const val = el.value.trim();

  for (const rule of rules) {
    if (!rule.test(val)) {
      setError(fieldId, rule.message);
      return false;
    }
  }
  setValid(fieldId);
  return true;
}

// Validation rule sets per field
const RULES = {
  jobTitle: [
    { test: v => v.length > 0, message: 'Job title is required.' },
    { test: v => v.length >= 5, message: 'Title must be at least 5 characters.' },
  ],
  description: [
    { test: v => v.length > 0, message: 'Description is required.' },
    { test: v => v.length >= 20, message: 'Please describe the job in at least 20 characters.' },
  ],
  payRate: [
    { test: v => v.length > 0, message: 'Pay rate is required.' },
    { test: v => !isNaN(v) && +v > 0, message: 'Enter a valid amount greater than 0.' },
    { test: v => +v >= 100, message: 'Minimum pay rate is Rs. 100.' },
  ],
  bizReg: [
    { test: v => v.length > 0, message: 'Business registration number is required.' },
  ],
};

/** Attach real-time validation to an input/textarea */
function attachRealtimeValidation(fieldId, rules) {
  const el = document.getElementById(fieldId);
  if (!el) return;

  // Validate on blur (when user leaves the field)
  el.addEventListener('blur', () => validateField(fieldId, rules));

  // Clear error while typing after first failure
  el.addEventListener('input', () => {
    if (el.style.borderColor) validateField(fieldId, rules);
  });
}


// ============================================================
// UI INTERACTIONS — runs after DOM is ready
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // ── Preview element refs ──
  const prevTitle = document.getElementById('prevTitle');
  const prevLocation = document.getElementById('prevLocation');
  const prevPay = document.getElementById('prevPay');
  const prevDiff = document.getElementById('prevDiff');
  const prevGender = document.getElementById('prevGender');
  const prevAge = document.getElementById('prevAge');
  const prevBiz = document.getElementById('prevBiz');

  // Reset placeholder previews
  prevTitle.textContent = 'Job Title';
  prevPay.textContent = 'Rs. —';

  // ── Cascading Location Dropdowns ──
  initLocationDropdowns('province', 'district', 'city', (province, district, city) => {
    const loc = [city, district].filter(Boolean);
    prevLocation.textContent = loc.length ? loc.join(', ') : '—';
  });

  // ── Job Title sync + real-time validation ──
  const jobTitleEl = document.getElementById('jobTitle');
  jobTitleEl.addEventListener('input', () => {
    prevTitle.textContent = jobTitleEl.value.trim() || 'Job Title';
    if (jobTitleEl.style.borderColor) validateField('jobTitle', RULES.jobTitle);
  });
  jobTitleEl.addEventListener('blur', () => validateField('jobTitle', RULES.jobTitle));

  // ── Description real-time validation ──
  attachRealtimeValidation('description', RULES.description);

  // ── Pay Rate sync + real-time validation ──
  const payRateEl = document.getElementById('payRate');
  payRateEl.value = '';
  payRateEl.addEventListener('input', () => {
    const val = parseInt(payRateEl.value);
    prevPay.textContent = val > 0 ? 'Rs. ' + val.toLocaleString() : 'Rs. —';
    if (payRateEl.style.borderColor) validateField('payRate', RULES.payRate);
  });
  payRateEl.addEventListener('blur', () => validateField('payRate', RULES.payRate));

  // ── Min Age sync ──
  const minAgeEl = document.getElementById('minAge');
  minAgeEl.addEventListener('change', () => {
    prevAge.textContent = minAgeEl.value;
  });

  // ── Difficulty Cards ──
  document.querySelectorAll('.diff-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.diff-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const val = card.dataset.value;
      prevDiff.textContent = val;
      prevDiff.removeAttribute('class');
      prevDiff.removeAttribute('style');
      if (val === 'Easy') prevDiff.classList.add('tag-easy');
      if (val === 'Medium') prevDiff.classList.add('tag-age');
      if (val === 'Hard') {
        prevDiff.style.cssText =
          'border-color:rgba(239,68,68,.35);color:#ef4444;' +
          'background:rgba(239,68,68,.08);padding:4px 10px;' +
          'border-radius:20px;font-size:.7rem;font-weight:600;border:1px solid;';
      }
    });
  });

  // ── Generic Button Group helper ──
  const setupGroup = (id, cb) => {
    const group = document.getElementById(id);
    if (!group) return;
    group.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (cb) cb(btn.dataset.value);
      });
    });
  };

  // ── Gender selection ──
  setupGroup('genderGroup', val => {
    prevGender.textContent = val;
  });

  // ── Posting As (Individual / Business) ──
  const bizRegBox = document.getElementById('bizRegBox');
  setupGroup('postingGroup', val => {
    const isBiz = val === 'Business';
    bizRegBox.style.display = isBiz ? 'block' : 'none';
    prevBiz.style.display = isBiz ? 'inline-block' : 'none';
    // Attach biz validation only when visible
    if (isBiz) {
      attachRealtimeValidation('bizReg', RULES.bizReg);
    } else {
      setValid('bizReg');
    }
  });

  // ── Workers Counter ──
  let workerCount = 1;
  const cVal = document.getElementById('c-val');
  const cMinus = document.getElementById('c-minus');
  const cPlus = document.getElementById('c-plus');
  cMinus?.addEventListener('click', () => {
    if (workerCount > 1) cVal.textContent = --workerCount;
  });
  cPlus?.addEventListener('click', () => {
    cVal.textContent = ++workerCount;
  });
});


// ============================================================
// ACCESS CONTROL (client-only) — runs immediately via Supabase
// ============================================================
(async () => {
  const user = await getCurrentUser();

  if (!user) {
    showAccessDenied(
      'Login Required',
      'You need to login first to post a job. Create an account or login to continue.',
      'bxs-lock-alt',
      [
        { text: 'Login Now', href: 'login.html', cls: 'primary' },
        { text: 'Go Home', href: 'index.html', cls: 'secondary' }
      ]
    );
    return;
  }

  const profile = await getUserProfile(user.id);
  
  if (profile && (!profile.gender || !profile.dob)) {
    window.location.href = 'signup.html';
    return;
  }

  const userType = profile?.user_type;

  if (userType !== 'client') {
    showAccessDenied(
      'Access Denied',
      'Only Clients can post jobs. As a Worker, you can browse and apply for available jobs instead.',
      'bxs-shield-x',
      [
        { text: 'Find Work', href: 'jobs.html', cls: 'primary' },
        { text: 'Go Home', href: 'index.html', cls: 'secondary' }
      ]
    );
    return;
  }

  document.getElementById('page-content').style.display = '';
})();





// ============================================================
// FORM VALIDATION & SUBMISSION
// ============================================================
document.getElementById('jobForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const title = document.getElementById('jobTitle').value.trim();
  const desc = document.getElementById('description').value.trim();
  const category = document.getElementById('category').value;
  const budget = document.getElementById('payRate').value;
  const province = document.getElementById('province').value;
  const district = document.getElementById('district').value;
  const city = document.getElementById('city').value;
  const diff = document.querySelector('.diff-card.active')?.dataset.value || 'Easy';
  const gender = document.querySelector('#genderGroup .active')?.dataset.value || 'Any Gender';
  const posting = document.querySelector('#postingGroup .active')?.dataset.value || 'Individual';
  const bizReg = document.getElementById('bizReg')?.value || '';
  const minAge = document.getElementById('minAge').value;
  const workers = document.getElementById('c-val').textContent;

  // ── Run all validations, collect failures ──
  const checks = [
    validateField('jobTitle', RULES.jobTitle),
    validateField('description', RULES.description),
    validateField('payRate', RULES.payRate),
    ...(posting === 'Business' ? [validateField('bizReg', RULES.bizReg)] : []),
  ];

  // Location checks (no inline input, use toast)
  const locationErrors = [];
  if (!province) locationErrors.push('Province');
  if (!district) locationErrors.push('District');
  if (!city) locationErrors.push('City / Area');

  if (locationErrors.length) {
    showToast(`Please select: ${locationErrors.join(', ')}.`, 'warning');
    checks.push(false);
  }

  // If any check failed, stop and show summary toast
  if (checks.includes(false)) {
    showToast('Please fix the highlighted fields before posting.', 'error');
    return;
  }

  // ── TODO: Save to Supabase jobs table ──
  const jobData = { title, desc, category, budget, province, district, city, diff, gender, posting, bizReg, minAge, workers };
  console.log('Job Post Data:', jobData);

  showToast('✅ Job posted successfully!', 'success', 5000);
  setTimeout(() => this.reset(), 500);
});
