/* ASHEFLOW — App shell: sidebar + topbar injector shared by every logged-in page.
   Usage:
   <body>
     <div class="app">
       <div id="sidebarRoot"></div>
       <div class="main">
         <div id="topbarRoot"></div>
         <div class="view active">...page content...</div>
       </div>
     </div>
   <script src="assets/js/shell.js"></script>
   <script>AsheShell.mount({ active:'crm', search:true });</script>
*/
(function(){
  'use strict';

  const NAV = [
    {key:'overview',   icon:'📊', label:'Overview',        href:'dashboard.html'},
    {key:'inbox',      icon:'💬', label:'AI Inbox',         href:'ai-inbox.html'},
    {key:'crm',        icon:'👥', label:'Fan CRM',          href:'fans.html'},
    {key:'automation', icon:'⚡', label:'Automation',       href:'automation.html'},
    {key:'studio',     icon:'🎬', label:'Content Studio',   href:'caption-generator.html'},
    {key:'analytics',  icon:'📈', label:'Analytics',        href:'analytics.html'},
    {key:'settings',   icon:'⚙️', label:'Settings',         href:'settings.html'},
  ];

  const SUBNAV = {
    inbox: [
      {label:'Inbox', href:'ai-inbox.html'},
      {label:'Saved Replies', href:'saved-replies.html'},
      {label:'Prompt Library', href:'prompt-library.html'},
    ],
    crm: [
      {label:'All Fans', href:'fans.html'},
      {label:'VIP Fans', href:'vip-fans.html'},
      {label:'High Spenders', href:'high-spenders.html'},
      {label:'Inactive Fans', href:'inactive-fans.html'},
    ],
    automation: [
      {label:'All Automations', href:'automation.html'},
      {label:'Workflow Builder', href:'workflow-builder.html'},
      {label:'Scheduled Messages', href:'scheduled-messages.html'},
      {label:'Follow-ups', href:'followups.html'},
    ],
    studio: [
      {label:'Caption Generator', href:'caption-generator.html'},
      {label:'Hook Generator', href:'hook-generator.html'},
      {label:'Repurposer', href:'repurposer.html'},
      {label:'Trend Finder', href:'trend-finder.html'},
      {label:'Content Calendar', href:'content-calendar.html'},
    ],
    settings: [
      {label:'General', href:'settings.html'},
      {label:'Profile', href:'profile.html'},
      {label:'Brand Voice', href:'brand-voice.html'},
      {label:'AI Personality', href:'ai-personality.html'},
      {label:'Integrations', href:'integrations.html'},
      {label:'Security', href:'security.html'},
      {label:'Billing', href:'billing.html'},
      {label:'Notifications', href:'notifications.html'},
    ],
  };

  const NOTIFICATIONS = [
    {ic:'🔥', text:'<b>Sarah</b> — VIP fan hasn\'t messaged in 2 weeks', t:'12m ago', unread:true},
    {ic:'💰', text:'New $50 tip from <b>Mara J.</b>', t:'1h ago', unread:true},
    {ic:'⚡', text:'Welcome Flow automation sent 12 messages', t:'3h ago', unread:false},
    {ic:'📅', text:'Content Calendar: post scheduled for tomorrow 9am', t:'6h ago', unread:false},
    {ic:'👥', text:'<b>Devon R.</b> just became a High Spender', t:'1d ago', unread:false},
  ];

  function escapeAttr(s){ return String(s).replace(/"/g,'&quot;'); }

  function sidebarHtml(active){
    const items = NAV.map(n=>{
      const isActive = n.key === active;
      return `<a class="nav-item${isActive?' active':''}" href="${n.href}"><span class="ic">${n.icon}</span> ${n.label}</a>`;
    }).join('');
    return `
      <a href="dashboard.html" class="logo"><img src="assets/img/logo-mark.png" alt="" />ASHE<span>FLOW</span></a>
      ${items}
      <div class="sidebar-footer">
        <div class="plan-chip"><span>Plan: <b>Pro ⭐</b></span><a href="billing.html" style="color:var(--text-faint);font-size:.72rem;">Upgrade</a></div>
      </div>
    `;
  }

  function topbarHtml(opts){
    const unreadCount = NOTIFICATIONS.filter(n=>n.unread).length;
    return `
      <div class="topbar-left">
        <button class="hamburger" id="shellHamburger" aria-label="Toggle menu">☰</button>
        ${opts.search === false ? '' : `<input class="search" placeholder="Search fans, messages, automations..." id="shellSearch" />`}
        ${opts.breadcrumb ? `<div class="breadcrumb">${opts.breadcrumb}</div>` : ''}
      </div>
      <div class="topbar-right">
        <div class="dropdown">
          <button class="bell" id="shellBell" aria-label="Notifications">🔔${unreadCount ? '<span class="dot"></span>' : ''}</button>
          <div class="dropdown-panel" id="shellNotifPanel">
            <div class="dropdown-head"><span>Notifications</span><span class="link" id="shellMarkRead">Mark all read</span></div>
            <div class="dropdown-list">
              ${NOTIFICATIONS.map(n=>`<div class="dropdown-item${n.unread?' unread':''}"><span class="ic">${n.ic}</span><div class="body"><p>${n.text}</p><div class="t">${n.t}</div></div></div>`).join('')}
            </div>
          </div>
        </div>
        <div class="dropdown">
          <button class="avatar avatar-sm" id="shellAvatarBtn" aria-label="Profile menu">${opts.initials||'YA'}</button>
          <div class="dropdown-panel profile-menu" id="shellProfilePanel">
            <div class="who"><b id="shellProfileName">Ashe</b><span>Pro Plan</span></div>
            <a href="profile.html">👤 Profile</a>
            <a href="settings.html">⚙️ Settings</a>
            <a href="billing.html">💳 Billing</a>
            <a href="help-center.html">❓ Help Center</a>
            <button id="shellLogout">🚪 Log out</button>
          </div>
        </div>
      </div>
    `;
  }

  function subnavHtml(section, currentHref){
    const items = SUBNAV[section];
    if(!items) return '';
    return `<div class="filter-chips subnav" data-chip-group>${items.map(i=>`<a class="filter-chip${i.href===currentHref?' active':''}" href="${i.href}">${i.label}</a>`).join('')}</div>`;
  }

  function settingsNavHtml(currentHref){
    return SUBNAV.settings.map(i=>`<a class="${i.href===currentHref?'active':''}" href="${i.href}">${i.label}</a>`).join('');
  }

  function wireDropdown(btnId, panelId){
    const btn = document.getElementById(btnId);
    const panel = document.getElementById(panelId);
    if(!btn || !panel) return;
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      const willOpen = !panel.classList.contains('open');
      document.querySelectorAll('.dropdown-panel.open').forEach(p=>p.classList.remove('open'));
      if(willOpen) panel.classList.add('open');
    });
  }

  function mount(opts){
    opts = opts || {};
    const sidebarRoot = document.getElementById('sidebarRoot');
    const topbarRoot = document.getElementById('topbarRoot');
    if(sidebarRoot) sidebarRoot.outerHTML = `<aside class="sidebar" id="appSidebar">${sidebarHtml(opts.active)}</aside>`;
    if(topbarRoot) topbarRoot.outerHTML = `<div class="topbar">${topbarHtml(opts)}</div>`;

    // mobile sidebar toggle
    const sidebar = document.getElementById('appSidebar');
    const hamburger = document.getElementById('shellHamburger');
    if(hamburger && sidebar){
      const backdrop = document.createElement('div');
      backdrop.className = 'sidebar-backdrop';
      backdrop.id = 'sidebarBackdrop';
      document.body.appendChild(backdrop);
      const closeSidebar = ()=>{ sidebar.classList.remove('open'); backdrop.classList.remove('open'); };
      hamburger.addEventListener('click', ()=>{ sidebar.classList.add('open'); backdrop.classList.add('open'); });
      backdrop.addEventListener('click', closeSidebar);
    }

    wireDropdown('shellBell', 'shellNotifPanel');
    wireDropdown('shellAvatarBtn', 'shellProfilePanel');
    document.addEventListener('click', ()=>{ document.querySelectorAll('.dropdown-panel.open').forEach(p=>p.classList.remove('open')); });

    const markRead = document.getElementById('shellMarkRead');
    if(markRead){
      markRead.addEventListener('click', (e)=>{
        e.stopPropagation();
        document.querySelectorAll('#shellNotifPanel .dropdown-item.unread').forEach(i=>i.classList.remove('unread'));
        const dot = document.querySelector('#shellBell .dot');
        if(dot) dot.remove();
        if(window.AsheToast) window.AsheToast.show({type:'success', title:'All caught up'});
      });
    }
    const logout = document.getElementById('shellLogout');
    if(logout){
      logout.addEventListener('click', ()=>{
        if(window.AsheToast) window.AsheToast.show({type:'info', title:'Signed out', body:'Redirecting to login...'});
        setTimeout(()=>{ window.location.href = 'login.html'; }, 700);
      });
    }

    // personalize from onboarding handoff, if present
    try{
      const stored = JSON.parse(localStorage.getItem('asheflow_profile') || 'null');
      const params = new URLSearchParams(window.location.search);
      const name = params.get('name') || (stored && stored.name);
      if(name){
        const initials = name.trim().split(/\s+/).map(w=>w[0]).join('').toUpperCase().slice(0,2) || 'A';
        document.querySelectorAll('.topbar .avatar').forEach(a=>a.textContent = initials);
        const profName = document.getElementById('shellProfileName');
        if(profName) profName.textContent = name;
      }
    }catch(e){}

    if(window.AsheUtils) window.AsheUtils.initChipGroups();
  }

  window.AsheShell = { mount, NAV, SUBNAV, subnavHtml, settingsNavHtml };
})();
