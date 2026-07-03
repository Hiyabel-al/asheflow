/* ASHEFLOW — AI Copilot widget. Injects its own markup so no page duplicates it.
   Usage: <script src="assets/js/copilot.js" data-context="dashboard"></script> */
(function(){
  'use strict';
  const scriptEl = document.currentScript;
  const context = (scriptEl && scriptEl.getAttribute('data-context')) || 'marketing';
  const LOGO = (scriptEl && scriptEl.getAttribute('data-logo-path')) || 'assets/img/logo-mark.png';

  const REPLIES = {
    marketing: [
      "Pro is $79/mo and includes unlimited AI replies — want me to scroll you to Pricing?",
      "You can start free with no credit card required, then upgrade anytime.",
      "AsheFlow works with OnlyFans, Fansly, and other subscription platforms.",
      "Every AI reply can be reviewed and edited before it sends — you're always in control."
    ],
    dashboard: [
      "You can toggle any automation on or off from the Automation tab.",
      "Head to Settings > Brand Voice to change how your AI sounds.",
      "You can filter Fan CRM by VIP or High Spenders using the chips above the table.",
      "Content Studio can generate captions, hooks, or trend ideas — just describe your post."
    ],
    onboarding: [
      "You can skip the demo booking and go straight to your dashboard if you'd rather explore first.",
      "Your revenue range just helps us recommend a plan — it's never shared.",
      "You can change your AI personality anytime later in Settings.",
      "Almost done! Just a couple more questions and your workspace will be ready."
    ],
    auth: [
      "Forgot your password? Use the link below the sign-in form to reset it securely.",
      "We never store your password in plain text — everything is encrypted.",
      "Having trouble signing in? Email asheflowagency@gmail.com and a real person will help."
    ]
  };
  const greeting = {
    marketing: "Hey! I'm the AsheFlow AI. Ask me about pricing, features, or getting started 👋",
    dashboard: "Hey! I'm the AsheFlow AI. Ask me anything about your dashboard, automations, or settings 👋",
    onboarding: "Stuck on a question? Ask me anything about setup 👋",
    auth: "Need a hand signing in or creating your account? Ask away 👋"
  };

  function markup(){
    return `
<button class="copilot-btn" id="copilotBtn" aria-label="Open AI help">
  <img src="${LOGO}" alt="" /> <span>Need help?</span>
</button>
<div class="copilot-panel" id="copilotPanel" role="dialog" aria-label="AsheFlow AI assistant">
  <div class="copilot-header">
    <div class="who"><img src="${LOGO}" alt="" /><div><div style="font-weight:800;">AsheFlow AI</div><div style="font-size:.72rem;color:var(--text-faint);">Usually replies instantly</div></div></div>
    <button class="copilot-close" id="copilotClose" aria-label="Close">&times;</button>
  </div>
  <div class="copilot-body" id="copilotBody"></div>
  <div class="copilot-input-row">
    <input id="copilotInput" placeholder="Type a message..." aria-label="Message AsheFlow AI" />
    <button id="copilotSend" aria-label="Send">→</button>
  </div>
</div>`;
  }

  function init(){
    const mount = document.createElement('div');
    mount.innerHTML = markup();
    while(mount.firstChild) document.body.appendChild(mount.firstChild);

    const btn = document.getElementById('copilotBtn');
    const panel = document.getElementById('copilotPanel');
    const closeBtn = document.getElementById('copilotClose');
    const body = document.getElementById('copilotBody');
    const input = document.getElementById('copilotInput');
    const sendBtn = document.getElementById('copilotSend');
    const replies = REPLIES[context] || REPLIES.marketing;

    function addMsg(text, who){
      const div = document.createElement('div');
      div.className = 'copilot-msg ' + who;
      div.textContent = text;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }
    function toggle(){
      panel.classList.toggle('open');
      if(panel.classList.contains('open') && !body.dataset.greeted){
        body.dataset.greeted = '1';
        addMsg(greeting[context] || greeting.marketing, 'ai');
      }
    }
    btn.addEventListener('click', toggle);
    closeBtn.addEventListener('click', toggle);

    function send(){
      const text = input.value.trim();
      if(!text) return;
      addMsg(text, 'user');
      input.value = '';
      const typing = document.createElement('div');
      typing.className = 'copilot-msg ai typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      body.appendChild(typing);
      body.scrollTop = body.scrollHeight;
      setTimeout(()=>{
        typing.remove();
        addMsg(replies[Math.floor(Math.random()*replies.length)], 'ai');
      }, 650);
    }
    sendBtn.addEventListener('click', send);
    input.addEventListener('keydown', e=>{ if(e.key==='Enter') send(); });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
