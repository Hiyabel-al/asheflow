/* ASHEFLOW — shared utilities: mouse glow, scroll reveal, counters, FAQ accordion */
(function(){
  'use strict';

  function initMouseGlow(){
    const glow = document.getElementById('mouseGlow');
    if(!glow) return;
    if(window.matchMedia('(hover:hover)').matches){
      document.addEventListener('mousemove', e=>{ glow.style.left = e.clientX+'px'; glow.style.top = e.clientY+'px'; });
    } else {
      glow.style.display='none';
    }
  }

  function initScrollReveal(selector){
    const els = document.querySelectorAll(selector || '.fg-card, .why-card, .testi-card, .price-card, .integration-card, .solution-card, .hiw-step, .trust-card, .stat-cell, .help-cat');
    if(!els.length) return;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.style.animation='fadeUp .6s ease both'; io.unobserve(e.target); } });
    }, {threshold:0.15});
    els.forEach(el=>{ el.style.opacity=0; io.observe(el); });
  }

  function animateCounters(scope){
    const root = scope || document;
    root.querySelectorAll('[data-count]').forEach(el=>{
      const target = parseFloat(el.getAttribute('data-count'));
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = parseInt(el.getAttribute('data-decimals')||'0',10);
      const duration = 1000;
      const start = performance.now();
      function tick(now){
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = target * eased;
        el.textContent = prefix + (decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString()) + suffix;
        if(progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  function initCounterOnView(){
    const targets = document.querySelectorAll('[data-count]');
    if(!targets.length) return;
    const seen = new WeakSet();
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting && !seen.has(e.target)){
          seen.add(e.target);
          animateCounters(e.target.parentElement || document);
        }
      });
    }, {threshold:0.4});
    targets.forEach(t=>io.observe(t));
  }

  function initFaqAccordion(){
    document.querySelectorAll('.faq-item').forEach(item => {
      const q = item.querySelector('.faq-q');
      const a = item.querySelector('.faq-a');
      if(!q || !a) return;
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        item.closest('.faq-list').querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight = null; });
        if(!isOpen){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
      });
    });
  }

  function initChipGroups(){
    document.querySelectorAll('[data-chip-group]').forEach(group=>{
      group.querySelectorAll('.chip, .tone-chip, .filter-chip, .studio-tool').forEach(chip=>{
        chip.addEventListener('click', ()=>{
          if(chip.hasAttribute('data-no-select')) return;
          group.querySelectorAll('.chip, .tone-chip, .filter-chip, .studio-tool').forEach(c=>{ if(!c.hasAttribute('data-no-select')) c.classList.remove('active'); });
          chip.classList.add('active');
        });
      });
    });
  }

  function timeGreeting(){
    const h = new Date().getHours();
    return h<12?'Good morning':h<18?'Good afternoon':'Good evening';
  }

  function validEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v||'').trim()); }

  function copyText(text, btn){
    navigator.clipboard.writeText(text).then(()=>{
      if(btn){
        const orig = btn.textContent;
        btn.textContent = '✓ Copied';
        setTimeout(()=>{ btn.textContent = orig; }, 1400);
      }
      if(window.AsheToast) window.AsheToast.show({type:'success', title:'Copied to clipboard'});
    });
  }

  function initMobileNav(){
    const toggle = document.querySelector('.nav-mobile-toggle');
    const panel = document.querySelector('.nav-mobile-panel');
    if(!toggle || !panel) return;
    toggle.addEventListener('click', ()=>{
      const open = panel.classList.toggle('open');
      toggle.textContent = open ? '✕' : '☰';
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    initMouseGlow();
    initScrollReveal();
    initCounterOnView();
    initFaqAccordion();
    initChipGroups();
    initMobileNav();
  });

  window.AsheUtils = { initMouseGlow, initScrollReveal, animateCounters, initCounterOnView, initFaqAccordion, initChipGroups, timeGreeting, validEmail, copyText, initMobileNav };
})();
