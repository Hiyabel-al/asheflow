/* ASHEFLOW — shared auth page behavior: password toggles, validation, social placeholders */
(function(){
  'use strict';

  function initPasswordToggles(){
    document.querySelectorAll('[data-toggle-password]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const input = document.getElementById(btn.getAttribute('data-toggle-password'));
        if(!input) return;
        const showing = input.type === 'text';
        input.type = showing ? 'password' : 'text';
        btn.textContent = showing ? 'Show' : 'Hide';
      });
    });
  }

  function initSocialPlaceholders(){
    document.querySelectorAll('.btn-social').forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        e.preventDefault();
        if(window.AsheToast) window.AsheToast.show({type:'info', title:'Coming soon', body:btn.textContent.trim() + ' sign-in isn\'t connected yet.'});
      });
    });
  }

  function setFieldError(fieldEl, message){
    fieldEl.classList.toggle('has-error', !!message);
    const err = fieldEl.querySelector('.field-error');
    if(err){
      err.textContent = message || '';
      err.classList.toggle('show', !!message);
    }
  }

  function scorePassword(pw){
    let score = 0;
    if(pw.length >= 8) score++;
    if(/[A-Z]/.test(pw)) score++;
    if(/[0-9]/.test(pw)) score++;
    if(/[^A-Za-z0-9]/.test(pw)) score++;
    return score; // 0-4
  }

  function initPasswordStrength(){
    const input = document.getElementById('signupPassword');
    const meter = document.getElementById('passwordStrength');
    const label = document.getElementById('passwordStrengthLabel');
    if(!input || !meter) return;
    const bars = meter.querySelectorAll('div');
    const labels = ['Too weak', 'Weak', 'Okay', 'Good', 'Strong'];
    const colors = ['var(--red)', 'var(--red)', 'var(--amber)', 'var(--cyan)', 'var(--violet)'];
    input.addEventListener('input', ()=>{
      const score = input.value ? scorePassword(input.value) : 0;
      bars.forEach((b,i)=>{ b.style.background = i < score ? colors[score] : 'var(--line)'; });
      label.textContent = input.value ? labels[score] : '';
    });
  }

  window.AsheAuth = { initPasswordToggles, initSocialPlaceholders, setFieldError, initPasswordStrength, validEmail: (v)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v||'').trim()) };

  document.addEventListener('DOMContentLoaded', function(){
    initPasswordToggles();
    initSocialPlaceholders();
    initPasswordStrength();
  });
})();
