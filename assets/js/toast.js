/* ASHEFLOW — toast notification system. Usage: AsheToast.show({type,title,body}) */
(function(){
  'use strict';
  function ensureStack(){
    let stack = document.getElementById('toastStack');
    if(!stack){
      stack = document.createElement('div');
      stack.id = 'toastStack';
      document.body.appendChild(stack);
    }
    return stack;
  }
  const icons = { success:'✓', error:'✕', warning:'!', info:'✨' };

  function show(opts){
    opts = opts || {};
    const type = opts.type || 'info';
    const stack = ensureStack();
    const el = document.createElement('div');
    el.className = 'toast ' + type;
    el.innerHTML = `<span class="toast-ic">${icons[type]||icons.info}</span><div class="toast-body">${opts.title ? `<b>${opts.title}</b>` : ''}${opts.body ? `<span>${opts.body}</span>` : ''}</div><button class="toast-close" aria-label="Dismiss">&times;</button>`;
    stack.appendChild(el);
    const remove = ()=>{
      el.classList.add('leaving');
      setTimeout(()=>el.remove(), 220);
    };
    el.querySelector('.toast-close').addEventListener('click', remove);
    setTimeout(remove, opts.duration || 4200);
    return el;
  }

  window.AsheToast = { show };
})();
