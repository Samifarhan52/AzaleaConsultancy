/**
 * Azalea Tourism & Consultancy - 24/7 AI Visa & Relocation Advisor
 * Official Doha Legal Advisory Desk
 */
(function () {
  'use strict';

  const KNOWLEDGE_BASE = [
    // 1. Work Permits & Employment Visas
    {
      keywords: ['work permit', 'work visa', 'employment visa', 'job offer', 'lmia', 'cos', 'skilled worker', 'working visa', 'work permits'],
      response: `<strong>💼 Work Permits & Employment Visa Services:</strong><br><br>
Azalea specializes in verified corporate work permits and skilled worker streams:<br>
• <strong>Germany Opportunity Card (Chancenkarte):</strong> Job-search visa based on qualifications and points, leading to EU Blue Card.<br>
• <strong>United Kingdom Skilled Worker:</strong> CoS verification, salary threshold auditing, and priority Home Office filing.<br>
• <strong>Canada LMIA & Work Permits:</strong> Positive LMIA compliance, employer-specific permits, and provincial pathways.<br>
• <strong>UAE & Gulf Employment Visas:</strong> Executive work permits, multi-year labor contracts, and corporate sponsorship.<br><br>
Would you like our Doha legal team to evaluate your job profile and eligibility?`,
      cta: { text: 'Check Work Visa Eligibility', action: 'eligibility', country: 'Germany' }
    },

    // 2. Permanent Residency (PR) & Settlement
    {
      keywords: ['permanent residency', 'pr', 'settle', 'settlement', 'express entry', 'crs', 'pnp', 'subclass 189', 'subclass 190', 'green card'],
      response: `<strong>🏠 Permanent Residency (PR) & Settlement Pathways:</strong><br><br>
Secure permanent resident status and citizenship pathways for you and your family:<br>
• <strong>Canada Express Entry & PNP:</strong> FSW/CEC profile scoring, category-based draws (STEM, Healthcare, Trades), and provincial nominations (Ontario, BC, Alberta).<br>
• <strong>Australia General Skilled Migration (GSM):</strong> Points-tested Subclass 189, 190 (State Nominated), and 491 visas.<br>
• <strong>European Settlement:</strong> EU Blue Card to permanent settlement in 21–27 months.<br>
• <strong>Benefits:</strong> Free universal healthcare, world-class education for dependents, and passport eligibility within 3–5 years.`,
      cta: { text: 'Calculate PR Score Free', action: 'eligibility', country: 'Canada' }
    },

    // 3. Golden Visas & Investor Programs
    {
      keywords: ['golden visa', 'investor', 'investment', 'invest', 'eb-5', 'real estate', 'dubai golden visa', 'business visa'],
      response: `<strong>👑 Golden Visa & Sovereign Investor Programs:</strong><br><br>
Fast-track residency by investment with complete family inclusion and tax advantages:<br>
• <strong>UAE 10-Year Golden Visa (Dubai):</strong> Real estate investors (AED 2M+), entrepreneurs, and senior specialists with 0% personal tax.<br>
• <strong>United States EB-5:</strong> Permanent Green Card route via qualifying TEA enterprise investment.<br>
• <strong>European Golden Visas:</strong> Spain, Portugal, Greece, and Malta investor residency with Schengen-wide travel freedom.<br><br>
Azalea coordinates escrow verification, asset documentation, and sovereign embassy lodgement directly from Doha.`,
      cta: { text: 'Inquire on WhatsApp', action: 'whatsapp', topic: 'Golden Visa & Investor Programs' }
    },

    // 4. Tourist & Business Visit Visas
    {
      keywords: ['tourist', 'visit visa', 'visitor', 'travel visa', 'schengen', 'holiday', 'tourism', 'b1/b2', 'business trip'],
      response: `<strong>✈️ Tourist & Business Visit Visa Solutions:</strong><br><br>
Hassle-free, expedited visit visa assistance for Qatar residents and international travelers:<br>
• <strong>Schengen Visas (29 European Countries):</strong> France, Germany, Switzerland, Italy, Spain, and Nordic states.<br>
• <strong>United States (B1/B2) & Canada Visitor Visas:</strong> Long-term multi-entry tourist and business visitor visas.<br>
• <strong>United Kingdom Standard Visitor:</strong> 6-month, 2-year, 5-year, and 10-year multi-entry visitor visas.<br>
• <strong>Services Included:</strong> Itinerary curation, verified hotel/flight proofing, consular interview preparation, and appointment booking in Doha.`,
      cta: { text: 'Book Visit Visa Consultation', action: 'whatsapp', topic: 'Tourist & Visit Visa Inquiry' }
    },

    // 5. Family Sponsorship & Reunification
    {
      keywords: ['family', 'spouse', 'husband', 'wife', 'child', 'children', 'parent', 'parents', 'sponsorship', 'reunification', 'dependent'],
      response: `<strong>👨‍👩‍👧 Family Sponsorship & Global Reunification:</strong><br><br>
Azalea provides compassionate, legally rigorous representation for family reunification:<br>
• <strong>Spousal Sponsorship:</strong> Reconnect with your partner in Canada, UK, Australia, EU, or the Gulf with full open work permit rights.<br>
• <strong>Dependent Children Visas:</strong> Statutory petitions for minor children to secure resident status alongside parents.<br>
• <strong>Parents & Grandparents Super Visas:</strong> Multi-entry long-term visiting and permanent residency sponsorship petitions.<br><br>
All applications include thorough proof-of-ties auditing to eliminate refusal risks.`,
      cta: { text: 'Assess Family Case', action: 'whatsapp', topic: 'Family Sponsorship' }
    },

    // 6. Document Attestation & Legalization
    {
      keywords: ['attestation', 'legalization', 'mofa', 'apostille', 'translation', 'notary', 'certificate', 'degree'],
      response: `<strong>📜 Document Attestation & Legalization Services:</strong><br><br>
Complete consular stamping and verification desk based in Doha, Qatar:<br>
• <strong>Ministry of Foreign Affairs (MOFA):</strong> Official Qatar MOFA document authentication.<br>
• <strong>Embassy & Consular Stamping:</strong> Educational degrees, marriage certificates, birth certificates, and police clearances.<br>
• <strong>Apostille Certification:</strong> International verification for Hague Convention signatory nations.<br>
• <strong>Certified Legal Translation:</strong> English, Arabic, French, German, and Spanish certified translations recognized by sovereign authorities.`,
      cta: { text: 'Attestation Inquiry', action: 'whatsapp', topic: 'Document Attestation Services' }
    },

    // 7. Free Visa Eligibility Assessment
    {
      keywords: ['eligibility', 'eligible', 'check', 'assessment', 'points', 'score', 'calculator', 'evaluate', 'form'],
      response: `<strong>⚡ Official Free Visa Eligibility Assessment:</strong><br><br>
You can calculate your preliminary qualification score and legal pathway in under 5 minutes right on our website:<br>
• <strong>Step 1:</strong> Select your target destination, category, and educational background.<br>
• <strong>Step 2:</strong> Enter your contact details to receive an instant match score and custom document checklist.<br>
• <strong>Direct Review:</strong> Your file is assigned to a Doha-based legal advisor for immediate follow-up.`,
      cta: { text: 'Start Free Assessment Now', action: 'eligibility', country: 'Canada' }
    },

    // 8. Location, Office, and Working Hours
    {
      keywords: ['location', 'office', 'where', 'address', 'doha', 'buzwair', 'mansoura', 'map', 'directions', 'hours', 'timing', 'timings', 'open', 'time', 'saturday'],
      response: `<strong>📍 Azalea Head Office Location & Hours in Doha:</strong><br><br>
• <strong>Headquarters:</strong> Buzwair Building, Al Mansoura, Doha, Qatar.<br>
• <strong>Consultation Hours:</strong> Monday – Saturday: 11:00 AM – 7:00 PM.<br>
• <strong>Friday:</strong> Closed (Weekly Holiday).<br>
• <strong>Direct Advisory Hotline:</strong> <a href="tel:+97451019991" class="fw-bold text-primary">+974 5101 9991</a><br>
• <strong>Official WhatsApp:</strong> <a href="https://wa.me/97451019991" target="_blank" class="fw-bold text-success">+974 5101 9991</a><br>
• <strong>Official Email:</strong> <a href="mailto:Info@azaleagroupqa.com" class="fw-bold text-primary">Info@azaleagroupqa.com</a><br><br>
Walk-ins are warmly welcome, or you can book an appointment in advance via WhatsApp!`,
      cta: { text: 'Open in Google Maps', action: 'link', url: 'https://maps.google.com/?q=Buzwair+Building,+Al+Mansoura,+Doha,+Qatar' }
    },

    // 9. Fee Structure & Transparent Pricing
    {
      keywords: ['fee', 'fees', 'cost', 'price', 'pricing', 'charge', 'charges', 'how much'],
      response: `<strong>💼 Transparent Fee Structure & Retainers:</strong><br><br>
Azalea operates under strict professional ethics with zero hidden fees:<br>
• <strong>Preliminary Assessment:</strong> 100% Free online profile audit and eligibility scoring.<br>
• <strong>Milestone-Based Retainers:</strong> You only pay staged fees tied to verifiable legal milestones (Document Review, Lodgement, Visa Grant).<br>
• <strong>Direct Government Fees:</strong> Disclosed upfront with official sovereign embassy receipts provided.<br><br>
Would you like a tailored quote for your preferred destination?`,
      cta: { text: 'Request Fee Estimate', action: 'whatsapp', topic: 'Fee Inquiry' }
    },

    // 10. Previous Visa Refusal Recovery & GCMS Audits
    {
      keywords: ['refusal', 'refused', 'reject', 'rejected', 'gcms', 'appeal', 'recovery'],
      response: `<strong>🛡️ Previous Visa Refusal Defense & GCMS Audits:</strong><br><br>
A prior rejection does not mean the end of your relocation goals. Azalea specializes in complex case recoveries:<br>
• <strong>GCMS Notes Extraction:</strong> Retrieve the case officer's exact internal notes from IRCC (Canada) or Home Office (UK).<br>
• <strong>Deficiency Remediation:</strong> Fix underlying ties, financial proofs, or documentation gaps.<br>
• <strong>Legal Re-Lodgement:</strong> Submit fresh petitions accompanied by a comprehensive legal submission brief from our counsel.`,
      cta: { text: 'Review Refusal Case', action: 'whatsapp', topic: 'Visa Refusal Appeal' }
    },

    // 11. Social Media Links
    {
      keywords: ['instagram', 'facebook', 'social', 'socials', 'insta', 'fb', 'follow'],
      response: `<strong>🌐 Follow Azalea on Social Media:</strong><br><br>
Stay updated with latest visa policy announcements, draw scores, and client milestones:<br>
• <strong>Instagram:</strong> <a href="https://www.instagram.com/azaleaconsultancyservices?srtk=MXBndWFyMzY3aHJvcA==" target="_blank" rel="noopener noreferrer" class="fw-bold text-primary">@azaleaconsultancyservices</a><br>
• <strong>Facebook:</strong> <a href="https://www.facebook.com/share/1Cio3toiWn/" target="_blank" rel="noopener noreferrer" class="fw-bold text-primary">Azalea Consultancy Services</a><br>
• <strong>WhatsApp:</strong> <a href="https://wa.me/97451019991" target="_blank" class="fw-bold text-success">+974 5101 9991</a>`,
      cta: { text: 'Open Official Instagram', action: 'link', url: 'https://www.instagram.com/azaleaconsultancyservices?srtk=MXBndWFyMzY3aHJvcA==' }
    },

    // 12. Country Specific Visa Details
    {
      keywords: ['canada'],
      response: `<strong>🇨🇦 Canada Visa & Relocation Pathways:</strong><br><br>
Azalea provides expert guidance for Canadian settlement:<br>
• <strong>Express Entry (FSW & CEC):</strong> Category draws for STEM, Healthcare, and Trades with CRS score optimization.<br>
• <strong>Provincial Nominee Programs (PNP):</strong> Ontario (OINP), British Columbia (BC PNP), and Alberta (AAIP).<br>
• <strong>LMIA Work Permits:</strong> Employer sponsorship and intra-company executive transfers.<br>
• <strong>Benefits:</strong> Direct PR, free universal healthcare, and Canadian passport eligibility.`,
      cta: { text: 'Check Canada Eligibility', action: 'eligibility', country: 'Canada' }
    },
    {
      keywords: ['germany'],
      response: `<strong>🇩🇪 Germany Opportunity Card (Chancenkarte) & EU Blue Card:</strong><br><br>
Germany offers fast-track pathways for international professionals:<br>
• <strong>Opportunity Card:</strong> Points-based job seeker visa requiring 6 points across qualifications, experience, and age.<br>
• <strong>EU Blue Card:</strong> Fast-track residence for specialists with an accredited degree and qualifying job contract.<br>
• <strong>Benefits:</strong> 29-nation Schengen travel and permanent settlement in as little as 21–27 months.`,
      cta: { text: 'Check Germany Eligibility', action: 'eligibility', country: 'Germany' }
    },
    {
      keywords: ['australia'],
      response: `<strong>🇦🇺 Australia General Skilled Migration (GSM):</strong><br><br>
We guide applicants through Australia's points-tested skilled streams:<br>
• <strong>Subclass 189 & 190:</strong> Direct Permanent Residency with state nomination pathways.<br>
• <strong>Subclass 491:</strong> Regional provisional visa leading to permanent residence.<br>
• <strong>Skills Assessment:</strong> Expert petition drafting for ACS (IT), VETASSESS, and Engineers Australia.`,
      cta: { text: 'Check Australia Eligibility', action: 'eligibility', country: 'Australia' }
    },
    {
      keywords: ['uk', 'united kingdom', 'london'],
      response: `<strong>🇬🇧 United Kingdom Skilled Worker & Business Visas:</strong><br><br>
Statutory petition drafting and Home Office filing support:<br>
• <strong>Skilled Worker Visa:</strong> Requires a valid Certificate of Sponsorship (CoS) and qualifying salary.<br>
• <strong>UK Expansion Worker:</strong> Setting up a UK branch with senior executive transfers.<br>
• <strong>Settlement (ILR):</strong> Route to Indefinite Leave to Remain and British citizenship in 5 years.`,
      cta: { text: 'Check UK Eligibility', action: 'eligibility', country: 'United Kingdom' }
    },
    {
      keywords: ['usa', 'united states', 'america'],
      response: `<strong>🇺🇸 United States Employment & Investor Pathways:</strong><br><br>
Our US legal counsel supports professionals and investors:<br>
• <strong>EB-2 National Interest Waiver (NIW):</strong> Self-petitioned Green Card for advanced degree holders without employer sponsorship.<br>
• <strong>EB-5 Investor Visa:</strong> Permanent Green Card via qualifying TEA enterprise investments.<br>
• <strong>L-1 Intra-Company:</strong> Executive and managerial transfers from Gulf companies to US offices.`,
      cta: { text: 'Check US Eligibility', action: 'eligibility', country: 'United States' }
    },
    {
      keywords: ['uae', 'dubai'],
      response: `<strong>🇦🇪 UAE 10-Year Golden Visa & Green Visa:</strong><br><br>
Long-term residency in Dubai & UAE with 0% personal income tax:<br>
• <strong>Real Estate Investors:</strong> 10-Year Golden Visa for properties valued at AED 2M+.<br>
• <strong>Executives & Specialists:</strong> Senior professionals with basic salary of AED 30,000+.<br>
• <strong>Entrepreneurs:</strong> Certified startup owners and accredited innovators.<br>
• <strong>Benefits:</strong> 100% corporate ownership and sponsor spouse/children with no age limits.`,
      cta: { text: 'Check UAE Eligibility', action: 'eligibility', country: 'UAE & Dubai' }
    },

    // 13. General Greetings & Help
    {
      keywords: ['hello', 'hi', 'hey', 'salam', 'assalam', 'morning', 'evening', 'help', 'start'],
      response: `👋 Hello and welcome to Azalea Tourism & Consultancy!<br><br>
I am your 24/7 AI Visa & Relocation Advisor. Whether you are looking for Work Permits, Permanent Residency, Golden Visas, or Family Sponsorship, our legal desk in Doha is here to guide you.<br><br>
How may I assist you today? Please choose a service option below or type your question.`,
      cta: { text: 'Explore All Destinations', action: 'link', url: 'our-countries.html' }
    }
  ];

  function getBotResponse(userText) {
    const clean = userText.toLowerCase().trim();
    for (let item of KNOWLEDGE_BASE) {
      for (let kw of item.keywords) {
        if (clean.includes(kw)) {
          return item;
        }
      }
    }
    // Default Fallback Response
    return {
      response: `Thank you for your inquiry regarding <strong>"${escapeHtml(userText)}"</strong>.<br><br>
To provide you with the most accurate advice tailored to your nationality, work experience, and preferred destination, our senior legal advisors in Doha can review your profile directly on WhatsApp.`,
      cta: { text: 'Chat With Doha Legal Advisor', action: 'whatsapp', topic: userText }
    };
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Create & Inject Chatbot HTML
  function injectChatbot() {
    if (document.getElementById('azaleaChatbotWidget')) return;

    const botHtml = `
      <div id="azaleaChatbotWidget" class="azalea-chatbot-wrap">
        <!-- Floating Chat Trigger Button -->
        <button id="azaleaChatTrigger" class="azalea-chat-toggle-btn" aria-label="Open AI Visa Advisor" title="Chat with Azalea AI">
          <div class="chat-icon-avatar">
            <i class="fa-solid fa-comments chat-icon-open"></i>
            <i class="fa-solid fa-xmark chat-icon-close"></i>
          </div>
          <span class="chat-toggle-label">
            <span class="chat-online-dot"></span>
            Chat with AI Advisor
          </span>
          <span class="chat-unread-badge" id="chatUnreadBadge">1</span>
        </button>

        <!-- Chat Window Panel -->
        <div id="azaleaChatWindow" class="azalea-chat-window" style="display: none;">
          <!-- Chat Header -->
          <div class="azalea-chat-header">
            <div class="d-flex align-items-center gap-3">
              <div class="chat-bot-avatar">
                <img src="images/azalea-mark-trimmed.png" alt="Azalea AI">
                <span class="bot-online-indicator"></span>
              </div>
              <div class="chat-header-info">
                <h6 class="mb-0 text-white fw-bold">Azalea AI Legal Advisor</h6>
                <span class="text-white-50 small d-block" style="font-size: 11px;">Official Visa &amp; Relocation Intelligence &bull; Doha HQ</span>
              </div>
            </div>
            <div class="chat-header-actions d-flex align-items-center gap-2">
              <a href="https://wa.me/97451019991" target="_blank" class="chat-action-btn" title="Direct WhatsApp Line" style="color: #22c55e;">
                <i class="fa-brands fa-whatsapp fs-5"></i>
              </a>
              <button id="azaleaChatCloseBtn" class="chat-action-btn" title="Close Chat">
                <i class="fa-solid fa-xmark fs-6"></i>
              </button>
            </div>
          </div>

          <!-- Chat Messages Body -->
          <div id="azaleaChatMessages" class="azalea-chat-messages">
            <!-- Welcome message -->
            <div class="chat-msg bot-msg">
              <div class="msg-bubble">
                <p class="mb-2"><strong>👋 Hello! Welcome to Azalea Tourism &amp; Consultancy.</strong></p>
                <p class="mb-0">I am your 24/7 AI Legal Advisor. How can I assist your visa or relocation journey today? Select a service below or type your question:</p>
              </div>
              <span class="msg-time">Just now</span>
            </div>

            <!-- Quick Action Chips (Services Options & Related Questions) -->
            <div class="chat-quick-chips">
              <span class="quick-chip" data-msg="What work permits and employment visa services do you offer?"><i class="fa-solid fa-briefcase text-primary me-1"></i> Work Permits</span>
              <span class="quick-chip" data-msg="How can I apply for Permanent Residency and settlement abroad?"><i class="fa-solid fa-house-chimney text-primary me-1"></i> Permanent Residency</span>
              <span class="quick-chip" data-msg="Tell me about Golden Visa and investor residency programs"><i class="fa-solid fa-crown text-warning me-1"></i> Golden Visas</span>
              <span class="quick-chip" data-msg="Can you help me get a tourist or business visit visa?"><i class="fa-solid fa-plane-departure text-info me-1"></i> Tourist Visas</span>
              <span class="quick-chip" data-msg="How does family sponsorship and spousal reunification work?"><i class="fa-solid fa-people-roof text-success me-1"></i> Family Sponsorship</span>
              <span class="quick-chip" data-msg="Do you provide document attestation, translation, and embassy legalization?"><i class="fa-solid fa-stamp text-secondary me-1"></i> Document Attestation</span>
              <span class="quick-chip" data-msg="How can I check my visa eligibility and points?"><i class="fa-solid fa-clipboard-check text-success me-1"></i> Check Free Eligibility</span>
              <span class="quick-chip" data-msg="Where is your Doha office located and what are your working hours?"><i class="fa-solid fa-location-dot text-danger me-1"></i> Doha Office &amp; Hours</span>
              <span class="quick-chip" data-msg="Can you help recover a previously rejected or refused visa application?"><i class="fa-solid fa-shield-halved text-warning me-1"></i> Refusal Recovery</span>
              <span class="quick-chip" data-msg="What is your fee structure and pricing for visa services?"><i class="fa-solid fa-receipt text-primary me-1"></i> Fees &amp; Pricing</span>
              <span class="quick-chip" data-msg="How do I connect directly with a consultant on WhatsApp?"><i class="fa-brands fa-whatsapp text-success me-1"></i> WhatsApp Support</span>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div id="chatTypingIndicator" class="chat-typing-indicator" style="display: none;">
            <div class="typing-bubble">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
            <span class="typing-text">Azalea AI is typing...</span>
          </div>

          <!-- Chat Input Footer -->
          <div class="azalea-chat-footer">
            <form id="azaleaChatForm" class="d-flex align-items-center gap-2 m-0 p-0">
              <input type="text" id="azaleaChatInput" class="form-control azalea-chat-input" placeholder="Ask about work permits, PR, fees, requirements..." autocomplete="off" required>
              <button type="submit" class="btn btn-primary azalea-chat-send-btn" title="Send Question">
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </form>
            <div class="chat-footer-brand text-center mt-2">
              <span class="text-muted" style="font-size: 10.5px;">
                <i class="fa-solid fa-shield-halved text-primary me-1"></i> Certified Legal Guidance &bull; Buzwair Bldg, Doha
              </span>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', botHtml);
    setupChatbotEvents();
  }

  function setupChatbotEvents() {
    const triggerBtn = document.getElementById('azaleaChatTrigger');
    const chatWin = document.getElementById('azaleaChatWindow');
    const closeBtn = document.getElementById('azaleaChatCloseBtn');
    const chatForm = document.getElementById('azaleaChatForm');
    const chatInput = document.getElementById('azaleaChatInput');
    const unreadBadge = document.getElementById('chatUnreadBadge');

    function toggleChat() {
      const isVisible = chatWin.style.display !== 'none';
      if (isVisible) {
        chatWin.style.display = 'none';
        triggerBtn.classList.remove('is-active');
      } else {
        chatWin.style.display = 'flex';
        triggerBtn.classList.add('is-active');
        if (unreadBadge) unreadBadge.style.display = 'none';
        chatInput.focus();
        scrollToBottom();
      }
    }

    if (triggerBtn) {
      triggerBtn.addEventListener('click', toggleChat);
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        chatWin.style.display = 'none';
        triggerBtn.classList.remove('is-active');
      });
    }

    // Quick chips delegation
    document.addEventListener('click', function (e) {
      const chip = e.target.closest('.quick-chip');
      if (chip) {
        const text = chip.getAttribute('data-msg');
        if (text) {
          submitUserMessage(text);
        }
      }

      // Handle CTA buttons inside messages
      const ctaBtn = e.target.closest('.chat-cta-btn');
      if (ctaBtn) {
        const action = ctaBtn.getAttribute('data-action');
        if (action === 'eligibility') {
          const country = ctaBtn.getAttribute('data-country') || 'Canada';
          const modalEl = document.getElementById('azaleaEligibilityModal');
          if (modalEl && typeof window.openEligibilityModal === 'function') {
            window.openEligibilityModal(country);
          } else {
            window.location.href = `form.html?country=${encodeURIComponent(country)}`;
          }
        } else if (action === 'whatsapp') {
          const topic = ctaBtn.getAttribute('data-topic') || 'Visa Inquiry';
          const url = `https://wa.me/97451019991?text=${encodeURIComponent('Hello Azalea Legal Desk! I am inquiring about: ' + topic)}`;
          window.open(url, '_blank');
        } else if (action === 'link') {
          const url = ctaBtn.getAttribute('data-url');
          if (url) window.open(url, '_blank');
        }
      }
    });

    if (chatForm) {
      chatForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if (msg) {
          chatInput.value = '';
          submitUserMessage(msg);
        }
      });
    }

    // Show initial unread badge after 2.5s
    setTimeout(() => {
      if (unreadBadge && chatWin.style.display === 'none') {
        unreadBadge.style.display = 'flex';
      }
    }, 2500);
  }

  function submitUserMessage(text) {
    appendMessage(text, 'user-msg');
    showTyping(true);

    setTimeout(() => {
      showTyping(false);
      const answer = getBotResponse(text);
      appendMessage(answer.response, 'bot-msg', answer.cta);
    }, 450);
  }

  function appendMessage(htmlContent, type, cta) {
    const container = document.getElementById('azaleaChatMessages');
    if (!container) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${type}`;

    let ctaHtml = '';
    if (cta) {
      if (cta.action === 'eligibility') {
        ctaHtml = `<div class="mt-2"><button type="button" class="btn btn-sm btn-primary chat-cta-btn" data-action="eligibility" data-country="${escapeHtml(cta.country || '')}"><i class="fa-solid fa-clipboard-check me-1"></i> ${escapeHtml(cta.text)}</button></div>`;
      } else if (cta.action === 'whatsapp') {
        ctaHtml = `<div class="mt-2"><button type="button" class="btn btn-sm btn-success chat-cta-btn" data-action="whatsapp" data-topic="${escapeHtml(cta.topic || '')}"><i class="fa-brands fa-whatsapp me-1"></i> ${escapeHtml(cta.text)}</button></div>`;
      } else if (cta.action === 'link') {
        ctaHtml = `<div class="mt-2"><button type="button" class="btn btn-sm btn-outline-primary chat-cta-btn" data-action="link" data-url="${escapeHtml(cta.url || '')}"><i class="fa-solid fa-arrow-up-right-from-square me-1"></i> ${escapeHtml(cta.text)}</button></div>`;
      }
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    msgDiv.innerHTML = `
      <div class="msg-bubble">
        ${htmlContent}
        ${ctaHtml}
      </div>
      <span class="msg-time">${timeStr}</span>
    `;

    container.appendChild(msgDiv);
    scrollToBottom();
  }

  function showTyping(show) {
    const el = document.getElementById('chatTypingIndicator');
    if (el) {
      el.style.display = show ? 'flex' : 'none';
      if (show) scrollToBottom();
    }
  }

  function scrollToBottom() {
    const container = document.getElementById('azaleaChatMessages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectChatbot);
  } else {
    injectChatbot();
  }
})();
