/**
 * AZALEA TOURISM & CONSULTANCY
 * Interactive Additions: Flipping Keywords, Multi-Language Engine, Eligibility Modal
 * Official Email: info@azaleaconsultancy.com | Hotline: +97431162611 | WhatsApp: +97451019991
 */

// Global Google Sheets Webhook URL for real-time lead capture
window.AZALEA_GOOGLE_SHEETS_WEBHOOK = "https://script.google.com/macros/s/AKfycby8XzJ0f_lbxGZq0QFzSJxXpn4p81oZ7DZmj9ua1yV4B1EEeBSC4C-sGKf5rqZtGLbc/exec";

(function () {
  'use strict';

  // =========================================================================
  // 1. FLIPPING KEYWORDS IN HERO SECTION
  // =========================================================================
  const flipKeywords = [
    'Permanent Residency',
    'Global Work Permits',
    'Skilled Worker Visas',
    'Worldwide Tourism',
    'Business & Investor Visas',
    'Europe Opportunity Cards',
    'Corporate & Business Visas'
  ];

  let currentKeywordIdx = 0;
  const keywordContainer = document.getElementById('flipKeywordsContainer');

  if (keywordContainer) {
    keywordContainer.innerHTML = '';
    flipKeywords.forEach((kw, index) => {
      const span = document.createElement('span');
      span.className = 'flip-keyword-item' + (index === 0 ? ' active' : '');
      span.textContent = kw;
      keywordContainer.appendChild(span);
    });

    const items = keywordContainer.querySelectorAll('.flip-keyword-item');

    setInterval(() => {
      const current = items[currentKeywordIdx];
      current.classList.remove('active');
      current.classList.add('exit');

      setTimeout(() => {
        current.classList.remove('exit');
      }, 700);

      currentKeywordIdx = (currentKeywordIdx + 1) % items.length;
      const next = items[currentKeywordIdx];
      next.classList.add('active');
    }, 2800);
  }

  // =========================================================================
  // 2. MULTI-LANGUAGE TRANSLATION ENGINE & RTL SWITCHER
  // =========================================================================
  const langDropdownBtn = document.getElementById('azaleaLangDropdownBtn');
  const langDropdownMenu = document.getElementById('azaleaLangDropdownMenu');

  if (langDropdownBtn && langDropdownMenu) {
    langDropdownBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      langDropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', function () {
      langDropdownMenu.classList.remove('show');
    });

    const langItems = document.querySelectorAll('.azalea-lang-item');
    langItems.forEach((item) => {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        const selectedLang = this.getAttribute('data-lang');
        const flag = this.getAttribute('data-flag');
        const langName = this.getAttribute('data-name');

        applyLanguage(selectedLang, flag, langName);
        langDropdownMenu.classList.remove('show');
      });
    });
  }

  // Safe Storage Helpers (Guarantees zero throws on file:/// protocol and restricted sandboxes)
  function safeGetStorage(type, key) {
    try {
      if (type === 'local' && window.localStorage) return localStorage.getItem(key);
      if (type === 'session' && window.sessionStorage) return sessionStorage.getItem(key);
    } catch (e) {
      return null;
    }
    return null;
  }

  function safeSetStorage(type, key, val) {
    try {
      if (type === 'local' && window.localStorage) localStorage.setItem(key, val);
      if (type === 'session' && window.sessionStorage) sessionStorage.setItem(key, val);
    } catch (e) {}
  }

  function applyLanguage(langCode, flag, langName) {
    const currentFlagEl = document.getElementById('currentLangFlag');
    const currentNameEl = document.getElementById('currentLangName');
    if (currentFlagEl) currentFlagEl.innerHTML = '<i class="fa-solid fa-globe text-primary pe-1"></i>';
    if (currentNameEl) currentNameEl.textContent = langName || (langCode === 'en' ? 'English' : langCode);

    document.querySelectorAll('.azalea-lang-item').forEach((i) => {
      i.classList.toggle('active', i.getAttribute('data-lang') === langCode);
    });

    if (langCode === 'ar' || langCode === 'ur') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', langCode);
      document.body.classList.add('rtl-layout');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', langCode);
      document.body.classList.remove('rtl-layout');
    }

    // Manage googtrans cookies
    try {
      if (langCode === 'en') {
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        if (window.location.hostname) {
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
        }
      } else {
        document.cookie = `googtrans=/en/${langCode}; path=/;`;
        if (window.location.hostname) {
          document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
          document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${window.location.hostname}`;
        }
      }
    } catch (e) {}

    function triggerGoogleTranslateCombo() {
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.value = langCode;
        combo.dispatchEvent(new Event('change'));
        return true;
      }
      return false;
    }

    if (!triggerGoogleTranslateCombo()) {
      let attempts = 0;
      const timer = setInterval(() => {
        attempts++;
        if (triggerGoogleTranslateCombo() || attempts > 25) {
          clearInterval(timer);
        }
      }, 150);
    }

    // Extra failsafe when switching back to English
    if (langCode === 'en') {
      try {
        const frame = document.querySelector('iframe.goog-te-banner-frame');
        if (frame && frame.contentWindow) {
          const restoreBtn = frame.contentWindow.document.querySelector('.goog-te-button button, #\\:1\\.restore');
          if (restoreBtn) restoreBtn.click();
        }
      } catch (e) {}
    }

    safeSetStorage('local', 'azalea_pref_lang', langCode);
    safeSetStorage('local', 'azalea_pref_flag', 'globe');
    safeSetStorage('local', 'azalea_pref_name', langName || 'English');
  }

  const savedLang = safeGetStorage('local', 'azalea_pref_lang');
  if (savedLang && savedLang !== 'en') {
    const savedName = safeGetStorage('local', 'azalea_pref_name') || savedLang;
    applyLanguage(savedLang, 'globe', savedName);
  }

  // =========================================================================
  // 3. "CHECK YOUR VISA ELIGIBILITY IN 5MIN" MULTI-STEP MODAL
  // =========================================================================
  const eligibilityModalEl = document.getElementById('azaleaEligibilityModal');
  let eligibilityModal = null;

  function initEligibilityModal() {
    if (!eligibilityModal && eligibilityModalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      eligibilityModal = new bootstrap.Modal(eligibilityModalEl, {
        backdrop: true,
        keyboard: true
      });
    }
    return eligibilityModal;
  }

  if (eligibilityModalEl) {
    eligibilityModalEl.addEventListener('show.bs.modal', function () {
      if (mainHeader) mainHeader.style.setProperty('z-index', '1000', 'important');
    });
    eligibilityModalEl.addEventListener('hidden.bs.modal', function () {
      if (mainHeader) mainHeader.style.removeProperty('z-index');
    });
  }

  function openEligibilityModal(targetCountry) {
    initEligibilityModal();
    if (eligibilityModal || (window.jQuery && typeof window.jQuery('#azaleaEligibilityModal').modal === 'function')) {
      resetWizard();
      if (targetCountry) {
        const countrySelect = document.getElementById('modalTargetCountry');
        if (countrySelect) {
          let matched = false;
          const cleanTarget = targetCountry.trim().toLowerCase();
          for (let i = 0; i < countrySelect.options.length; i++) {
            const optVal = countrySelect.options[i].value.toLowerCase();
            const optText = countrySelect.options[i].text.toLowerCase();
            if (optVal.includes(cleanTarget) || cleanTarget.includes(optVal) || optText.includes(cleanTarget)) {
              countrySelect.selectedIndex = i;
              matched = true;
              break;
            }
          }
          if (!matched) {
            const newOpt = document.createElement('option');
            newOpt.value = targetCountry.trim();
            newOpt.text = targetCountry.trim() + ' (Specialist Advisory)';
            newOpt.selected = true;
            countrySelect.add(newOpt);
          }
        }
      }
      if (eligibilityModal) {
        eligibilityModal.show();
      } else {
        window.jQuery('#azaleaEligibilityModal').modal('show');
      }
    }
  }

  // Open triggers - Direct binding + Document-level delegation for 100% reliability
  document.querySelectorAll('.btn-open-eligibility').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const country = this.getAttribute('data-country') || 
                      this.querySelector('.sisf-m-title h3, .sisf-m-title p, h4')?.innerText?.trim();
      openEligibilityModal(country);
    });
  });

  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('.btn-open-eligibility');
    if (trigger) {
      e.preventDefault();
      const country = trigger.getAttribute('data-country') || 
                      trigger.querySelector('.sisf-m-title h3, .sisf-m-title p, h4')?.innerText?.trim();
      openEligibilityModal(country);
    }
  });

  // Auto popup for visitors: ONLY ON HOME PAGE, AND ONLY ONCE PER VISIT
  function isHomePage() {
    const p = (window.location.pathname || '').toLowerCase();
    // Subpages where auto popup is strictly disabled
    const subpages = ['about-us', 'service', 'our-countries', 'contact', 'faq', 'form', 'privacy-policy', 'terms-conditions'];
    for (let i = 0; i < subpages.length; i++) {
      if (p.indexOf(subpages[i]) !== -1) {
        return false;
      }
    }
    return p === '/' || p === '' || p.endsWith('/index.html') || p.endsWith('/index') || (window.location.protocol === 'file:' && p.endsWith('index.html'));
  }

  function triggerWelcomePopup() {
    // Strictly verify home page
    if (!isHomePage()) {
      return;
    }

    // Strictly verify shown only once per user
    const alreadyShown = safeGetStorage('local', 'azalea_home_popup_shown') || safeGetStorage('session', 'azalea_home_popup_shown');
    if (alreadyShown) {
      return;
    }

    if (!document.querySelector('.modal.show')) {
      openEligibilityModal();
      safeSetStorage('local', 'azalea_home_popup_shown', 'true');
      safeSetStorage('session', 'azalea_home_popup_shown', 'true');
    }
  }

  if (document.readyState === 'complete') {
    setTimeout(triggerWelcomePopup, 1800);
  } else {
    window.addEventListener('load', () => setTimeout(triggerWelcomePopup, 1800));
  }

  let wizardStep = 1;
  const maxSteps = 2;

  function updateWizardState() {
    const pill1 = document.getElementById('stepPill1');
    const pill2 = document.getElementById('stepPill2');
    if (pill1 && pill2) {
      if (wizardStep === 1) {
        pill1.className = 'step-pill active';
        pill2.className = 'step-pill';
      } else {
        pill1.className = 'step-pill completed';
        pill2.className = 'step-pill active';
      }
    }

    const stepPanels = document.querySelectorAll('.wizard-step');
    stepPanels.forEach((panel) => {
      panel.classList.remove('active');
      if (parseInt(panel.getAttribute('data-step'), 10) === wizardStep) {
        panel.classList.add('active');
      }
    });
  }

  window.nextEligibilityStep = function (step) {
    if (step === 1) {
      const countryEl = document.getElementById('modalTargetCountry');
      const visaEl = document.getElementById('modalVisaType');
      if (countryEl && !countryEl.value) {
        alert('Please choose your target destination country.');
        return;
      }
      if (visaEl && !visaEl.value) {
        alert('Please choose your visa category.');
        return;
      }
    }

    wizardStep = 2;
    updateWizardState();
  };

  window.prevEligibilityStep = function (step) {
    wizardStep = 1;
    updateWizardState();
  };

  function calculateLiveScore() {
    let score = 88;
    const eduEl = document.getElementById('modalEduLevel');
    if (eduEl && eduEl.selectedOptions && eduEl.selectedOptions[0]) {
      score = 72 + parseInt(eduEl.selectedOptions[0].getAttribute('data-points') || '18', 10);
    }
    return Math.min(96, Math.max(78, score));
  }

  function resetWizard() {
    wizardStep = 1;
    const form = document.getElementById('azaleaEligibilityForm');
    if (form) form.reset();
    const flowWrap = document.getElementById('wizardFlowWrapper');
    const resultWrap = document.getElementById('wizardResultContainer');
    if (flowWrap) flowWrap.style.display = 'block';
    if (resultWrap) resultWrap.style.display = 'none';
    updateWizardState();
  }

  // Strict Digits-Only Enforcement on Phone Inputs (No letters or symbols allowed)
  document.querySelectorAll('.azalea-digits-only').forEach((input) => {
    input.addEventListener('keypress', function (e) {
      if (e.key && !/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    });
    input.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
    input.addEventListener('paste', function (e) {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text');
      const digits = text.replace(/[^0-9]/g, '');
      document.execCommand('insertText', false, digits);
    });
  });

  const eligibilityForm = document.getElementById('azaleaEligibilityForm');
  if (eligibilityForm) {
    eligibilityForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('modalApplicantName').value.trim();
      const email = document.getElementById('modalApplicantEmail').value.trim();
      const phone = document.getElementById('modalApplicantPhone').value.trim();
      const dialCode = document.getElementById('modalCountryCode') ? document.getElementById('modalCountryCode').value : '+974';
      const fullPhone = `${dialCode} ${phone}`;
      const countryEl = document.getElementById('modalTargetCountry');
      const country = countryEl ? countryEl.value : 'Canada';
      const visaEl = document.getElementById('modalVisaType');
      const visaType = visaEl ? visaEl.value : 'Work Permit & Skilled Employment';
      const timeline = document.querySelector('input[name="modal_timeline"]:checked')?.value || 'Immediate (1 - 3 Months)';

      if (!name || !email || !phone) {
        alert('Please fill in your full name, email address, and active phone number.');
        return;
      }

      const score = calculateLiveScore();
      const refCode = 'AZA-QA-' + Math.floor(1000 + Math.random() * 9000);

      // Save lead to local database & trigger Excel ledger
      if (window.azaleaSaveLead) {
        window.azaleaSaveLead({
          id: refCode,
          name: name,
          email: email,
          mobile: fullPhone,
          targetCountry: country,
          visaInterest: visaType,
          timeline: timeline,
          source: 'Modal Eligibility Form'
        });
      }

      document.getElementById('wizardFlowWrapper').style.display = 'none';
      const resultWrap = document.getElementById('wizardResultContainer');
      resultWrap.style.display = 'block';

      document.getElementById('modalResultName').innerText = name;
      document.getElementById('modalResultRef').innerText = refCode;
      document.getElementById('modalResultCountry').innerText = country;
      document.getElementById('modalResultVisa').innerText = visaType;
      document.getElementById('modalResultScore').innerText = `High Match (${score}%)`;

      const waMsg = encodeURIComponent(
        `*AZALEA GLOBAL VISA ASSESSMENT*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `• *Case Ref:* ${refCode}\n` +
        `• *Applicant:* ${name}\n` +
        `• *Email:* ${email}\n` +
        `• *Phone/WhatsApp:* ${fullPhone}\n` +
        `• *Target Country:* ${country}\n` +
        `• *Visa Category:* ${visaType}\n` +
        `• *Timeline:* ${timeline}\n` +
        `• *Preliminary Match:* ${score}%\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `Hello Azalea Legal Team! I have completed the official visa eligibility assessment on your website. Please review my profile and send my document checklist.`
      );

      const waLink = document.getElementById('modalDirectWhatsAppBtn') || document.getElementById('modalWhatsAppBtn');
      if (waLink) {
        const waUrl = `https://wa.me/97451019991?text=${waMsg}`;
      waLink.href = waUrl;
      try {
        window.open(waUrl, '_blank');
      } catch (err) {}
      }

      safeSetStorage('session', 'azalea_modal_shown', 'true');
    });
  }

  // Contact page form submission
  const contactForm = document.getElementById('azaleaContactPageForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('contactName') ? document.getElementById('contactName').value.trim() : '';
      const email = document.getElementById('contactEmail') ? document.getElementById('contactEmail').value.trim() : '';
      const phone = document.getElementById('contactPhone') ? document.getElementById('contactPhone').value.trim() : '';
      const dialCode = document.getElementById('contactCountryCode') ? document.getElementById('contactCountryCode').value : '+974';
      const fullPhone = `${dialCode} ${phone}`;
      const country = document.getElementById('contactCountry') ? document.getElementById('contactCountry').value : 'Canada';
      const visa = document.getElementById('contactVisa') ? document.getElementById('contactVisa').value : 'Work Permit';
      const msg = document.getElementById('contactMessage') ? document.getElementById('contactMessage').value.trim() : 'Please advise on application requirements.';

      if (!name || !email || !phone) {
        alert('Please fill in your name, email, and phone number.');
        return;
      }

      // Automatically sync contact inquiry to Google Sheet
      if (window.azaleaSaveLead) {
        window.azaleaSaveLead({
          name: name,
          email: email,
          mobile: fullPhone,
          targetCountry: country,
          visaInterest: visa,
          source: 'Contact Page Inquiry Form',
          timeline: 'Immediate Consultation',
          status: 'Active Contact Inquiry'
        });
      }

      const waText = encodeURIComponent(
        `*AZALEA DOHA CONSULTATION INQUIRY*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `• *Name:* ${name}\n` +
        `• *Email:* ${email}\n` +
        `• *Phone/WhatsApp:* ${fullPhone}\n` +
        `• *Destination:* ${country}\n` +
        `• *Visa Stream:* ${visa}\n` +
        `• *Message:* ${msg}\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `Hello Azalea Legal Team! I have submitted a consultation request on your contact page. Please connect with me to schedule an appointment.`
      );

      window.open(`https://wa.me/97451019991?text=${waText}`, '_blank');
    });
  }

  // Smooth scroll for top nav links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#' && document.querySelector(targetId)) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Ensure Slide 1 background video plays smoothly
  const heroVideo = document.querySelector('.hero-slider-layout video');
  if (heroVideo) {
    const playHeroVid = function () {
      heroVideo.muted = true;
      heroVideo.play().catch(function () {});
    };
    playHeroVid();
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) playHeroVid();
    });
  }

  // =========================================================================
  // PERSISTENT STICKY NAVBAR CONTROLLER
  // =========================================================================
  const headerInner = document.getElementById('sisf-page-header-inner');
  const mainHeader = document.getElementById('sisf-page-header');

  if (mainHeader) {
    let headerHeight = mainHeader.offsetHeight || 160;
    const measureHeader = () => {
      if (!mainHeader.classList.contains('is-sticky')) {
        headerHeight = mainHeader.offsetHeight || 160;
      }
    };
    window.addEventListener('resize', measureHeader, { passive: true });

    let isSticky = false;
    let ticking = false;
    const updateSticky = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollY > 60) {
        if (!isSticky) {
          isSticky = true;
          measureHeader();
          document.body.style.paddingTop = headerHeight + 'px';
          mainHeader.classList.add('is-sticky');
          if (headerInner) headerInner.classList.add('is-sticky');
        }
      } else {
        if (isSticky) {
          isSticky = false;
          mainHeader.classList.remove('is-sticky');
          if (headerInner) headerInner.classList.remove('is-sticky');
          document.body.style.paddingTop = '0px';
        }
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateSticky);
        ticking = true;
      }
    }, { passive: true });

    updateSticky();
  }

  // Legacy preloader cleanup only for obsolete templates
  function cleanupLegacyPreloader() {
    const legacy = document.querySelector('.sis-preloader');
    if (legacy && legacy.parentNode) {
      legacy.parentNode.removeChild(legacy);
    }
  }
  cleanupLegacyPreloader();

  // Toggle World Countries in our-countries.html
  function initWorldCountriesToggle() {
    const btnToggle = document.getElementById('btnToggleWorldCountries');
    const section = document.getElementById('worldCountriesSection');
    if (btnToggle && section) {
      btnToggle.addEventListener('click', function () {
        const isHidden = window.getComputedStyle(section).display === 'none';
        const txt = document.getElementById('btnToggleText');
        const icon = document.getElementById('btnToggleIcon');
        if (isHidden) {
          section.style.display = 'block';
          if (txt) txt.innerText = 'Collapse Sovereign Destinations';
          if (icon) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
          }
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          section.style.display = 'none';
          if (txt) txt.innerText = 'View More Sovereign Destinations';
          if (icon) {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
          }
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWorldCountriesToggle);
  } else {
    initWorldCountriesToggle();
  }

})();


