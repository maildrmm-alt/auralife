/* =========================================================
   AuraLife Energy Therapy – Admin Dashboard JS
   Requires i18n.js to be loaded first (provides t(),
   currentLanguage, toggleLanguage, initLanguage, applyTranslations)
   ========================================================= */

(() => {
  'use strict';

  /* ==========================================================
     SAMPLE DATA
     ========================================================== */
  const sampleRequests = [
    {
      id: 'REQ001',
      clientName: 'Karthik R.',
      phone: '+91 98765 43210',
      email: 'karthik@email.com',
      bookingFor: 'self',
      service: 'Mental & Emotional Balance',
      concern: 'Severe work anxiety and sleeplessness for 3 months. Feeling overwhelmed with office pressure.',
      date: '2026-11-15',
      status: 'new',
      chakraAssessment: null,
      report: null
    },
    {
      id: 'REQ002',
      clientName: 'Priya M.',
      phone: '+91 87654 32109',
      email: 'priya.m@email.com',
      bookingFor: 'family',
      familyName: 'Lakshmi & Raman (Parents)',
      familyAge: '68 & 65',
      familyRelation: 'Parents',
      service: 'Remote Family Care',
      concern: 'My parents (age 68 & 65) have joint pain and BP issues. They live alone in Madurai while I work in Bangalore.',
      date: '2026-11-12',
      status: 'in-progress',
      chakraAssessment: {
        basic: { status: 'depleted', notes: 'Low energy levels, fatigue' },
        heart: { status: 'congested', notes: 'BP related, emotional stress from loneliness' }
      },
      report: null
    },
    {
      id: 'REQ003',
      clientName: 'Suresh K.',
      phone: '+91 76543 21098',
      email: 'suresh.k@email.com',
      bookingFor: 'self',
      service: 'Life Mileage Maintenance',
      concern: 'Regular energy maintenance - IT professional working 12-hour shifts, general fatigue and occasional headaches.',
      date: '2026-11-01',
      status: 'completed',
      chakraAssessment: {
        solar: { status: 'over-activated', notes: 'Work stress manifesting in digestive issues' },
        basic: { status: 'depleted', notes: 'Low stamina from sedentary lifestyle' },
        ajna: { status: 'congested', notes: 'Screen fatigue, difficulty concentrating' }
      },
      report: {
        date: '2026-11-14',
        entries: [
          { center: 'Overall Aura', before: 'Congested & Dull', after: 'Clean & Bright' },
          { center: 'Solar Plexus', before: 'Over-activated', after: 'Calm & Balanced' },
          { center: 'Basic Chakra', before: 'Depleted', after: 'Energized' },
          { center: 'Ajna Chakra', before: 'Congested', after: 'Clear & Focused' }
        ],
        notes: 'Client showed significant improvement after 5 sessions. Recommended monthly maintenance.'
      }
    },
    {
      id: 'REQ004',
      clientName: 'Meena S.',
      phone: '+91 65432 10987',
      email: 'meena.s@email.com',
      bookingFor: 'self',
      service: 'Physical Wellness',
      concern: 'நாள்பட்ட முதுகு வலி மற்றும் மூட்டு வலி. 2 வருடமாக அவதிப்படுகிறேன்.',
      date: '2026-11-16',
      status: 'new',
      chakraAssessment: null,
      report: null
    },
    {
      id: 'REQ005',
      clientName: 'Ravi N.',
      phone: '+91 54321 09876',
      email: 'ravi.n@email.com',
      bookingFor: 'self',
      service: 'Prosperity & Career Flow',
      concern: 'Career stagnation for 2 years despite hard work. Business not growing. Need energy clearing for prosperity.',
      date: '2026-11-10',
      status: 'in-progress',
      chakraAssessment: {
        solar: { status: 'congested', notes: 'Willpower and confidence affected' },
        basic: { status: 'depleted', notes: 'Low drive and motivation' }
      },
      report: null
    }
  ];

  const samplePackages = [
    { id: 'PKG001', name: 'Single Session', description: 'Initial consultation and energy assessment', sessions: 1, price: 500, status: 'active' },
    { id: 'PKG002', name: 'Physical Wellness Package', description: 'Complete physical energy healing program', sessions: 5, price: 2000, status: 'active' },
    { id: 'PKG003', name: 'Mental & Emotional Balance', description: 'Deep aura cleansing for mental wellness', sessions: 5, price: 2000, status: 'active' },
    { id: 'PKG004', name: 'Prosperity & Career Flow', description: 'Energy clearing for career and financial growth', sessions: 7, price: 3000, status: 'active' },
    { id: 'PKG005', name: 'Remote Family Care', description: 'Monthly remote healing for family members', sessions: 10, price: 4000, status: 'active' },
    { id: 'PKG006', name: 'Life Mileage Maintenance', description: 'Monthly energy tune-up for peak performance', sessions: 2, price: 800, status: 'active' },
    { id: 'PKG007', name: 'Free Trial Session', description: 'Complimentary introductory session', sessions: 1, price: 0, status: 'active' }
  ];

  /* ==========================================================
     CHAKRA DEFINITIONS (for assessment)
     ========================================================== */
  const chakraDefinitions = [
    { key: 'crown',   name: 'Crown Chakra (Sahasrara)',       color: '#a855f7' },
    { key: 'ajna',    name: 'Ajna Chakra (Third Eye)',        color: '#6366f1' },
    { key: 'throat',  name: 'Throat Chakra (Vishuddhi)',      color: '#3b82f6' },
    { key: 'heart',   name: 'Heart Chakra (Anahata)',         color: '#22c55e' },
    { key: 'solar',   name: 'Solar Plexus Chakra (Manipura)', color: '#eab308' },
    { key: 'sacral',  name: 'Sacral Chakra (Svadhisthana)',   color: '#f97316' },
    { key: 'basic',   name: 'Basic Chakra (Muladhara)',       color: '#ef4444' }
  ];

  const statusOptions = ['normal', 'congested', 'depleted', 'over-activated'];

  /* ==========================================================
     STATE
     ========================================================== */
  let requests = [];
  let packages = [];
  let currentView = 'dashboard';
  let currentFilter = 'all';
  let editingPackageId = null;

  /* ==========================================================
     LOCAL STORAGE HELPERS
     ========================================================== */
  const LS_REQUESTS = 'auralife_admin_requests';
  const LS_PACKAGES = 'auralife_admin_packages';

  function loadData() {
    try {
      const storedReq = localStorage.getItem(LS_REQUESTS);
      requests = storedReq ? JSON.parse(storedReq) : JSON.parse(JSON.stringify(sampleRequests));
    } catch {
      requests = JSON.parse(JSON.stringify(sampleRequests));
    }
    try {
      const storedPkg = localStorage.getItem(LS_PACKAGES);
      packages = storedPkg ? JSON.parse(storedPkg) : JSON.parse(JSON.stringify(samplePackages));
    } catch {
      packages = JSON.parse(JSON.stringify(samplePackages));
    }
    saveData();
  }

  function saveData() {
    localStorage.setItem(LS_REQUESTS, JSON.stringify(requests));
    localStorage.setItem(LS_PACKAGES, JSON.stringify(packages));
  }

  /* ==========================================================
     UTILITY HELPERS
     ========================================================== */
  function esc(str) {
    if (str == null) return '';
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
  }

  function formatDate(dateStr) {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  }

  function generateId(prefix) {
    const max = prefix === 'REQ'
      ? requests.reduce((m, r) => Math.max(m, parseInt(r.id.replace('REQ', ''), 10) || 0), 0)
      : packages.reduce((m, p) => Math.max(m, parseInt(p.id.replace('PKG', ''), 10) || 0), 0);
    return `${prefix}${String(max + 1).padStart(3, '0')}`;
  }

  function statusColor(status) {
    switch (status) {
      case 'new': return '#f59e0b';
      case 'in-progress': return '#3b82f6';
      case 'completed': return '#22c55e';
      default: return '#94a3b8';
    }
  }

  function statusLabel(status) {
    switch (status) {
      case 'new': return 'New';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return status;
    }
  }

  /* ==========================================================
     INIT
     ========================================================== */
  function initAdmin() {
    loadData();
    setupSidebar();
    setupMobileSidebar();
    navigateTo('dashboard');

    // Language change listener
    document.addEventListener('languageChanged', () => {
      renderCurrentView();
    });
  }

  /* ==========================================================
     SIDEBAR NAVIGATION
     ========================================================== */
  function setupSidebar() {
    const navItems = document.querySelectorAll('.admin-sidebar .sidebar-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.dataset.view;
        if (view) navigateTo(view);
      });
    });
  }

  function setupMobileSidebar() {
    const hamburger = document.getElementById('adminHamburger');
    const sidebar = document.querySelector('.admin-sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (hamburger && sidebar) {
      hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('active', sidebar.classList.contains('open'));
      });
    }

    if (overlay && sidebar) {
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      });
    }

    // Close sidebar on nav click (mobile)
    const navItems = document.querySelectorAll('.admin-sidebar .sidebar-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth < 768 && sidebar) {
          sidebar.classList.remove('open');
          if (overlay) overlay.classList.remove('active');
        }
      });
    });
  }

  function navigateTo(view) {
    currentView = view;

    // Update active sidebar item
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === view);
    });

    // Hide all views
    const views = ['dashboardView', 'requestsView', 'reportsView', 'packagesView', 'settingsView'];
    views.forEach(v => {
      const el = document.getElementById(v);
      if (el) el.style.display = 'none';
    });

    // Show target view
    const target = document.getElementById(view + 'View');
    if (target) target.style.display = 'block';

    renderCurrentView();
  }

  function renderCurrentView() {
    switch (currentView) {
      case 'dashboard': renderDashboard(); break;
      case 'requests': renderRequests(); break;
      case 'reports': renderReports(); break;
      case 'packages': renderPackages(); break;
      case 'settings': renderSettings(); break;
    }
  }

  /* ==========================================================
     DASHBOARD VIEW
     ========================================================== */
  function renderDashboard() {
    const container = document.getElementById('dashboardView');
    if (!container) return;

    const totalClients = requests.length;
    const newCount = requests.filter(r => r.status === 'new').length;
    const inProgressCount = requests.filter(r => r.status === 'in-progress').length;
    const completedCount = requests.filter(r => r.status === 'completed').length;

    const recentRequests = [...requests]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    container.innerHTML = `
      <h2 class="admin-view-title">Dashboard Overview</h2>

      <div class="stats-grid">
        <div class="stat-card stat-card--total">
          <div class="stat-card__icon">👥</div>
          <div class="stat-card__info">
            <span class="stat-card__number">${totalClients}</span>
            <span class="stat-card__label">Total Clients</span>
          </div>
        </div>
        <div class="stat-card stat-card--new">
          <div class="stat-card__icon">🆕</div>
          <div class="stat-card__info">
            <span class="stat-card__number">${newCount}</span>
            <span class="stat-card__label">New Requests</span>
          </div>
        </div>
        <div class="stat-card stat-card--progress">
          <div class="stat-card__icon">🔄</div>
          <div class="stat-card__info">
            <span class="stat-card__number">${inProgressCount}</span>
            <span class="stat-card__label">In Progress</span>
          </div>
        </div>
        <div class="stat-card stat-card--completed">
          <div class="stat-card__icon">✅</div>
          <div class="stat-card__info">
            <span class="stat-card__number">${completedCount}</span>
            <span class="stat-card__label">Completed</span>
          </div>
        </div>
      </div>

      <div class="admin-panel">
        <h3 class="admin-panel__title">Recent Requests</h3>
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Service</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${recentRequests.map(r => `
                <tr>
                  <td class="td-mono">${esc(r.id)}</td>
                  <td>${esc(r.clientName)}</td>
                  <td>${esc(r.service)}</td>
                  <td>${formatDate(r.date)}</td>
                  <td><span class="status-badge" style="--badge-color: ${statusColor(r.status)}">${statusLabel(r.status)}</span></td>
                  <td>
                    <div class="action-btns">
                      <button class="btn-sm btn-sm--view" onclick="window._admin.viewRequest('${r.id}')" title="View">👁️</button>
                      ${r.status !== 'completed' ? `<button class="btn-sm btn-sm--assess" onclick="window._admin.showAssessmentModal('${r.id}')" title="Assess">🔮</button>` : ''}
                      ${r.status === 'in-progress' && r.chakraAssessment ? `<button class="btn-sm btn-sm--report" onclick="window._admin.showReportBuilder('${r.id}')" title="Report">📋</button>` : ''}
                    </div>
                  </td>
                </tr>
              `).join('')}
              ${recentRequests.length === 0 ? '<tr><td colspan="6" class="td-empty">No requests yet</td></tr>' : ''}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* ==========================================================
     CLIENT REQUESTS VIEW
     ========================================================== */
  function renderRequests() {
    const container = document.getElementById('requestsView');
    if (!container) return;

    const filters = ['all', 'new', 'in-progress', 'completed'];
    const filtered = currentFilter === 'all'
      ? requests
      : requests.filter(r => r.status === currentFilter);

    container.innerHTML = `
      <h2 class="admin-view-title">Client Requests</h2>

      <div class="filter-tabs">
        ${filters.map(f => `
          <button class="filter-tab ${currentFilter === f ? 'active' : ''}" data-filter="${f}">
            ${f === 'all' ? 'All' : statusLabel(f)}
            <span class="filter-tab__count">${f === 'all' ? requests.length : requests.filter(r => r.status === f).length}</span>
          </button>
        `).join('')}
      </div>

      <div class="requests-grid">
        ${filtered.length === 0 ? '<p class="empty-state">No requests found for this filter.</p>' : ''}
        ${filtered.map(r => renderRequestCard(r)).join('')}
      </div>
    `;

    // Filter tab listeners
    container.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        currentFilter = tab.dataset.filter;
        renderRequests();
      });
    });
  }

  function renderRequestCard(r) {
    const familyInfo = r.bookingFor === 'family'
      ? `<div class="request-card__family">
           <span class="family-badge">👨‍👩‍👧 Family</span>
           ${r.familyName ? `<span class="family-detail">${esc(r.familyName)}</span>` : ''}
           ${r.familyAge ? `<span class="family-detail">Age: ${esc(r.familyAge)}</span>` : ''}
           ${r.familyRelation ? `<span class="family-detail">${esc(r.familyRelation)}</span>` : ''}
         </div>`
      : `<span class="self-badge">🧘 Self</span>`;

    const assessmentInfo = r.chakraAssessment
      ? `<div class="request-card__assessment">
           <span class="assess-indicator">🔮 Assessment done</span>
         </div>`
      : '';

    return `
      <div class="request-card" data-id="${r.id}">
        <div class="request-card__header">
          <div class="request-card__id">${esc(r.id)}</div>
          <span class="status-badge" style="--badge-color: ${statusColor(r.status)}">${statusLabel(r.status)}</span>
        </div>

        <div class="request-card__body">
          <h4 class="request-card__name">${esc(r.clientName)}</h4>
          <p class="request-card__phone">📱 ${esc(r.phone)}</p>
          <p class="request-card__service">🏷️ ${esc(r.service)}</p>
          ${familyInfo}
          <p class="request-card__concern">${esc(r.concern)}</p>
          <p class="request-card__date">📅 ${formatDate(r.date)}</p>
          ${assessmentInfo}
        </div>

        <div class="request-card__footer">
          <div class="request-card__status-change">
            <label class="sr-only" for="status-${r.id}">Status</label>
            <select class="status-select" id="status-${r.id}" data-request-id="${r.id}">
              <option value="new" ${r.status === 'new' ? 'selected' : ''}>New</option>
              <option value="in-progress" ${r.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
              <option value="completed" ${r.status === 'completed' ? 'selected' : ''}>Completed</option>
            </select>
          </div>
          <div class="action-btns">
            ${r.status !== 'completed' ? `<button class="btn-action btn-action--assess" onclick="window._admin.showAssessmentModal('${r.id}')">🔮 Assess</button>` : ''}
            ${(r.status === 'in-progress' || r.status === 'completed') && r.chakraAssessment ? `<button class="btn-action btn-action--report" onclick="window._admin.showReportBuilder('${r.id}')">📋 Report</button>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  /* Status change handler (delegated) */
  document.addEventListener('change', (e) => {
    if (e.target.classList.contains('status-select')) {
      const reqId = e.target.dataset.requestId;
      const newStatus = e.target.value;
      const req = requests.find(r => r.id === reqId);
      if (req) {
        req.status = newStatus;
        saveData();
        renderCurrentView();
      }
    }
  });

  /* ==========================================================
     VIEW REQUEST DETAIL (simple alert/modal)
     ========================================================== */
  function viewRequest(requestId) {
    const req = requests.find(r => r.id === requestId);
    if (!req) return;

    const overlay = createModalOverlay();
    const modal = document.createElement('div');
    modal.className = 'admin-modal';

    let assessmentHTML = '';
    if (req.chakraAssessment) {
      const rows = Object.entries(req.chakraAssessment).map(([key, val]) => {
        const def = chakraDefinitions.find(c => c.key === key);
        return `<tr>
          <td><span class="chakra-dot-sm" style="background:${def ? def.color : '#888'}"></span> ${def ? esc(def.name) : esc(key)}</td>
          <td><span class="status-badge" style="--badge-color: ${statusColor(val.status === 'normal' ? 'completed' : 'in-progress')}">${esc(val.status)}</span></td>
          <td>${esc(val.notes)}</td>
        </tr>`;
      }).join('');
      assessmentHTML = `
        <h4 class="modal-section-title">Chakra Assessment</h4>
        <table class="admin-table admin-table--compact">
          <thead><tr><th>Chakra</th><th>Status</th><th>Notes</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    }

    let reportHTML = '';
    if (req.report) {
      const rRows = req.report.entries.map(e => `
        <tr>
          <td>${esc(e.center)}</td>
          <td><span class="badge badge--before">${esc(e.before)}</span></td>
          <td><span class="badge badge--after">${esc(e.after)}</span></td>
        </tr>
      `).join('');
      reportHTML = `
        <h4 class="modal-section-title">Therapy Report (${formatDate(req.report.date)})</h4>
        <table class="admin-table admin-table--compact">
          <thead><tr><th>Energy Center</th><th>Before</th><th>After</th></tr></thead>
          <tbody>${rRows}</tbody>
        </table>
        ${req.report.notes ? `<p class="report-notes"><strong>Therapist Notes:</strong> ${esc(req.report.notes)}</p>` : ''}
      `;
    }

    modal.innerHTML = `
      <div class="admin-modal__header">
        <h3>Request Details — ${esc(req.id)}</h3>
        <button class="modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="admin-modal__body">
        <div class="detail-grid">
          <div class="detail-item"><span class="detail-label">Client:</span> <span>${esc(req.clientName)}</span></div>
          <div class="detail-item"><span class="detail-label">Phone:</span> <span>${esc(req.phone)}</span></div>
          <div class="detail-item"><span class="detail-label">Email:</span> <span>${esc(req.email)}</span></div>
          <div class="detail-item"><span class="detail-label">Service:</span> <span>${esc(req.service)}</span></div>
          <div class="detail-item"><span class="detail-label">Booking For:</span> <span>${req.bookingFor === 'family' ? `Family — ${esc(req.familyName || '')}` : 'Self'}</span></div>
          <div class="detail-item"><span class="detail-label">Date:</span> <span>${formatDate(req.date)}</span></div>
          <div class="detail-item"><span class="detail-label">Status:</span> <span class="status-badge" style="--badge-color: ${statusColor(req.status)}">${statusLabel(req.status)}</span></div>
        </div>
        <div class="detail-concern">
          <span class="detail-label">Concern:</span>
          <p>${esc(req.concern)}</p>
        </div>
        ${assessmentHTML}
        ${reportHTML}
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('visible'));

    modal.querySelector('.modal-close').addEventListener('click', () => closeModal(overlay));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(overlay); });
  }

  /* ==========================================================
     CHAKRA ASSESSMENT MODAL
     ========================================================== */
  function showAssessmentModal(requestId) {
    const req = requests.find(r => r.id === requestId);
    if (!req) return;

    const overlay = createModalOverlay();
    const modal = document.createElement('div');
    modal.className = 'admin-modal admin-modal--wide';

    const existing = req.chakraAssessment || {};

    const auraRow = buildAssessmentRow(
      { key: 'aura', name: 'Overall Aura', color: '#8b5cf6' },
      existing.aura || null
    );

    const chakraRows = chakraDefinitions.map(def => {
      return buildAssessmentRow(def, existing[def.key] || null);
    }).join('');

    modal.innerHTML = `
      <div class="admin-modal__header">
        <h3>Chakra Assessment — ${esc(req.clientName)}</h3>
        <button class="modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="admin-modal__body">
        <div class="assessment-client-info">
          <span>📱 ${esc(req.phone)}</span>
          <span>🏷️ ${esc(req.service)}</span>
          <span>📅 ${formatDate(req.date)}</span>
        </div>

        <div class="assessment-form" id="assessmentForm">
          <div class="assessment-row assessment-row--header">
            <span class="assess-col assess-col--name">Energy Center</span>
            <span class="assess-col assess-col--status">Status</span>
            <span class="assess-col assess-col--notes">Notes</span>
          </div>
          ${auraRow}
          ${chakraRows}
        </div>
      </div>
      <div class="admin-modal__footer">
        <button class="btn-primary" id="saveAssessmentBtn">💾 Save Assessment</button>
        <button class="btn-secondary" id="cancelAssessmentBtn">Cancel</button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('visible'));

    // Events
    modal.querySelector('.modal-close').addEventListener('click', () => closeModal(overlay));
    modal.querySelector('#cancelAssessmentBtn').addEventListener('click', () => closeModal(overlay));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(overlay); });

    modal.querySelector('#saveAssessmentBtn').addEventListener('click', () => {
      const form = modal.querySelector('#assessmentForm');
      const rows = form.querySelectorAll('.assessment-row[data-chakra-key]');
      const assessment = {};

      rows.forEach(row => {
        const key = row.dataset.chakraKey;
        const statusSelect = row.querySelector('.assess-status-select');
        const notesInput = row.querySelector('.assess-notes-input');
        const status = statusSelect ? statusSelect.value : '';
        const notes = notesInput ? notesInput.value.trim() : '';

        if (status && status !== '') {
          assessment[key] = { status, notes };
        }
      });

      if (Object.keys(assessment).length === 0) {
        showToast('Please assess at least one energy center.', 'warning');
        return;
      }

      req.chakraAssessment = assessment;
      if (req.status === 'new') {
        req.status = 'in-progress';
      }
      saveData();
      closeModal(overlay);
      renderCurrentView();
      showToast('Chakra assessment saved successfully!', 'success');
    });
  }

  function buildAssessmentRow(def, existing) {
    const selectedNormal = existing && existing.status === 'normal' ? 'selected' : '';
    const selectedCongested = existing && existing.status === 'congested' ? 'selected' : '';
    const selectedDepleted = existing && existing.status === 'depleted' ? 'selected' : '';
    const selectedOverActivated = existing && existing.status === 'over-activated' ? 'selected' : '';
    const notesVal = existing ? esc(existing.notes) : '';

    return `
      <div class="assessment-row" data-chakra-key="${def.key}">
        <span class="assess-col assess-col--name">
          <span class="chakra-dot-sm" style="background: ${def.color}"></span>
          ${esc(def.name)}
        </span>
        <span class="assess-col assess-col--status">
          <select class="assess-status-select">
            <option value="">— Select —</option>
            <option value="normal" ${selectedNormal}>Normal</option>
            <option value="congested" ${selectedCongested}>Congested</option>
            <option value="depleted" ${selectedDepleted}>Depleted</option>
            <option value="over-activated" ${selectedOverActivated}>Over-activated</option>
          </select>
        </span>
        <span class="assess-col assess-col--notes">
          <textarea class="assess-notes-input" rows="1" placeholder="Notes...">${notesVal}</textarea>
        </span>
      </div>
    `;
  }

  /* ==========================================================
     REPORT BUILDER
     ========================================================== */
  function showReportBuilder(requestId) {
    const req = requests.find(r => r.id === requestId);
    if (!req) return;

    const overlay = createModalOverlay();
    const modal = document.createElement('div');
    modal.className = 'admin-modal admin-modal--wide';

    // Build entries from assessment
    const entries = [];

    // Always add Overall Aura
    const auraAssessment = req.chakraAssessment && req.chakraAssessment.aura;
    entries.push({
      center: 'Overall Aura',
      beforeStatus: auraAssessment ? auraAssessment.status : '',
      beforeLabel: auraAssessment ? capitalize(auraAssessment.status) : 'Not assessed'
    });

    // Add assessed chakras
    if (req.chakraAssessment) {
      for (const def of chakraDefinitions) {
        const a = req.chakraAssessment[def.key];
        if (a) {
          entries.push({
            center: def.name,
            beforeStatus: a.status,
            beforeLabel: capitalize(a.status)
          });
        }
      }
    }

    // If existing report, pre-fill after values
    const existingReport = req.report;

    const entryRows = entries.map((entry, i) => {
      const existingEntry = existingReport
        ? existingReport.entries.find(e => e.center === entry.center)
        : null;
      const afterVal = existingEntry ? existingEntry.after : '';

      return `
        <tr data-entry-index="${i}">
          <td class="report-center-name">${esc(entry.center)}</td>
          <td><span class="badge badge--before">${esc(entry.beforeLabel)}</span></td>
          <td>
            <input type="hidden" class="report-center-key" value="${esc(entry.center)}">
            <input type="hidden" class="report-before-val" value="${esc(entry.beforeLabel)}">
            <select class="report-after-select">
              <option value="">— Select —</option>
              <option value="Clean & Bright" ${afterVal === 'Clean & Bright' ? 'selected' : ''}>Clean & Bright</option>
              <option value="Calm & Balanced" ${afterVal === 'Calm & Balanced' ? 'selected' : ''}>Calm & Balanced</option>
              <option value="Energized" ${afterVal === 'Energized' ? 'selected' : ''}>Energized</option>
              <option value="Clear & Focused" ${afterVal === 'Clear & Focused' ? 'selected' : ''}>Clear & Focused</option>
              <option value="Harmonized & Open" ${afterVal === 'Harmonized & Open' ? 'selected' : ''}>Harmonized & Open</option>
              <option value="Strong & Vibrant" ${afterVal === 'Strong & Vibrant' ? 'selected' : ''}>Strong & Vibrant</option>
              <option value="Open & Balanced" ${afterVal === 'Open & Balanced' ? 'selected' : ''}>Open & Balanced</option>
              <option value="Partially Improved" ${afterVal === 'Partially Improved' ? 'selected' : ''}>Partially Improved</option>
              <option value="No Change" ${afterVal === 'No Change' ? 'selected' : ''}>No Change</option>
            </select>
          </td>
        </tr>
      `;
    }).join('');

    const existingNotes = existingReport ? existingReport.notes : '';

    modal.innerHTML = `
      <div class="admin-modal__header">
        <h3>Generate Therapy Report — ${esc(req.clientName)}</h3>
        <button class="modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="admin-modal__body">
        <div class="assessment-client-info">
          <span>🏷️ ${esc(req.service)}</span>
          <span>📅 ${formatDate(req.date)}</span>
        </div>

        <div class="admin-table-wrapper">
          <table class="admin-table" id="reportTable">
            <thead>
              <tr>
                <th>Energy Center</th>
                <th>Before Therapy</th>
                <th>After Therapy</th>
              </tr>
            </thead>
            <tbody>
              ${entryRows}
            </tbody>
          </table>
        </div>

        <div class="form-group" style="margin-top: 1.5rem;">
          <label class="form-label" for="therapistNotes">Therapist Notes</label>
          <textarea id="therapistNotes" class="form-textarea" rows="4" placeholder="Add session notes, recommendations, follow-up instructions...">${esc(existingNotes)}</textarea>
        </div>
      </div>
      <div class="admin-modal__footer">
        <button class="btn-primary" id="generateReportBtn">📋 Generate & Save Report</button>
        <button class="btn-secondary" id="cancelReportBtn">Cancel</button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('visible'));

    // Events
    modal.querySelector('.modal-close').addEventListener('click', () => closeModal(overlay));
    modal.querySelector('#cancelReportBtn').addEventListener('click', () => closeModal(overlay));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(overlay); });

    modal.querySelector('#generateReportBtn').addEventListener('click', () => {
      const table = modal.querySelector('#reportTable');
      const rows = table.querySelectorAll('tbody tr');
      const reportEntries = [];
      let hasAfter = false;

      rows.forEach(row => {
        const center = row.querySelector('.report-center-key').value;
        const before = row.querySelector('.report-before-val').value;
        const afterSelect = row.querySelector('.report-after-select');
        const after = afterSelect.value;
        if (after) hasAfter = true;
        reportEntries.push({ center, before, after: after || 'Not assessed' });
      });

      if (!hasAfter) {
        showToast('Please fill in at least one "After Therapy" result.', 'warning');
        return;
      }

      const notes = modal.querySelector('#therapistNotes').value.trim();

      req.report = {
        date: new Date().toISOString().split('T')[0],
        entries: reportEntries,
        notes
      };
      req.status = 'completed';
      saveData();
      closeModal(overlay);
      renderCurrentView();
      showToast('Therapy report generated successfully!', 'success');
    });
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
  }

  /* ==========================================================
     REPORTS VIEW
     ========================================================== */
  function renderReports() {
    const container = document.getElementById('reportsView');
    if (!container) return;

    const withReports = requests.filter(r => r.report);

    if (withReports.length === 0) {
      container.innerHTML = `
        <h2 class="admin-view-title">Therapy Reports</h2>
        <p class="empty-state">No completed reports yet. Generate reports from the Requests view.</p>
      `;
      return;
    }

    container.innerHTML = `
      <h2 class="admin-view-title">Therapy Reports</h2>
      <div class="reports-list">
        ${withReports.map(r => renderReportCard(r)).join('')}
      </div>
    `;

    // Toggle expand
    container.querySelectorAll('.report-card__toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.report-card');
        card.classList.toggle('expanded');
        btn.textContent = card.classList.contains('expanded') ? '▲ Hide Details' : '▼ View Full Report';
      });
    });
  }

  function renderReportCard(r) {
    const report = r.report;
    const rows = report.entries.map(e => `
      <tr>
        <td>${esc(e.center)}</td>
        <td><span class="badge badge--before">${esc(e.before)}</span></td>
        <td><span class="badge badge--after">${esc(e.after)}</span></td>
      </tr>
    `).join('');

    return `
      <div class="report-card">
        <div class="report-card__header">
          <div class="report-card__info">
            <h4>${esc(r.clientName)}</h4>
            <span class="report-card__service">${esc(r.service)}</span>
            <span class="report-card__date">Report: ${formatDate(report.date)} | Requested: ${formatDate(r.date)}</span>
          </div>
          <span class="status-badge" style="--badge-color: #22c55e">Completed</span>
        </div>

        <div class="report-card__details">
          <div class="admin-table-wrapper">
            <table class="admin-table admin-table--compact">
              <thead>
                <tr>
                  <th>Energy Center</th>
                  <th>Before Therapy</th>
                  <th>After Therapy</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
          ${report.notes ? `
            <div class="report-notes">
              <strong>Therapist Notes:</strong>
              <p>${esc(report.notes)}</p>
            </div>
          ` : ''}
        </div>

        <button class="report-card__toggle">▼ View Full Report</button>
      </div>
    `;
  }

  /* ==========================================================
     PACKAGES VIEW
     ========================================================== */
  function renderPackages() {
    const container = document.getElementById('packagesView');
    if (!container) return;

    container.innerHTML = `
      <div class="admin-view-header">
        <h2 class="admin-view-title">Package Manager</h2>
        <button class="btn-primary" id="addPackageBtn">+ Add New Package</button>
      </div>

      <div id="packageFormContainer"></div>

      <div class="admin-table-wrapper">
        <table class="admin-table" id="packagesTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Sessions</th>
              <th>Price (₹)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${packages.map(p => renderPackageRow(p)).join('')}
            ${packages.length === 0 ? '<tr><td colspan="7" class="td-empty">No packages defined</td></tr>' : ''}
          </tbody>
        </table>
      </div>
    `;

    // Add package button
    container.querySelector('#addPackageBtn').addEventListener('click', () => {
      editingPackageId = null;
      showPackageForm(container);
    });

    // Edit buttons
    container.querySelectorAll('.pkg-edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        editingPackageId = btn.dataset.id;
        showPackageForm(container);
      });
    });

    // Toggle status buttons
    container.querySelectorAll('.pkg-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pkg = packages.find(p => p.id === btn.dataset.id);
        if (pkg) {
          pkg.status = pkg.status === 'active' ? 'inactive' : 'active';
          saveData();
          renderPackages();
        }
      });
    });

    // Delete buttons
    container.querySelectorAll('.pkg-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pkg = packages.find(p => p.id === btn.dataset.id);
        if (pkg && confirm(`Are you sure you want to delete "${pkg.name}"?`)) {
          packages = packages.filter(p => p.id !== btn.dataset.id);
          saveData();
          renderPackages();
          showToast('Package deleted.', 'info');
        }
      });
    });
  }

  function renderPackageRow(p) {
    const statusBadgeColor = p.status === 'active' ? '#22c55e' : '#94a3b8';
    return `
      <tr data-pkg-id="${p.id}">
        <td class="td-mono">${esc(p.id)}</td>
        <td>${esc(p.name)}</td>
        <td class="td-desc">${esc(p.description)}</td>
        <td class="td-center">${p.sessions}</td>
        <td class="td-center">₹${p.price.toLocaleString('en-IN')}</td>
        <td><span class="status-badge" style="--badge-color: ${statusBadgeColor}">${capitalize(p.status)}</span></td>
        <td>
          <div class="action-btns">
            <button class="btn-sm btn-sm--edit pkg-edit-btn" data-id="${p.id}" title="Edit">✏️</button>
            <button class="btn-sm btn-sm--toggle pkg-toggle-btn" data-id="${p.id}" title="Toggle Status">${p.status === 'active' ? '⏸️' : '▶️'}</button>
            <button class="btn-sm btn-sm--delete pkg-delete-btn" data-id="${p.id}" title="Delete">🗑️</button>
          </div>
        </td>
      </tr>
    `;
  }

  function showPackageForm(container) {
    const formContainer = container.querySelector('#packageFormContainer');
    if (!formContainer) return;

    const existing = editingPackageId ? packages.find(p => p.id === editingPackageId) : null;

    formContainer.innerHTML = `
      <div class="admin-panel package-form-panel">
        <h3 class="admin-panel__title">${existing ? 'Edit Package' : 'Add New Package'}</h3>
        <form id="packageForm" class="package-form">
          <div class="pkg-form-grid">
            <div class="form-group">
              <label class="form-label" for="pkgName">Package Name</label>
              <input type="text" id="pkgName" class="form-input" required value="${existing ? esc(existing.name) : ''}" placeholder="e.g. Wellness Package">
            </div>
            <div class="form-group">
              <label class="form-label" for="pkgDesc">Description</label>
              <input type="text" id="pkgDesc" class="form-input" value="${existing ? esc(existing.description) : ''}" placeholder="Brief description">
            </div>
            <div class="form-group">
              <label class="form-label" for="pkgSessions">Sessions</label>
              <input type="number" id="pkgSessions" class="form-input" required min="1" value="${existing ? existing.sessions : ''}" placeholder="Number of sessions">
            </div>
            <div class="form-group">
              <label class="form-label" for="pkgPrice">Price (₹)</label>
              <input type="number" id="pkgPrice" class="form-input" required min="0" value="${existing ? existing.price : ''}" placeholder="Price in INR">
            </div>
            <div class="form-group">
              <label class="form-label" for="pkgStatus">Status</label>
              <select id="pkgStatus" class="form-select">
                <option value="active" ${(!existing || existing.status === 'active') ? 'selected' : ''}>Active</option>
                <option value="inactive" ${existing && existing.status === 'inactive' ? 'selected' : ''}>Inactive</option>
              </select>
            </div>
          </div>
          <div class="pkg-form-actions">
            <button type="submit" class="btn-primary">💾 ${existing ? 'Update' : 'Save'} Package</button>
            <button type="button" class="btn-secondary" id="cancelPackageBtn">Cancel</button>
          </div>
        </form>
      </div>
    `;

    formContainer.querySelector('#cancelPackageBtn').addEventListener('click', () => {
      formContainer.innerHTML = '';
      editingPackageId = null;
    });

    formContainer.querySelector('#packageForm').addEventListener('submit', (e) => {
      e.preventDefault();

      const name = formContainer.querySelector('#pkgName').value.trim();
      const description = formContainer.querySelector('#pkgDesc').value.trim();
      const sessions = parseInt(formContainer.querySelector('#pkgSessions').value, 10);
      const price = parseInt(formContainer.querySelector('#pkgPrice').value, 10);
      const status = formContainer.querySelector('#pkgStatus').value;

      if (!name || isNaN(sessions) || isNaN(price)) {
        showToast('Please fill in all required fields.', 'warning');
        return;
      }

      if (existing) {
        existing.name = name;
        existing.description = description;
        existing.sessions = sessions;
        existing.price = price;
        existing.status = status;
        showToast('Package updated successfully!', 'success');
      } else {
        const newPkg = {
          id: generateId('PKG'),
          name,
          description,
          sessions,
          price,
          status
        };
        packages.push(newPkg);
        showToast('New package added successfully!', 'success');
      }

      editingPackageId = null;
      saveData();
      renderPackages();
    });
  }

  /* ==========================================================
     SETTINGS VIEW
     ========================================================== */
  function renderSettings() {
    const container = document.getElementById('settingsView');
    if (!container) return;

    container.innerHTML = `
      <h2 class="admin-view-title">Settings</h2>

      <div class="admin-panel">
        <h3 class="admin-panel__title">Data Management</h3>
        <div class="settings-actions">
          <div class="settings-action-item">
            <div>
              <h4>Reset Sample Data</h4>
              <p>Restore all requests and packages to the original sample data. This cannot be undone.</p>
            </div>
            <button class="btn-danger" id="resetDataBtn">🔄 Reset All Data</button>
          </div>
          <div class="settings-action-item">
            <div>
              <h4>Export Data</h4>
              <p>Download all current requests and packages as a JSON file.</p>
            </div>
            <button class="btn-primary" id="exportDataBtn">📥 Export JSON</button>
          </div>
          <div class="settings-action-item">
            <div>
              <h4>Clear All Data</h4>
              <p>Remove all requests and packages from storage. This cannot be undone.</p>
            </div>
            <button class="btn-danger" id="clearDataBtn">🗑️ Clear All</button>
          </div>
        </div>
      </div>

      <div class="admin-panel">
        <h3 class="admin-panel__title">Language</h3>
        <div class="settings-actions">
          <div class="settings-action-item">
            <div>
              <h4>Toggle Language</h4>
              <p>Switch between English and Tamil.</p>
            </div>
            <button class="btn-secondary" id="settingsLangToggle">🌐 Toggle Language</button>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#resetDataBtn').addEventListener('click', () => {
      if (confirm('Reset all data to sample data? This action cannot be undone.')) {
        requests = JSON.parse(JSON.stringify(sampleRequests));
        packages = JSON.parse(JSON.stringify(samplePackages));
        saveData();
        navigateTo('dashboard');
        showToast('Data reset to sample data.', 'success');
      }
    });

    container.querySelector('#exportDataBtn').addEventListener('click', () => {
      const data = { requests, packages, exportedAt: new Date().toISOString() };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `auralife-admin-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Data exported successfully!', 'success');
    });

    container.querySelector('#clearDataBtn').addEventListener('click', () => {
      if (confirm('Delete ALL data? This action cannot be undone.')) {
        requests = [];
        packages = [];
        saveData();
        navigateTo('dashboard');
        showToast('All data cleared.', 'info');
      }
    });

    container.querySelector('#settingsLangToggle').addEventListener('click', () => {
      if (typeof toggleLanguage === 'function') {
        toggleLanguage();
      }
    });
  }

  /* ==========================================================
     MODAL HELPERS
     ========================================================== */
  function createModalOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'admin-modal-overlay';
    return overlay;
  }

  function closeModal(overlay) {
    overlay.classList.remove('visible');
    overlay.classList.add('closing');
    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 300);
  }

  /* ==========================================================
     TOAST NOTIFICATIONS
     ========================================================== */
  function showToast(message, type = 'info') {
    let toastContainer = document.getElementById('adminToastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'adminToastContainer';
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;

    const icon = type === 'success' ? '✅' : type === 'warning' ? '⚠️' : type === 'error' ? '❌' : 'ℹ️';
    toast.innerHTML = `<span class="toast__icon">${icon}</span><span class="toast__msg">${esc(message)}</span>`;

    toastContainer.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('visible'));

    setTimeout(() => {
      toast.classList.remove('visible');
      toast.classList.add('closing');
      setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 400);
    }, 3500);
  }

  /* ==========================================================
     INJECT ADMIN STYLES (self-contained)
     ========================================================== */
  function injectAdminStyles() {
    if (document.getElementById('adminDashboardStyles')) return;
    const style = document.createElement('style');
    style.id = 'adminDashboardStyles';
    style.textContent = `
      /* ========================================
         ADMIN DASHBOARD – CSS
         ======================================== */

      :root {
        --admin-bg: #0f172a;
        --admin-surface: #1e293b;
        --admin-surface-hover: #263348;
        --admin-border: #334155;
        --admin-text: #e2e8f0;
        --admin-text-secondary: #94a3b8;
        --admin-text-muted: #64748b;
        --admin-primary: #6366f1;
        --admin-primary-hover: #818cf8;
        --admin-danger: #ef4444;
        --admin-danger-hover: #f87171;
        --admin-success: #22c55e;
        --admin-warning: #f59e0b;
        --admin-radius: 10px;
        --admin-radius-sm: 6px;
        --admin-shadow: 0 4px 24px rgba(0,0,0,0.25);
        --admin-transition: 0.2s ease;
        --sidebar-width: 260px;
      }

      *, *::before, *::after { box-sizing: border-box; }

      .admin-layout {
        display: flex;
        min-height: 100vh;
        background: var(--admin-bg);
        color: var(--admin-text);
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      /* ---- SR-ONLY ---- */
      .sr-only {
        position: absolute; width: 1px; height: 1px;
        padding: 0; margin: -1px; overflow: hidden;
        clip: rect(0,0,0,0); border: 0;
      }

      /* ========= SIDEBAR ========= */
      .admin-sidebar {
        width: var(--sidebar-width);
        background: var(--admin-surface);
        border-right: 1px solid var(--admin-border);
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0; left: 0; bottom: 0;
        z-index: 100;
        transition: transform 0.3s ease;
      }

      .sidebar-header {
        padding: 1.5rem 1.25rem;
        border-bottom: 1px solid var(--admin-border);
      }

      .sidebar-logo {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--admin-text);
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .sidebar-logo span {
        background: linear-gradient(135deg, var(--admin-primary), #a855f7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .sidebar-nav {
        flex: 1;
        padding: 1rem 0;
        overflow-y: auto;
      }

      .sidebar-nav-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.85rem 1.25rem;
        color: var(--admin-text-secondary);
        text-decoration: none;
        cursor: pointer;
        transition: all var(--admin-transition);
        border-left: 3px solid transparent;
        font-size: 0.925rem;
      }

      .sidebar-nav-item:hover {
        background: var(--admin-surface-hover);
        color: var(--admin-text);
      }

      .sidebar-nav-item.active {
        background: rgba(99, 102, 241, 0.1);
        color: var(--admin-primary-hover);
        border-left-color: var(--admin-primary);
        font-weight: 600;
      }

      .sidebar-nav-item .nav-icon {
        font-size: 1.15rem;
        width: 1.5rem;
        text-align: center;
      }

      .sidebar-footer {
        padding: 1rem 1.25rem;
        border-top: 1px solid var(--admin-border);
        font-size: 0.8rem;
        color: var(--admin-text-muted);
      }

      /* ========= SIDEBAR OVERLAY ========= */
      .sidebar-overlay {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.5);
        z-index: 99;
      }
      .sidebar-overlay.active { display: block; }

      /* ========= MAIN CONTENT ========= */
      .admin-main {
        margin-left: var(--sidebar-width);
        flex: 1;
        min-width: 0;
      }

      .admin-topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 2rem;
        background: var(--admin-surface);
        border-bottom: 1px solid var(--admin-border);
        position: sticky;
        top: 0;
        z-index: 50;
      }

      .admin-hamburger {
        display: none;
        background: none;
        border: none;
        color: var(--admin-text);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.25rem;
      }

      .topbar-actions {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .topbar-user {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--admin-text-secondary);
        font-size: 0.875rem;
      }

      .topbar-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--admin-primary), #a855f7);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        color: white;
        font-weight: 600;
      }

      .admin-content {
        padding: 2rem;
      }

      /* ========= VIEW TITLES ========= */
      .admin-view-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: var(--admin-text);
      }

      .admin-view-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      .admin-view-header .admin-view-title { margin-bottom: 0; }

      /* ========= STAT CARDS ========= */
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.25rem;
        margin-bottom: 2rem;
      }

      .stat-card {
        background: var(--admin-surface);
        border: 1px solid var(--admin-border);
        border-radius: var(--admin-radius);
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        transition: transform var(--admin-transition), box-shadow var(--admin-transition);
      }

      .stat-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--admin-shadow);
      }

      .stat-card__icon { font-size: 2rem; }

      .stat-card__info {
        display: flex;
        flex-direction: column;
      }

      .stat-card__number {
        font-size: 2rem;
        font-weight: 800;
        line-height: 1;
      }

      .stat-card__label {
        font-size: 0.85rem;
        color: var(--admin-text-secondary);
        margin-top: 0.25rem;
      }

      .stat-card--total .stat-card__number { color: var(--admin-primary-hover); }
      .stat-card--new .stat-card__number { color: var(--admin-warning); }
      .stat-card--progress .stat-card__number { color: #3b82f6; }
      .stat-card--completed .stat-card__number { color: var(--admin-success); }

      /* ========= ADMIN PANEL (generic card) ========= */
      .admin-panel {
        background: var(--admin-surface);
        border: 1px solid var(--admin-border);
        border-radius: var(--admin-radius);
        padding: 1.5rem;
        margin-bottom: 1.5rem;
      }

      .admin-panel__title {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: var(--admin-text);
      }

      /* ========= ADMIN TABLE ========= */
      .admin-table-wrapper {
        overflow-x: auto;
        border-radius: var(--admin-radius-sm);
      }

      .admin-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.875rem;
      }

      .admin-table th,
      .admin-table td {
        padding: 0.75rem 1rem;
        text-align: left;
        border-bottom: 1px solid var(--admin-border);
      }

      .admin-table th {
        background: rgba(99, 102, 241, 0.08);
        font-weight: 600;
        color: var(--admin-text-secondary);
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        white-space: nowrap;
      }

      .admin-table tbody tr:hover { background: var(--admin-surface-hover); }

      .admin-table--compact th,
      .admin-table--compact td { padding: 0.5rem 0.75rem; }

      .td-mono { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--admin-text-muted); }
      .td-center { text-align: center; }
      .td-desc { max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .td-empty { text-align: center; color: var(--admin-text-muted); padding: 2rem !important; }

      /* ========= STATUS BADGE ========= */
      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.25rem 0.65rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 600;
        background: color-mix(in srgb, var(--badge-color, #888) 15%, transparent);
        color: var(--badge-color, #888);
        white-space: nowrap;
      }

      .status-badge::before {
        content: '';
        width: 6px; height: 6px;
        border-radius: 50%;
        background: var(--badge-color, #888);
      }

      /* ========= BADGES (Before/After) ========= */
      .badge {
        display: inline-block;
        padding: 0.2rem 0.5rem;
        border-radius: var(--admin-radius-sm);
        font-size: 0.8rem;
        font-weight: 500;
      }

      .badge--before {
        background: rgba(239, 68, 68, 0.15);
        color: #fca5a5;
      }

      .badge--after {
        background: rgba(34, 197, 94, 0.15);
        color: #86efac;
      }

      /* ========= BUTTONS ========= */
      .btn-primary {
        background: var(--admin-primary);
        color: white;
        border: none;
        padding: 0.6rem 1.25rem;
        border-radius: var(--admin-radius-sm);
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: background var(--admin-transition);
      }
      .btn-primary:hover { background: var(--admin-primary-hover); }

      .btn-secondary {
        background: var(--admin-surface-hover);
        color: var(--admin-text);
        border: 1px solid var(--admin-border);
        padding: 0.6rem 1.25rem;
        border-radius: var(--admin-radius-sm);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: background var(--admin-transition);
      }
      .btn-secondary:hover { background: var(--admin-border); }

      .btn-danger {
        background: var(--admin-danger);
        color: white;
        border: none;
        padding: 0.6rem 1.25rem;
        border-radius: var(--admin-radius-sm);
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: background var(--admin-transition);
      }
      .btn-danger:hover { background: var(--admin-danger-hover); }

      .btn-sm {
        background: none;
        border: 1px solid var(--admin-border);
        color: var(--admin-text);
        width: 32px; height: 32px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--admin-radius-sm);
        cursor: pointer;
        font-size: 0.85rem;
        transition: all var(--admin-transition);
      }
      .btn-sm:hover { background: var(--admin-surface-hover); border-color: var(--admin-primary); }

      .btn-action {
        background: rgba(99, 102, 241, 0.1);
        color: var(--admin-primary-hover);
        border: 1px solid rgba(99, 102, 241, 0.2);
        padding: 0.35rem 0.75rem;
        border-radius: var(--admin-radius-sm);
        font-size: 0.8rem;
        font-weight: 500;
        cursor: pointer;
        transition: all var(--admin-transition);
      }
      .btn-action:hover {
        background: rgba(99, 102, 241, 0.2);
        border-color: var(--admin-primary);
      }

      .btn-action--report {
        background: rgba(34, 197, 94, 0.1);
        color: #86efac;
        border-color: rgba(34, 197, 94, 0.2);
      }
      .btn-action--report:hover {
        background: rgba(34, 197, 94, 0.2);
        border-color: var(--admin-success);
      }

      .action-btns {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }

      /* ========= FILTER TABS ========= */
      .filter-tabs {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
      }

      .filter-tab {
        background: var(--admin-surface);
        color: var(--admin-text-secondary);
        border: 1px solid var(--admin-border);
        padding: 0.5rem 1rem;
        border-radius: 999px;
        font-size: 0.85rem;
        font-weight: 500;
        cursor: pointer;
        transition: all var(--admin-transition);
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }

      .filter-tab:hover { border-color: var(--admin-primary); color: var(--admin-text); }

      .filter-tab.active {
        background: var(--admin-primary);
        color: white;
        border-color: var(--admin-primary);
      }

      .filter-tab__count {
        background: rgba(255,255,255,0.15);
        padding: 0.1rem 0.4rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 700;
      }

      .filter-tab.active .filter-tab__count {
        background: rgba(255,255,255,0.25);
      }

      /* ========= REQUEST CARDS GRID ========= */
      .requests-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        gap: 1.25rem;
      }

      .request-card {
        background: var(--admin-surface);
        border: 1px solid var(--admin-border);
        border-radius: var(--admin-radius);
        overflow: hidden;
        transition: transform var(--admin-transition), box-shadow var(--admin-transition);
      }
      .request-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--admin-shadow);
      }

      .request-card__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 1rem;
        background: rgba(99, 102, 241, 0.05);
        border-bottom: 1px solid var(--admin-border);
      }

      .request-card__id {
        font-family: monospace;
        font-size: 0.8rem;
        color: var(--admin-text-muted);
      }

      .request-card__body {
        padding: 1rem;
      }

      .request-card__name {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
      }

      .request-card__phone,
      .request-card__service,
      .request-card__date {
        font-size: 0.85rem;
        color: var(--admin-text-secondary);
        margin: 0.25rem 0;
      }

      .request-card__concern {
        margin: 0.75rem 0;
        padding: 0.75rem;
        background: rgba(0,0,0,0.2);
        border-radius: var(--admin-radius-sm);
        font-size: 0.85rem;
        color: var(--admin-text-secondary);
        line-height: 1.5;
        max-height: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .request-card__family {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin: 0.5rem 0;
      }

      .family-badge {
        background: rgba(168, 85, 247, 0.15);
        color: #c084fc;
        padding: 0.2rem 0.6rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 600;
      }

      .family-detail {
        font-size: 0.8rem;
        color: var(--admin-text-muted);
        padding: 0.2rem 0.5rem;
        background: rgba(255,255,255,0.05);
        border-radius: var(--admin-radius-sm);
      }

      .self-badge {
        display: inline-block;
        background: rgba(59, 130, 246, 0.15);
        color: #93c5fd;
        padding: 0.2rem 0.6rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 600;
        margin: 0.5rem 0;
      }

      .assess-indicator {
        display: inline-block;
        font-size: 0.8rem;
        color: var(--admin-primary-hover);
        margin-top: 0.25rem;
      }

      .request-card__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        border-top: 1px solid var(--admin-border);
        flex-wrap: wrap;
      }

      .status-select {
        background: var(--admin-bg);
        color: var(--admin-text);
        border: 1px solid var(--admin-border);
        border-radius: var(--admin-radius-sm);
        padding: 0.35rem 0.5rem;
        font-size: 0.8rem;
        cursor: pointer;
      }
      .status-select:focus { outline: 2px solid var(--admin-primary); outline-offset: 1px; }

      .empty-state {
        text-align: center;
        color: var(--admin-text-muted);
        padding: 3rem 1rem;
        font-size: 0.95rem;
        grid-column: 1 / -1;
      }

      /* ========= REPORT CARDS ========= */
      .reports-list {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .report-card {
        background: var(--admin-surface);
        border: 1px solid var(--admin-border);
        border-radius: var(--admin-radius);
        overflow: hidden;
      }

      .report-card__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 1.25rem;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .report-card__info h4 {
        margin: 0 0 0.25rem 0;
        font-size: 1.05rem;
      }

      .report-card__service {
        display: block;
        font-size: 0.85rem;
        color: var(--admin-text-secondary);
      }

      .report-card__date {
        display: block;
        font-size: 0.8rem;
        color: var(--admin-text-muted);
        margin-top: 0.25rem;
      }

      .report-card__details {
        padding: 0 1.25rem 1.25rem;
        display: none;
      }

      .report-card.expanded .report-card__details { display: block; }

      .report-card__toggle {
        display: block;
        width: 100%;
        background: rgba(99, 102, 241, 0.05);
        border: none;
        border-top: 1px solid var(--admin-border);
        padding: 0.75rem;
        color: var(--admin-primary-hover);
        font-size: 0.85rem;
        font-weight: 500;
        cursor: pointer;
        transition: background var(--admin-transition);
      }
      .report-card__toggle:hover { background: rgba(99, 102, 241, 0.1); }

      .report-notes {
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(0,0,0,0.2);
        border-radius: var(--admin-radius-sm);
        font-size: 0.875rem;
        line-height: 1.6;
      }
      .report-notes strong { color: var(--admin-text); }
      .report-notes p { margin: 0.5rem 0 0; color: var(--admin-text-secondary); }

      /* ========= PACKAGE FORM ========= */
      .package-form-panel { margin-bottom: 1.5rem; }

      .pkg-form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .pkg-form-actions {
        display: flex;
        gap: 0.75rem;
      }

      /* ========= FORM ELEMENTS ========= */
      .form-group { margin-bottom: 1rem; }
      .form-label {
        display: block;
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--admin-text-secondary);
        margin-bottom: 0.4rem;
      }
      .form-input,
      .form-select,
      .form-textarea {
        width: 100%;
        background: var(--admin-bg);
        color: var(--admin-text);
        border: 1px solid var(--admin-border);
        border-radius: var(--admin-radius-sm);
        padding: 0.6rem 0.75rem;
        font-size: 0.875rem;
        font-family: inherit;
        transition: border-color var(--admin-transition);
      }
      .form-input:focus,
      .form-select:focus,
      .form-textarea:focus {
        outline: none;
        border-color: var(--admin-primary);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
      }
      .form-textarea { resize: vertical; }

      /* ========= SETTINGS ========= */
      .settings-actions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .settings-action-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        padding: 1rem;
        background: rgba(0,0,0,0.15);
        border-radius: var(--admin-radius-sm);
        flex-wrap: wrap;
      }
      .settings-action-item h4 {
        margin: 0 0 0.25rem 0;
        font-size: 0.95rem;
      }
      .settings-action-item p {
        margin: 0;
        font-size: 0.8rem;
        color: var(--admin-text-muted);
      }

      /* ========= MODAL ========= */
      .admin-modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.6);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 200;
        padding: 1rem;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .admin-modal-overlay.visible { opacity: 1; }
      .admin-modal-overlay.closing { opacity: 0; }

      .admin-modal {
        background: var(--admin-surface);
        border: 1px solid var(--admin-border);
        border-radius: var(--admin-radius);
        width: 100%;
        max-width: 600px;
        max-height: 85vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 20px 60px rgba(0,0,0,0.4);
      }

      .admin-modal--wide { max-width: 800px; }

      .admin-modal__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid var(--admin-border);
      }

      .admin-modal__header h3 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
      }

      .modal-close {
        background: none;
        border: none;
        color: var(--admin-text-muted);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0 0.25rem;
        line-height: 1;
        transition: color var(--admin-transition);
      }
      .modal-close:hover { color: var(--admin-text); }

      .admin-modal__body {
        padding: 1.5rem;
        overflow-y: auto;
        flex: 1;
      }

      .admin-modal__footer {
        display: flex;
        gap: 0.75rem;
        justify-content: flex-end;
        padding: 1rem 1.5rem;
        border-top: 1px solid var(--admin-border);
      }

      .modal-section-title {
        font-size: 1rem;
        font-weight: 600;
        margin: 1.5rem 0 0.75rem;
        color: var(--admin-primary-hover);
      }

      /* ========= DETAIL GRID ========= */
      .detail-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 0.75rem;
      }

      .detail-item {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
      }

      .detail-label {
        font-size: 0.8rem;
        color: var(--admin-text-muted);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.3px;
      }

      .detail-concern {
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(0,0,0,0.15);
        border-radius: var(--admin-radius-sm);
      }
      .detail-concern p {
        margin: 0.5rem 0 0;
        line-height: 1.6;
        color: var(--admin-text-secondary);
      }

      /* ========= ASSESSMENT FORM ========= */
      .assessment-client-info {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        padding: 0.75rem 1rem;
        background: rgba(0,0,0,0.15);
        border-radius: var(--admin-radius-sm);
        margin-bottom: 1.5rem;
        font-size: 0.875rem;
        color: var(--admin-text-secondary);
      }

      .assessment-form {
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      .assessment-row {
        display: grid;
        grid-template-columns: 1.5fr 1fr 1.5fr;
        gap: 0.75rem;
        align-items: center;
        padding: 0.6rem 0.5rem;
        border-bottom: 1px solid var(--admin-border);
      }

      .assessment-row--header {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--admin-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        background: rgba(99, 102, 241, 0.05);
        border-radius: var(--admin-radius-sm) var(--admin-radius-sm) 0 0;
      }

      .assess-col--name {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
      }

      .chakra-dot-sm {
        display: inline-block;
        width: 10px; height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .assess-status-select {
        width: 100%;
        background: var(--admin-bg);
        color: var(--admin-text);
        border: 1px solid var(--admin-border);
        border-radius: var(--admin-radius-sm);
        padding: 0.4rem;
        font-size: 0.8rem;
      }
      .assess-status-select:focus { outline: 2px solid var(--admin-primary); outline-offset: 1px; }

      .assess-notes-input {
        width: 100%;
        background: var(--admin-bg);
        color: var(--admin-text);
        border: 1px solid var(--admin-border);
        border-radius: var(--admin-radius-sm);
        padding: 0.4rem;
        font-size: 0.8rem;
        font-family: inherit;
        resize: none;
      }
      .assess-notes-input:focus { outline: 2px solid var(--admin-primary); outline-offset: 1px; }

      /* ========= REPORT BUILDER ========= */
      .report-after-select {
        width: 100%;
        background: var(--admin-bg);
        color: var(--admin-text);
        border: 1px solid var(--admin-border);
        border-radius: var(--admin-radius-sm);
        padding: 0.4rem;
        font-size: 0.8rem;
      }
      .report-after-select:focus { outline: 2px solid var(--admin-primary); outline-offset: 1px; }

      .report-center-name { font-weight: 500; }

      /* ========= TOAST ========= */
      .toast-container {
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 300;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        pointer-events: none;
      }

      .toast {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        background: var(--admin-surface);
        border: 1px solid var(--admin-border);
        border-radius: var(--admin-radius-sm);
        box-shadow: var(--admin-shadow);
        font-size: 0.875rem;
        color: var(--admin-text);
        pointer-events: auto;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .toast.visible {
        opacity: 1;
        transform: translateX(0);
      }

      .toast.closing {
        opacity: 0;
        transform: translateX(100%);
      }

      .toast--success { border-left: 3px solid var(--admin-success); }
      .toast--warning { border-left: 3px solid var(--admin-warning); }
      .toast--error   { border-left: 3px solid var(--admin-danger); }
      .toast--info    { border-left: 3px solid var(--admin-primary); }

      .toast__icon { font-size: 1rem; flex-shrink: 0; }
      .toast__msg { flex: 1; }

      /* ========= RESPONSIVE ========= */
      @media (max-width: 767px) {
        .admin-sidebar {
          transform: translateX(-100%);
        }
        .admin-sidebar.open {
          transform: translateX(0);
        }
        .admin-main {
          margin-left: 0;
        }
        .admin-hamburger {
          display: block;
        }
        .admin-content {
          padding: 1.25rem;
        }
        .admin-topbar {
          padding: 0.75rem 1.25rem;
        }
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        .stat-card {
          padding: 1rem;
          flex-direction: column;
          text-align: center;
        }
        .stat-card__number { font-size: 1.5rem; }
        .requests-grid {
          grid-template-columns: 1fr;
        }
        .assessment-row {
          grid-template-columns: 1fr;
          gap: 0.35rem;
          padding: 0.75rem 0.5rem;
        }
        .assessment-row--header {
          display: none;
        }
        .assess-col--name { font-weight: 600; }
        .admin-modal {
          max-width: 100%;
          max-height: 90vh;
        }
        .detail-grid {
          grid-template-columns: 1fr;
        }
        .pkg-form-grid {
          grid-template-columns: 1fr;
        }
        .settings-action-item {
          flex-direction: column;
          align-items: flex-start;
        }
        .admin-view-header {
          flex-direction: column;
          align-items: flex-start;
        }
      }

      @media (max-width: 480px) {
        .stats-grid {
          grid-template-columns: 1fr;
        }
        .filter-tabs {
          flex-direction: column;
        }
        .filter-tab {
          justify-content: center;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /* ==========================================================
     EXPOSE GLOBAL API for onclick handlers
     ========================================================== */
  window._admin = {
    viewRequest,
    showAssessmentModal,
    showReportBuilder
  };

  /* ==========================================================
     BOOTSTRAP
     ========================================================== */
  // Inject styles immediately
  injectAdminStyles();

  // Also expose initAdmin globally
  window.initAdmin = initAdmin;

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdmin);
  } else {
    initAdmin();
  }

})();
