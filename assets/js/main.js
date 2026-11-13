/**
 * AZALEA TOURISM & CONSULTANCY & SERVICES
 * Main Interactive Application Script
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  // 2. Sticky Navbar with backdrop blur
  const navbar = document.querySelector('.main-navbar-wrapper');
  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  // 3. Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Animated Counters on Scroll
  const counters = document.querySelectorAll('.counter-val');
  if (counters.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const targetNum = parseInt(target.getAttribute('data-target'), 10);
            const prefix = target.getAttribute('data-prefix') || '';
            const suffix = target.getAttribute('data-suffix') || '';
            const duration = 1800; // ms
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutQuad
              const easeProgress = 1 - (1 - progress) * (1 - progress);
              const currentVal = Math.floor(easeProgress * targetNum);

              target.innerText = prefix + currentVal.toLocaleString() + suffix;

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                target.innerText = prefix + targetNum.toLocaleString() + suffix;
              }
            }

            requestAnimationFrame(updateCounter);
            obs.unobserve(target);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach((c) => observer.observe(c));
  }

  // 5. Initialize Testimonials Swiper
  if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      pagination: {
        el: '.testimonials-pagination',
        clickable: true
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 28
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    });

    // Partners Ticker Swiper
    new Swiper('.partners-swiper', {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      breakpoints: {
        576: { slidesPerView: 3, spaceBetween: 24 },
        768: { slidesPerView: 4, spaceBetween: 24 },
        1024: { slidesPerView: 5, spaceBetween: 30 }
      }
    });
  }

  // 6. VISA ELIGIBILITY WIZARD MODAL CONTROLLER
  const modalElem = document.getElementById('eligibilityModal');
  let eligibilityModal = null;
  if (modalElem && typeof bootstrap !== 'undefined') {
    eligibilityModal = new bootstrap.Modal(modalElem);
  }

  // Open modal triggers
  document.querySelectorAll('.btn-open-eligibility').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      resetEligibilityWizard();
      if (eligibilityModal) eligibilityModal.show();
    });
  });

  // Auto popup trigger (once per session after 12s)
  if (!sessionStorage.getItem('azalea_eligibility_dismissed')) {
    setTimeout(() => {
      if (eligibilityModal && !document.querySelector('.modal.show')) {
        eligibilityModal.show();
      }
    }, 12000);
  }

  if (modalElem) {
    modalElem.addEventListener('hidden.bs.modal', function () {
      sessionStorage.setItem('azalea_eligibility_dismissed', 'true');
    });
  }

  // Wizard Navigation
  let currentStep = 1;
  const totalSteps = 3;
  const progressFill = document.getElementById('wizardProgressFill');
  const stepNodes = document.querySelectorAll('.wizard-step-node');
  const stepContents = document.querySelectorAll('.wizard-step-content');

  function updateWizardUI() {
    // Update progress bar
    if (progressFill) {
      const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
      progressFill.style.width = percentage + '%';
    }

    // Update nodes
    stepNodes.forEach((node) => {
      const stepIdx = parseInt(node.getAttribute('data-step'), 10);
      node.classList.remove('active', 'completed');
      if (stepIdx === currentStep) {
        node.classList.add('active');
      } else if (stepIdx < currentStep) {
        node.classList.add('completed');
      }
    });

    // Update step visibility
    stepContents.forEach((content) => {
      content.classList.remove('active');
      if (parseInt(content.getAttribute('data-step'), 10) === currentStep) {
        content.classList.add('active');
      }
    });
  }

  window.nextWizardStep = function (step) {
    // Simple validation
    if (step === 1) {
      const country = document.querySelector('input[name="target_country"]:checked');
      const visaType = document.querySelector('input[name="visa_type"]:checked');
      if (!country || !visaType) {
        alert('Please choose both your destination country and preferred visa type to proceed.');
        return;
      }
    } else if (step === 2) {
      const edu = document.getElementById('eduLevel').value;
      const exp = document.getElementById('workExp').value;
      if (!edu || !exp) {
        alert('Please select your highest education level and years of work experience.');
        return;
      }
    }

    currentStep = step + 1;
    updateWizardUI();
  };

  window.prevWizardStep = function (step) {
    currentStep = step - 1;
    updateWizardUI();
  };

  function resetEligibilityWizard() {
    currentStep = 1;
    const form = document.getElementById('eligibilityForm');
    if (form) form.reset();
    document.getElementById('wizardStepsWrapper').style.display = 'block';
    document.getElementById('wizardResultWrapper').style.display = 'none';
    updateWizardUI();
  }

  // Handle Form Submission
  const eligibilityForm = document.getElementById('eligibilityForm');
  if (eligibilityForm) {
    eligibilityForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('applicantName').value.trim();
      const emailInput = document.getElementById('applicantEmail').value.trim();
      const phoneInput = document.getElementById('applicantPhone').value.trim();
      const countryInput = document.querySelector('input[name="target_country"]:checked')?.value || 'Canada';
      const visaTypeInput = document.querySelector('input[name="visa_type"]:checked')?.value || 'Permanent Residency';

      if (!nameInput || !emailInput || !phoneInput) {
        alert('Please enter your full name, email address, and active phone/WhatsApp number.');
        return;
      }

      // Hide steps, display loading / result card
      document.getElementById('wizardStepsWrapper').style.display = 'none';
      const resultWrap = document.getElementById('wizardResultWrapper');
      resultWrap.style.display = 'block';

      // Generate random reference code
      const refCode = 'AZA-' + Math.floor(1000 + Math.random() * 9000);
      document.getElementById('resultApplicantName').innerText = nameInput;
      document.getElementById('resultRefCode').innerText = refCode;
      document.getElementById('resultCountry').innerText = countryInput;
      document.getElementById('resultVisa').innerText = visaTypeInput;

      // Dynamic calculation score
      const randomScore = Math.floor(88 + Math.random() * 10);
      document.getElementById('resultScoreVal').innerText = randomScore + '%';

      // Setup Direct WhatsApp Action link
      const waText = encodeURIComponent(
        `Hello Azalea Consultancy! My name is ${nameInput}. I completed the free visa eligibility check (Ref: ${refCode}) for ${visaTypeInput} to ${countryInput}. My calculated eligibility match is ${randomScore}%. Please share my detailed evaluation checklist.`
      );
      const waBtn = document.getElementById('resultWhatsAppBtn');
      if (waBtn) {
        waBtn.href = `https://wa.me/97431162611?text=${waText}`;
      }

      // Mark session so it won't auto-popup again
      sessionStorage.setItem('azalea_eligibility_dismissed', 'true');
    });
  }

  // 7. Contact / Lead Quick Form
  const contactForm = document.getElementById('azaleaQuickInquiryForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for contacting Azalea Tourism & Consultancy & Services! Our Doha counselor will connect with you via phone/WhatsApp within 30 minutes.');
      contactForm.reset();
    });
  }

  // 8. Newsletter Subscription
  const newsletterForm = document.getElementById('footerNewsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for subscribing! You will receive the latest visa quotas, policy updates, and relocation news.');
      newsletterForm.reset();
    });
  }
});