/* ===================================================================
 * AZALEA LANGUAGE SWITCHER (NAVBAR SPEC)
 * =================================================================== */
window.azaleaSwitchLanguage = function (lang) {
  const cleanLang = (lang || 'en');
  const code = (cleanLang === 'zh-CN' ? 'ZH' : cleanLang.toUpperCase());

  // RTL / LTR layout switching
  if (cleanLang === 'ar' || cleanLang === 'ur') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', cleanLang);
    document.body.classList.add('rtl-layout');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', cleanLang);
    document.body.classList.remove('rtl-layout');
  }

  // Update current language code on all pills (desktop & mobile) with notranslate protection
  document.querySelectorAll('.azalea-current-lang-code').forEach((el) => {
    el.innerText = code;
    el.classList.add('notranslate');
    el.setAttribute('translate', 'no');
  });

  // Highlight active item in all dropdown menus
  document.querySelectorAll('.azalea-lang-nav-wrap .dropdown-item').forEach((item) => {
    const isThis = item.getAttribute('data-lang') === cleanLang;
    item.classList.toggle('active', isThis);
  });

  // Close open dropdowns
  document.querySelectorAll('.azalea-lang-nav-wrap').forEach((w) => w.classList.remove('show'));

  // Store preference
  try {
    localStorage.setItem('azalea_pref_lang', cleanLang);
  } catch (e) {}

  // Google Translate cookies
  try {
    if (cleanLang === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      if (window.location.hostname) {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
      }
    } else {
      document.cookie = `googtrans=/en/${cleanLang}; path=/;`;
      if (window.location.hostname) {
        document.cookie = `googtrans=/en/${cleanLang}; path=/; domain=${window.location.hostname}`;
        document.cookie = `googtrans=/en/${cleanLang}; path=/; domain=.${window.location.hostname}`;
      }
    }
  } catch (e) {}

  // Smoothly recalculate Swiper dimensions & positions
  setTimeout(() => {
    document.querySelectorAll('.swiper').forEach((el) => {
      if (el.swiper && typeof el.swiper.update === 'function') {
        try { el.swiper.update(); } catch (err) {}
      }
    });
    window.dispatchEvent(new Event('resize'));
  }, 100);

  // Trigger Google Translate Combo
  const gtCombo = document.querySelector('.goog-te-combo');
  if (gtCombo) {
    gtCombo.value = cleanLang;
    gtCombo.dispatchEvent(new Event('change'));
  } else {
    window.location.reload();
  }
};

