/**
 * AuraLife Energy Therapy - Client Portal JavaScript
 */
(function () {
  'use strict';

  /* ==========================================================
     CHAKRA DATA & METADATA
     ========================================================== */
  const chakraData = [
    {
      id: 1,
      color: '#ef4444',
      nameKey: 'chakra_1_name',
      physicalKey: 'chakra_1_physical',
      psychologicalKey: 'chakra_1_psychological'
    },
    {
      id: 2,
      color: '#f97316',
      nameKey: 'chakra_2_name',
      physicalKey: 'chakra_2_physical',
      psychologicalKey: 'chakra_2_psychological'
    },
    {
      id: 3,
      color: '#eab308',
      nameKey: 'chakra_3_name',
      physicalKey: 'chakra_3_physical',
      psychologicalKey: 'chakra_3_psychological'
    },
    {
      id: 4,
      color: '#22c55e',
      nameKey: 'chakra_4_name',
      physicalKey: 'chakra_4_physical',
      psychologicalKey: 'chakra_4_psychological'
    },
    {
      id: 5,
      color: '#3b82f6',
      nameKey: 'chakra_5_name',
      physicalKey: 'chakra_5_physical',
      psychologicalKey: 'chakra_5_psychological'
    },
    {
      id: 6,
      color: '#6366f1',
      nameKey: 'chakra_6_name',
      physicalKey: 'chakra_6_physical',
      psychologicalKey: 'chakra_6_psychological'
    },
    {
      id: 7,
      color: '#a855f7',
      nameKey: 'chakra_7_name',
      physicalKey: 'chakra_7_physical',
      psychologicalKey: 'chakra_7_psychological'
    }
  ];

  let activeChakraId = 1;

  function translate(key) {
    if (typeof window.t === 'function') {
      return window.t(key);
    }
    return key;
  }

  /* ==========================================================
     INITIALIZATION
     ========================================================== */
  function initApp() {
    if (typeof window.initLanguage === 'function') {
      window.initLanguage();
    }

    initMobileNav();
    initSmoothScroll();
    initChakraExplorer();
    initBookingForm();
    initFeedbackForm();

    // Re-render when language toggle clicked
    document.addEventListener('languageChanged', () => {
      renderChakraList();
      renderChakraDetails();
    });
  }

  /* ==========================================================
     MOBILE NAVIGATION
     ========================================================== */
  function initMobileNav() {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('navMobile');
    const mobileToggle = document.getElementById('langToggleMobile');

    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        btn.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    if (mobileToggle && typeof window.toggleLanguage === 'function') {
      mobileToggle.addEventListener('click', () => {
        window.toggleLanguage();
      });
    }
  }

  /* ==========================================================
     SMOOTH SCROLLING
     ========================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ==========================================================
     INTERACTIVE CHAKRA EXPLORER
     ========================================================== */
  function initChakraExplorer() {
    renderChakraList();
    renderChakraDetails();
  }

  function renderChakraList() {
    const list = document.getElementById('chakraList');
    if (!list) return;

    list.innerHTML = '';

    chakraData.forEach(item => {
      const li = document.createElement('li');
      li.className = 'chakra-item' + (item.id === activeChakraId ? ' active' : '');
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.gap = '0.75rem';
      li.style.padding = '0.85rem 1rem';
      li.style.borderRadius = 'var(--radius-sm)';
      li.style.marginBottom = '0.4rem';
      li.style.transition = 'all 0.25s ease';

      const dot = document.createElement('span');
      dot.className = 'chakra-dot';
      dot.style.background = item.color;

      const name = document.createElement('span');
      name.textContent = translate(item.nameKey);
      name.style.fontWeight = '600';

      li.appendChild(dot);
      li.appendChild(name);

      li.addEventListener('click', () => {
        activeChakraId = item.id;
        renderChakraList();
        renderChakraDetails();
      });

      list.appendChild(li);
    });
  }

  function renderChakraDetails() {
    const details = document.getElementById('chakraDetails');
    if (!details) return;

    const chakra = chakraData.find(c => c.id === activeChakraId) || chakraData[0];

    const physLabel = translate('chakra_physical_label') || 'Physical Functions:';
    const psychLabel = translate('chakra_psychological_label') || 'Psychological Functions:';

    details.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
        <span class="chakra-dot" style="background: ${chakra.color}; width: 20px; height: 20px;"></span>
        <h3 style="color: ${chakra.color}; margin: 0; font-size: 1.45rem;">${translate(chakra.nameKey)}</h3>
      </div>
      <div class="detail-block" style="margin-bottom: 1.5rem;">
        <h4 style="color: var(--primary-dark); font-weight: 700; margin-bottom: 0.35rem;">🌿 ${physLabel}</h4>
        <p style="color: var(--text-dark); line-height: 1.75;">${translate(chakra.physicalKey)}</p>
      </div>
      <div class="detail-block">
        <h4 style="color: var(--primary-dark); font-weight: 700; margin-bottom: 0.35rem;">🧠 ${psychLabel}</h4>
        <p style="color: var(--text-dark); line-height: 1.75;">${translate(chakra.psychologicalKey)}</p>
      </div>
    `;
  }

  /* ==========================================================
     BOOKING FORM & LOCAL STORAGE SYNC
     ========================================================== */
  function initBookingForm() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    const bookingForRadios = form.querySelectorAll('input[name="bookingFor"]');
    const familyFields = document.getElementById('familyFields');

    bookingForRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (familyFields) {
          familyFields.style.display = radio.value === 'family' ? 'block' : 'none';
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const clientName = document.getElementById('clientName').value.trim();
      const clientPhone = document.getElementById('clientPhone').value.trim();
      const clientEmail = document.getElementById('clientEmail').value.trim();
      const therapyPlan = document.getElementById('therapyPlan').value;
      const clientConcern = document.getElementById('clientConcern').value.trim();
      const bookingFor = form.querySelector('input[name="bookingFor"]:checked').value;

      const familyName = document.getElementById('familyName') ? document.getElementById('familyName').value.trim() : '';
      const familyAge = document.getElementById('familyAge') ? document.getElementById('familyAge').value.trim() : '';
      const familyRelation = document.getElementById('familyRelation') ? document.getElementById('familyRelation').value.trim() : '';

      if (!clientName || !clientPhone || !clientConcern) {
        alert('Please fill in your name, contact phone/WhatsApp, and concern description.');
        return;
      }

      const newRequest = {
        id: 'REQ' + Math.floor(1000 + Math.random() * 9000),
        clientName: clientName,
        phone: clientPhone,
        email: clientEmail || 'Not provided',
        bookingFor: bookingFor,
        familyName: bookingFor === 'family' ? familyName : '',
        familyAge: bookingFor === 'family' ? familyAge : '',
        familyRelation: bookingFor === 'family' ? familyRelation : '',
        service: therapyPlan,
        concern: clientConcern,
        date: new Date().toISOString().split('T')[0],
        status: 'new',
        chakraAssessment: null,
        report: null
      };

      // Save to localStorage so admin.html picks it up immediately
      try {
        let requests = [];
        const existing = localStorage.getItem('auralife_requests');
        if (existing) {
          requests = JSON.parse(existing);
        }
        requests.unshift(newRequest);
        localStorage.setItem('auralife_requests', JSON.stringify(requests));
      } catch (err) {
        console.error('Failed to save request to localStorage', err);
      }

      // Show success
      const successBox = document.getElementById('bookingSuccess');
      if (successBox) {
        successBox.classList.add('show');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      form.reset();
      if (familyFields) {
        familyFields.style.display = 'none';
      }
    });
  }

  /* ==========================================================
     SAMPLE REPORT FEEDBACK
     ========================================================== */
  function initFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    if (!feedbackForm) return;

    feedbackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const text = document.getElementById('reportFeedback').value.trim();
      if (!text) {
        alert('Please type your feedback before submitting.');
        return;
      }

      alert(translate('feedback_thankyou') || 'Thank you for your feedback! It helps refine your energy care journey.');
      feedbackForm.reset();
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
