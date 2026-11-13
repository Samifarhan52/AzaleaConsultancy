/**
 * Azalea Tourism & Consultancy - 24/7 AI Immigration & Visa Chatbot
 * Official Doha Legal Advisory Widget
 */
(function () {
  'use strict';

  const KNOWLEDGE_BASE = [
    {
      keywords: ['canada', 'express entry', 'crs', 'pnp', 'ontario', 'alberta', 'british columbia', 'fsw', 'cec'],
      response: `<strong>🇨🇦 Canada Immigration Advisory:</strong><br><br>
Azalea specializes in Canadian Permanent Residency and Work Permits:<br>
• <strong>Express Entry (FSW & CEC):</strong> Category-based draws (STEM, Healthcare, Trades) and CRS score optimization.<br>
• <strong>Provincial Nominee Programs (PNP):</strong> Ontario (OINP), British Columbia (BC PNP), and Alberta (AAIP).<br>
• <strong>Benefits:</strong> Direct PR grant, free universal healthcare, and Canadian passport eligibility within 3 years.<br><br>
Would you like our Doha legal desk to evaluate your CRS score?`,
      cta: { text: 'Check Canada Eligibility', action: 'eligibility', country: 'Canada' }
    },
    {
      keywords: ['germany', 'chancenkarte', 'opportunity card', 'blue card', 'berlin', 'munich', 'frankfurt', 'german'],
      response: `<strong>🇩🇪 Germany Opportunity Card (Chancenkarte) & EU Blue Card:</strong><br><br>
Germany is actively recruiting skilled professionals under the 2026 points matrix:<br>
• <strong>Opportunity Card:</strong> Requires 6 points across qualifications, language (German/English), age, and experience.<br>
• <strong>EU Blue Card:</strong> Fast-track residence for specialists with an accredited degree and qualifying job offer.<br>
• <strong>Benefits:</strong> 29-nation Schengen travel, full work rights, and permanent settlement in as little as 21–27 months.<br><br>
Azalea assists with ZAB degree equivalence, blocked account (Sperrkonto) setup, and embassy visa stamping in Doha.`,
      cta: { text: 'Check Germany Eligibility', action: 'eligibility', country: 'Germany' }
    },
    {
      keywords: ['australia', 'gsm', '189', '190', '491', 'vetassess', 'acs', 'sydney', 'melbourne', 'tss', '482'],
      response: `<strong>🇦🇺 Australia General Skilled Migration (GSM):</strong><br><br>
Azalea guides applicants through Australia's points-tested skilled streams:<br>
• <strong>Subclass 189 & 190:</strong> Direct Permanent Residency with state nomination opportunities.<br>
• <strong>Subclass 491:</strong> Regional provisional visa leading to permanent residence.<br>
• <strong>Skills Assessment:</strong> Expert petition drafting for ACS (IT), VETASSESS, and Engineers Australia.<br>
• <strong>Employer Sponsored (TSS 482):</strong> Fast-track corporate nomination for in-demand roles.`,
      cta: { text: 'Check Australia Eligibility', action: 'eligibility', country: 'Australia' }
    },
    {
      keywords: ['uk', 'united kingdom', 'london', 'skilled worker', 'cos', 'ilr', 'home office'],
      response: `<strong>🇬🇧 United Kingdom Skilled Worker & Business Visas:</strong><br><br>
We provide statutory petition drafting and Home Office filing support:<br>
• <strong>Skilled Worker Visa:</strong> Requires a valid Certificate of Sponsorship (CoS) and minimum salary threshold compliance.<br>
• <strong>UK Expansion Worker:</strong> Setting up a UK branch for international firms with senior executive transfers.<br>
• <strong>Settlement (ILR):</strong> Direct route to Indefinite Leave to Remain and British citizenship in 5 years.`,
      cta: { text: 'Check UK Eligibility', action: 'eligibility', country: 'United Kingdom' }
    },
    {
      keywords: ['usa', 'united states', 'america', 'eb-2', 'niw', 'eb-5', 'green card', 'l-1'],
      response: `<strong>🇺🇸 United States Employment & Investor Pathways:</strong><br><br>
Our US legal partners support high-demand professionals and investors:<br>
• <strong>EB-2 National Interest Waiver (NIW):</strong> Self-petitioned Green Card for advanced degree holders and exceptional ability candidates without employer sponsorship.<br>
• <strong>EB-5 Immigrant Investor:</strong> Permanent Green Card via TEA qualifying enterprise investments.<br>
• <strong>L-1 Intra-Company:</strong> Executive and managerial transfers from Gulf companies to US offices.`,
      cta: { text: 'Check US Eligibility', action: 'eligibility', country: 'United States' }
    },
    {
      keywords: ['uae', 'dubai', 'golden visa', 'abu dhabi', 'emirates', 'gulf'],
      response: `<strong>🇦🇪 UAE 10-Year Golden Visa & Green Visa:</strong><br><br>
Secure long-term residency in Dubai & UAE with 0% personal income tax:<br>
• <strong>Real Estate Investors:</strong> 10-Year Golden Visa for properties valued at AED 2M+.<br>
• <strong>Executives & Specialists:</strong> Senior professionals with basic salary of AED 30,000+.<br>
• <strong>Entrepreneurs:</strong> Certified startup owners and accredited innovators.<br>
• <strong>Benefits:</strong> 100% corporate ownership, sponsor spouse & children with no age limits, and zero mandatory stay duration.`,
      cta: { text: 'Check UAE Eligibility', action: 'eligibility', country: 'UAE & Dubai' }
    },
    {
      keywords: ['family', 'spouse', 'husband', 'wife', 'child', 'children', 'parent', 'parents', 'sponsorship', 'reunification', 'dependent'],
      response: `<strong>👨‍👩‍👦 Family Sponsorship & Global Reunification:</strong><br><br>
Azalea provides compassionate, legally rigorous representation for family reunification:<br>
• <strong>Spousal Sponsorship:</strong> Reconnect with your partner in Canada, UK, Australia, EU, or the Gulf with full work permit rights.<br>
• <strong>Dependent Children Visas:</strong> Statutory petitions for minor children to secure resident status alongside parents.<br>
• <strong>Parents & Grandparents Super Visas:</strong> Multi-entry long-term visiting and permanent residency sponsorship petitions.<br><br>
All applications include thorough proof-of-ties auditing to eliminate refusal risks.`,
      cta: { text: 'Assess Family Sponsorship', action: 'whatsapp', topic: 'Family Sponsorship' }
    },
    {
      keywords: ['location', 'office', 'where', 'address', 'doha', 'buzwair', 'mansoura', 'map', 'directions'],
      response: `<strong>📍 Azalea Head Office Location in Doha:</strong><br><br>
• <strong>Headquarters:</strong> Buzwair Building, Al Mansoura, Doha, Qatar.<br>
• <strong>Consultation Hours:</strong> Monday – Saturday: 11:00 AM – 7:00 PM (Friday Closed).<br>
• <strong>Direct Phone:</strong> +974 5101 9991<br>
• <strong>Email:</strong> Info@azaleagroupqa.com<br><br>
Walk-ins are welcome, or you can book an appointment in advance via WhatsApp!`,
      cta: { text: 'Open in Google Maps', action: 'link', url: 'https://maps.google.com/?q=Buzwair+Building,+Al+Mansoura,+Doha,+Qatar' }
    },
    {
      keywords: ['phone', 'contact', 'call', 'number', 'email', 'whatsapp', 'reach', 'mobile'],
      response: `<strong>📞 Official Azalea Contact Desk:</strong><br><br>
• <strong>Advisory Hotline:</strong> <a href="tel:+97451019991" class="fw-bold text-primary">+974 5101 9991</a><br>
• <strong>Official WhatsApp:</strong> <a href="https://wa.me/97451019991" target="_blank" class="fw-bold text-success">+974 5101 9991</a><br>
• <strong>Official Email:</strong> <a href="mailto:Info@azaleagroupqa.com" class="fw-bold text-primary">Info@azaleagroupqa.com</a><br>
• <strong>Headquarters:</strong> Buzwair Building, Al Mansoura, Doha, Qatar.`,
      cta: { text: 'Connect on WhatsApp Now', action: 'whatsapp', topic: 'Direct Inquiry' }
    },
    {
      keywords: ['instagram', 'facebook', 'social', 'page', 'socials', 'insta', 'fb', 'follow'],
      response: `<strong>🌐 Follow Azalea on Social Media:</strong><br><br>
Stay updated with latest visa draws, immigration rules, and client success milestones:<br>
• <strong>Instagram:</strong> <a href="https://www.instagram.com/azaleaconsultancyservices?srtk=MXBndWFyMzY3aHJvcA==" target="_blank" rel="noopener noreferrer" class="fw-bold text-primary">@azaleaconsultancyservices</a><br>
• <strong>Facebook:</strong> <a href="https://www.facebook.com/share/1Cio3toiWn/" target="_blank" rel="noopener noreferrer" class="fw-bold text-primary">Azalea Consultancy Services</a><br>
• <strong>WhatsApp:</strong> <a href="https://wa.me/97451019991" target="_blank" class="fw-bold text-success">+974 5101 9991</a>`,
      cta: { text: 'Open Official Instagram', action: 'link', url: 'https://www.instagram.com/azaleaconsultancyservices?srtk=MXBndWFyMzY3aHJvcA==' }
    },
    {
      keywords: ['hours', 'timing', 'timings', 'open', 'time', 'sunday', 'saturday'],
      response: `<strong>🕒 Consultation & Working Hours:</strong><br><br>
• <strong>Monday – Saturday:</strong> 11:00 AM – 7:00 PM<br>
• <strong>Friday:</strong> Closed (Weekly Holiday)<br><br>
Our WhatsApp legal advisory desk operates 24/7 for urgent profile audits and international queries.`,
      cta: { text: 'Chat on WhatsApp', action: 'whatsapp', topic: 'Consultation Booking' }
    },
    {
      keywords: ['fee', 'fees', 'cost', 'price', 'pricing', 'charge', 'charges', 'how much'],
      response: `<strong>💼 Fee Structure & Transparency:</strong><br><br>
Azalea operates under strict professional ethics with zero hidden fees:<br>
• <strong>Preliminary Assessment:</strong> Free 5-minute online profile audit.<br>
• <strong>Milestone-Based Legal Fees:</strong> You only pay staged retainers tied to verifiable statutory milestones (Documentation, Submission, Visa Grant).<br>
• <strong>Direct Government Fees:</strong> Disclosed upfront with official embassy receipts provided.<br><br>
Would you like a custom quote for your relocation category?`,
      cta: { text: 'Request Fee Estimate', action: 'whatsapp', topic: 'Fee Inquiry' }
    },
    {
      keywords: ['refusal', 'refused', 'reject', 'rejected', 'gcms', 'appeal'],
      response: `<strong>🛡️ Previous Visa Refusal Defense & GCMS Audits:</strong><br><br>
A prior rejection does not mean the end of your immigration goals. Azalea specializes in complex case recoveries:<br>
• <strong>GCMS Notes Auditing:</strong> Extract the officer's exact internal case notes from IRCC (Canada) or Home Office (UK).<br>
• <strong>Deficiency Remediation:</strong> Fix underlying ties, asset verification, or misrepresentation issues.<br>
• <strong>Legal Re-Lodgement:</strong> Submit fresh petitions accompanied by an advocate's statutory submission letter.`,
      cta: { text: 'Review Refusal Case', action: 'whatsapp', topic: 'Visa Refusal Appeal' }
    },
    {
      keywords: ['eligibility', 'eligible', 'check', 'assessment', 'points', 'score'],
      response: `<strong>⚡ Free Visa Eligibility Assessment:</strong><br><br>
You can complete our official 2-step assessment in under 5 minutes right on this website!<br>
• Select your target destination and visa category.<br>
• Receive an instant preliminary match score and document checklist.<br>
• Automatically connected with our licensed legal counsel in Doha via WhatsApp.`,
      cta: { text: 'Start Free Assessment Now', action: 'eligibility', country: 'Canada' }
    },
    {
      keywords: ['hello', 'hi', 'hey', 'salam', 'assalam', 'morning', 'evening', 'help', 'start'],
      response: `👋 Hello and welcome to Azalea Tourism & Consultancy!<br><br>
I am your AI Immigration Assistant. Whether you're looking for Permanent Residency, Skilled Work Permits, Golden Visas, or Family Reunification, I can guide you through every statutory stage.<br><br>
How may I assist you today? Feel free to ask about any destination or choose a topic below.`,
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
To give you the most accurate legal advice tailored to your nationality, work experience, and target jurisdiction, our senior immigration attorneys in Doha can review your full background directly on WhatsApp.`,
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
        <button id="azaleaChatTrigger" class="azalea-chat-toggle-btn" aria-label="Open AI Immigration Chatbot" title="Chat with Azalea AI">
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
                <span class="text-white-50 small d-block" style="font-size: 11px;">Official Immigration Intelligence &bull; Doha HQ</span>
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
                <p class="mb-0">I am your 24/7 AI Legal Advisor. How can I assist your global relocation journey today?</p>
              </div>
              <span class="msg-time">Just now</span>
            </div>

            <!-- Quick Action Chips -->
            <div class="chat-quick-chips">
              <span class="quick-chip" data-msg="Tell me about Canada Express Entry & PNP">🇨🇦 Canada PR</span>
              <span class="quick-chip" data-msg="Germany Opportunity Card Chancenkarte">🇩🇪 Germany Chancenkarte</span>
              <span class="quick-chip" data-msg="Australia Skilled Migration 189/190">🇦🇺 Australia GSM</span>
              <span class="quick-chip" data-msg="UAE 10-Year Golden Visa in Dubai">🇦🇪 UAE Golden Visa</span>
              <span class="quick-chip" data-msg="United Kingdom Skilled Worker Visa">🇬🇧 UK Skilled Worker</span>
              <span class="quick-chip" data-msg="Family Sponsorship and Reunification">👨‍👩‍👧 Family Sponsorship</span>
              <span class="quick-chip" data-msg="Where is your Doha office and working hours?">📍 Doha Office &amp; Hours</span>
              <span class="quick-chip" data-msg="What are your fees and pricing?">💼 Legal Fees</span>
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
              <input type="text" id="azaleaChatInput" class="form-control azalea-chat-input" placeholder="Ask about visas, PR, requirements..." autocomplete="off" required>
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