// Sync Language Badge & RTL on Load
try {
  const savedLang = localStorage.getItem('azalea_pref_lang') || (document.cookie.match(/googtrans=\/en\/([a-z-]+)/i) || [])[1];
  if (savedLang) {
    const code = (savedLang === 'zh-CN' ? 'ZH' : savedLang.toUpperCase());
    document.querySelectorAll('.azalea-current-lang-code').forEach((el) => {
      el.innerText = code;
      el.classList.add('notranslate');
      el.setAttribute('translate', 'no');
    });
    if (savedLang === 'ar' || savedLang === 'ur') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', savedLang);
      document.body.classList.add('rtl-layout');
    }
    document.querySelectorAll('.azalea-lang-nav-wrap .dropdown-item').forEach((item) => {
      item.classList.toggle('active', item.getAttribute('data-lang') === savedLang);
    });
  }
} catch (e) {}

/* ===================================================================
 * AZALEA CENTRALIZED LEADS ENGINE & EXCEL EXPORT
 * =================================================================== */
window.azaleaGetLeads = function () {
  try {
    return JSON.parse(localStorage.getItem('azalea_leads_database') || '[]');
  } catch (e) {
    return [];
  }
};

window.azaleaSaveLead = function (lead) {
  try {
    const leads = window.azaleaGetLeads();
    const newLead = {
      id: lead.id || ('AZA-QA-' + Math.floor(1000 + Math.random() * 9000)),
      date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Qatar' }),
      timestamp: Date.now(),
      name: lead.name || 'Anonymous Applicant',
      mobile: lead.mobile || 'N/A',
      email: lead.email || 'N/A',
      targetCountry: lead.targetCountry || 'General Relocation',
      visaInterest: lead.visaInterest || 'General Visa Assessment',
      education: lead.education || 'N/A',
      timeline: lead.timeline || 'Immediate (1 - 3 Months)',
      source: lead.source || 'Website Assessment Form',
      status: 'Active Lead'
    };

    leads.unshift(newLead);
    localStorage.setItem('azalea_leads_database', JSON.stringify(leads));

    // Optional cloud webhook sync (Google Sheets / Webhook)
    const webhookUrl = window.AZALEA_GOOGLE_SHEETS_WEBHOOK || localStorage.getItem('azalea_leads_webhook_url');
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      }).catch((err) => console.log('Webhook sync note:', err));
    }

    console.log('Lead logged successfully:', newLead.id, newLead.name);
    return newLead;
  } catch (err) {
    console.error('Error saving lead:', err);
  }
};

