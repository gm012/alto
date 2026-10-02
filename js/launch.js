/* Functional features do not depend on the animation library. */
(() => {
 'use strict';
 const $ = (s,root=document) => root.querySelector(s);
 const $$ = (s,root=document) => [...root.querySelectorAll(s)];
 const menu=$('#menuOverlay'), toggle=$('#menuToggle'), nav=$('#nav');
 let previousFocus;
 function setMenu(open) {
  if(!menu || !toggle) return;
  menu.classList.toggle('active',open); toggle.classList.toggle('active',open);
  toggle.setAttribute('aria-expanded',String(open)); menu.inert=!open;
  menu.setAttribute('aria-hidden',String(!open)); nav?.classList.toggle('menu-open',open);
  document.body.style.overflow=open?'hidden':'';
  $('main')?.toggleAttribute('inert',open); $('footer')?.toggleAttribute('inert',open);
  if(open){ previousFocus=document.activeElement; $('.menu-link',menu)?.focus(); }
  else if(previousFocus){ toggle.focus(); previousFocus=null; }
 }
 // Capture here to supersede the legacy page-specific toggle handlers consistently.
 toggle?.addEventListener('click',e=>{e.stopImmediatePropagation();setMenu(!menu.classList.contains('active'));},true);
 if(menu){ menu.inert=true; menu.setAttribute('aria-hidden','true'); }
 document.addEventListener('keydown',e=>{
  if(!menu?.classList.contains('active')) return;
  if(e.key==='Escape'){e.preventDefault();setMenu(false);}
  if(e.key==='Tab'){
   const controls=[toggle,...$$('a[href],button',menu)]; const i=controls.indexOf(document.activeElement);
   e.preventDefault();controls[(i+(e.shiftKey?-1:1)+controls.length)%controls.length].focus();
  }
 },true);
 $$('a',menu||document.createElement('div')).forEach(a=>a.addEventListener('click',()=>setMenu(false)));
 if(!window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.documentElement.classList.add('no-motion');
  window.ScrollTrigger?.getAll().forEach(t=>t.kill(true));
  window.gsap?.globalTimeline.progress(1).pause();
 }
 // First-party, consent-gated daily totals. No third-party tracker or visitor identifier.
 const KEY='alto-consent-v1', MAX_AGE=180*86400000;
 let choice=null, pageCounted=false;
 try { const v=JSON.parse(localStorage.getItem(KEY)); if(v?.version===1 && Date.now()-v.time<MAX_AGE && typeof v.analytics==='boolean')choice=v; } catch(_){}
 const privacySignal=navigator.globalPrivacyControl===true || navigator.doNotTrack==='1';
 function count(event){
  if(!choice?.analytics || privacySignal) return;
  fetch('api/analytics.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event,path:location.pathname.split('/').pop()||'index.html'}),credentials:'omit',keepalive:true}).catch(()=>{});
 }
 function pageView(){if(!pageCounted && choice?.analytics && !privacySignal){count('page_view');pageCounted=true;}}
 const panel=$('#consentPanel'), settings=$('#consentOptions'), analytics=$('#analyticsChoice');
 function closeConsent(){ panel.hidden=true; if(panel.dataset.reopened==='true')$('[data-cookie-settings]')?.focus(); }
 function saveConsent(allow){
  choice={version:1,analytics:allow&&!privacySignal,time:Date.now()};
  try {localStorage.setItem(KEY,JSON.stringify(choice));}catch(_){}
  closeConsent();pageView();
 }
 if(panel){
  panel.hidden=!!choice;
  if(privacySignal){$('#privacySignal').hidden=false;analytics.disabled=true;}
  $('[data-consent="accept"]').addEventListener('click',()=>saveConsent(true));
  $('[data-consent="reject"]').addEventListener('click',()=>saveConsent(false));
  $('[data-consent="manage"]').addEventListener('click',()=>{settings.hidden=!settings.hidden;analytics.checked=!!choice?.analytics&&!privacySignal;});
  $('[data-consent="save"]').addEventListener('click',()=>saveConsent(analytics.checked));
  $$('[data-cookie-settings]').forEach(b=>b.addEventListener('click',()=>{panel.hidden=false;settings.hidden=false;panel.dataset.reopened='true';analytics.checked=!!choice?.analytics&&!privacySignal;$('#consentTitle').focus();}));
 }
 pageView();
 // Shared handler for both enquiry forms. Preserve fields on any failure.
 $$('form[data-enquiry]').forEach(form=>{
  let token=''; const status=$('.form-status',form), submit=$('button[type="submit"]',form);
  async function getToken(){
   const r=await fetch('api/contact.php',{credentials:'same-origin',cache:'no-store'});
   if(!r.ok)throw Error('Unavailable');const j=await r.json();token=j.token;
  }
  getToken().catch(()=>{});
  form.addEventListener('submit',async e=>{
   e.preventDefault(); if(!form.reportValidity())return;
   const label=submit.innerHTML;submit.disabled=true;submit.textContent='SENDING…';status.textContent='';
   try {
    if(!token)await getToken();
    const values=Object.fromEntries(new FormData(form)); values.token=token;
    const r=await fetch('api/contact.php',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify(values)});
    const data=await r.json();
    if(!r.ok || !data.ok){ if(r.status===403)token='';throw Error(data.message||'Your enquiry could not be sent. Please try again or email info@altostudio.co.za.'); }
    status.dataset.state='success';status.textContent=data.message;form.reset();$$('.contact-form-option',form).forEach(o=>o.classList.remove('active'));count('enquiry_success');token='';getToken().catch(()=>{});
   } catch(err){status.dataset.state='error';status.textContent=err.message==='Unavailable'?'The form is temporarily unavailable. Please email info@altostudio.co.za.':err.message.includes('JSON')||err instanceof TypeError?'The form is temporarily unavailable. Please email info@altostudio.co.za.':err.message;}
   finally{submit.disabled=false;submit.innerHTML=label;status.focus();}
  });
  if(new URLSearchParams(location.search).get('interest')==='cova'){
   const message=$('[name="message"]',form);if(message&&!message.value)message.value='I would like to discuss COVA and its planned expense workflow.\n\n';
   const radio=$('input[value="application"]',form);if(radio){radio.checked=true;radio.closest('label')?.classList.add('active');}
  }
 });
 // Start videos only near the viewport, and respect reduced motion / data saving.
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches||navigator.connection?.saveData;
 $$('video[data-lazy-video]').forEach(video=>{
  const button=document.createElement('button');button.className='media-controls';button.textContent='Play background video';button.type='button';video.after(button);
  let manualPause=!!reduced;
  function load(){ $$('source[data-src]',video).forEach(s=>{s.src=s.dataset.src;delete s.dataset.src;});if(!video.dataset.loaded){video.load();video.dataset.loaded='true';}}
  button.addEventListener('click',()=>{load();if(video.paused){manualPause=false;video.play().catch(()=>{});}else{manualPause=true;video.pause();}});
  video.addEventListener('play',()=>button.textContent='Pause background video');video.addEventListener('pause',()=>button.textContent='Play background video');
  new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting&&!manualPause){load();video.play().catch(()=>{});}else if(!e.isIntersecting)video.pause();}),{rootMargin:'100px'}).observe(video);
 });
})();
