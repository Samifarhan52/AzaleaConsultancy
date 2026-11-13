/**
 * AZALEA IMMIGRATION & CONSULTANCY
 * Interactive Additions: Flipping Keywords, Multi-Language Engine, Eligibility Modal
 * Official Email: Info@azaleagroupqa.com | Official WhatsApp: +97451019991
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. FLIPPING KEYWORDS IN HERO SECTION
  // =========================================================================
  const flipKeywords = [
    'Permanent Residency',
    'Global Work Permits',
    'Overseas Education',
    'Worldwide Tourism',
    'Business & Investor Visas',
    'Europe Opportunity Cards',
    'Global Citizenship & Golden Visas'
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

  function openEligibilityModal() {
    initEligibilityModal();
    if (eligibilityModal) {
      resetWizard();
      eligibilityModal.show();
    } else if (window.jQuery && typeof $('#azaleaEligibilityModal').modal === 'function') {
      resetWizard();
      $('#azaleaEligibilityModal').modal('show');
    }
  }

  // Open triggers - Direct binding + Document-level delegation for 100% reliability
  document.querySelectorAll('.btn-open-eligibility').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openEligibilityModal();
    });
  });

  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('.btn-open-eligibility');
    if (trigger) {
      e.preventDefault();
      openEligibilityModal();
    }
  });

  // Auto popup for visitors when they arrive on the website (after 1.8 seconds)
  function triggerWelcomePopup() {
    if (!document.querySelector('.modal.show')) {
      openEligibilityModal();
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

      document.getElementById('wizardFlowWrapper').style.display = 'none';
      const resultWrap = document.getElementById('wizardResultContainer');
      resultWrap.style.display = 'block';

      document.getElementById('modalResultName').innerText = name;
      document.getElementById('modalResultRef').innerText = refCode;
      document.getElementById('modalResultCountry').innerText = country;
      document.getElementById('modalResultVisa').innerText = visaType;
      document.getElementById('modalResultScore').innerText = `High Match (${score}%)`;

      const waMsg = encodeURIComponent(
        `*AZALEA GLOBAL IMMIGRATION ASSESSMENT*\n` +
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
        waLink.href = `https://wa.me/97451019991?text=${waMsg}`;
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

  // Instant Failsafe Dismissal for Any Legacy Preloader
  function dismissCurtainPreloader() {
    const p = document.getElementById('preloader') || document.querySelector('.preloader') || document.querySelector('.sis-preloader');
    if (p) {
      p.style.display = 'none';
      if (p.parentNode) p.parentNode.removeChild(p);
    }
  }

  dismissCurtainPreloader();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', dismissCurtainPreloader);
  }
  window.addEventListener('load', dismissCurtainPreloader);
  setTimeout(dismissCurtainPreloader, 100);
})();