window.azaleaClearLeads = function () {
  if (confirm('Are you sure you want to clear all leads stored in local database?')) {
    localStorage.removeItem('azalea_leads_database');
    window.location.reload();
  }
};

window.azaleaExportLeadsToExcel = function () {
  try {
    const rawLeads = window.azaleaGetLeads();
    if (!rawLeads || rawLeads.length === 0) {
      alert('No leads recorded yet. Submit an assessment form or click "Add Test Lead" in the Leads Console.');
      return;
    }

    const headers = [
      'Case Ref ID',
      'Date & Time (Doha)',
      'Full Name',
      'Mobile Number',
      'Email Address',
      'Target Relocation Country',
      'Visa Category / Interest',
      'Education Level',
      'Planned Timeline',
      'Lead Source',
      'Status'
    ];

    const rows = rawLeads.map((l) => [
      `"${(l.id || '').replace(/"/g, '""')}"`,
      `"${(l.date || '').replace(/"/g, '""')}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.mobile || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.targetCountry || '').replace(/"/g, '""')}"`,
      `"${(l.visaInterest || '').replace(/"/g, '""')}"`,
      `"${(l.education || '').replace(/"/g, '""')}"`,
      `"${(l.timeline || '').replace(/"/g, '""')}"`,
      `"${(l.source || '').replace(/"/g, '""')}"`,
      `"${(l.status || 'Active Lead').replace(/"/g, '""')}"`
    ]);

    // UTF-8 Byte Order Mark for flawless Arabic & special characters in Microsoft Excel
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute('href', url);
    link.setAttribute('download', `Azalea_Client_Leads_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Error exporting leads:', err);
    alert('Export failed. Please check browser permissions.');
  }
};


  // Pure Vanilla Dropdown Toggle for Navbar Language Switcher (Zero Popper dependency)
  document.addEventListener("click", function (e) {
    const btn = e.target.closest("#azaleaNavLangBtn") || e.target.closest(".azalea-lang-pill-btn");
    const wrap = e.target.closest(".azalea-lang-nav-wrap");
    if (btn && wrap) {
      e.preventDefault();
      e.stopPropagation();
      const menu = wrap.querySelector(".dropdown-menu");
      const isShowing = wrap.classList.contains("show") || (menu && menu.classList.contains("show"));
      document.querySelectorAll(".azalea-lang-nav-wrap.show, .azalea-lang-nav-wrap .dropdown-menu.show").forEach((el) => el.classList.remove("show"));
      if (!isShowing) {
        wrap.classList.add("show");
        if (menu) menu.classList.add("show");
      }
    } else if (!e.target.closest(".dropdown-menu")) {
      document.querySelectorAll(".azalea-lang-nav-wrap.show, .azalea-lang-nav-wrap .dropdown-menu.show").forEach((el) => el.classList.remove("show"));
    }
  });
