
(() => {
  const sub = location.pathname.includes('/wiki/');
  const base = sub ? '../' : '';
  const config = window.WANDEL_CONFIG || {};
  const navItems = [
    ['index.html','Start'], ['wiki.html','Wiki'], ['handbook.html','Handbuch'],
    ['world.html','Welt'], ['updates.html','Updates'], ['roadmap.html','Roadmap'], ['team.html','Team']
  ];
  const sword = `<svg viewBox="0 0 64 64" aria-hidden="true"><path fill="#d8ad60" d="M31 6h4l2 13 12 3-2 5-10-1v25l-5 7-5-7V26l-10 1-2-5 12-3z"/><path stroke="#f3dfb0" stroke-width="3" stroke-linecap="round" d="M23 18h18"/></svg>`;
  const header = document.querySelector('[data-site-header]');
  if (header) {
    const current = location.pathname.split('/').pop() || 'index.html';
    header.innerHTML = `<header class="site-header"><div class="nav-wrap">
      <a class="brand" href="${base}index.html"><span class="brand-mark">${sword}</span><span class="brand-copy"><strong>WANDEL</strong><span>Medieval Fantasy RPG</span></span></a>
      <button class="menu-toggle" aria-label="Menü öffnen">☰</button>
      <nav class="main-nav">${navItems.map(([u,n])=>`<a href="${base}${u}" class="${current===u?'active':''}">${n}</a>`).join('')}
      <button class="search-trigger" aria-label="Suche öffnen">⌕ Suche <small>Ctrl K</small></button></nav></div></header>`;
  }

  const footer = document.querySelector('[data-site-footer]');
  if (footer) footer.innerHTML = `<footer class="footer"><div class="footer-grid">
    <div><div class="brand"><span class="brand-mark">${sword}</span><span class="brand-copy"><strong>WANDEL</strong><span>Wandel Studios</span></span></div><p style="color:#9e9689;max-width:430px;margin-top:16px">Eine unabhängige mittelalterliche Fantasy-RPG-Erfahrung auf Roblox. Diese Website dient als offizielle Projektseite, Handbuch und erweiterbare Wiki.</p></div>
    <div><h4>Spiel</h4><a href="${base}index.html">Startseite</a><a href="${base}handbook.html">Handbuch</a><a href="${base}wiki.html">Wiki</a><a href="${base}roadmap.html">Roadmap</a></div>
    <div><h4>Community</h4><a href="#" data-external="roblox">Roblox</a><a href="#" data-external="discord">Discord</a><a href="${base}updates.html">Updates</a><a href="${base}team.html">Credits</a></div>
    <div><h4>Rechtliches</h4><a href="${base}impressum.html">Impressum</a><a href="${base}datenschutz.html">Datenschutz</a></div>
  </div><div class="footer-bottom"><span>© 2026 Wandel Studios. Alle Rechte vorbehalten.</span><span>Private development build · Inhalte können sich ändern.</span></div></footer>`;

  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  menu?.addEventListener('click',()=>nav?.classList.toggle('open'));

  function toast(msg) {
    let el = document.querySelector('.toast');
    if (!el) { el=document.createElement('div'); el.className='toast'; document.body.appendChild(el); }
    el.textContent=msg; el.classList.add('show'); clearTimeout(window.__toast); window.__toast=setTimeout(()=>el.classList.remove('show'),3200);
  }
  document.addEventListener('click',e=>{
    const link=e.target.closest('[data-external]'); if(!link) return;
    e.preventDefault();
    const url = link.dataset.external==='roblox' ? config.robloxUrl : config.discordUrl;
    if(!url || url==='#') toast(`${link.dataset.external==='roblox'?'Roblox':'Discord'}-Link ist vorbereitet und kann später in assets/js/site-config.js eingesetzt werden.`);
    else window.open(url,'_blank','noopener');
  });

  const searchOverlay = document.createElement('div');
  searchOverlay.className='search-overlay';
  searchOverlay.innerHTML=`<div class="search-panel"><div class="search-top"><input class="search-input" placeholder="Wiki, Systeme, Orte, Items ..." aria-label="Website durchsuchen"><button class="search-close" aria-label="Suche schließen">✕</button></div><div class="search-results"></div></div>`;
  document.body.appendChild(searchOverlay);
  const searchInput=searchOverlay.querySelector('.search-input');
  const results=searchOverlay.querySelector('.search-results');
  const index=window.WANDEL_SEARCH_INDEX||[];
  function renderSearch(q='') {
    q=q.trim().toLowerCase();
    const found=(q?index.filter(x=>(x.title+' '+x.category+' '+x.summary).toLowerCase().includes(q)):index.slice(0,8)).slice(0,12);
    results.innerHTML=found.length?found.map(x=>`<a class="search-result" href="${base}${x.url}"><strong>${x.title}</strong><span>${x.category} · ${x.summary}</span></a>`).join(''):`<div class="search-empty">Keine passenden Einträge gefunden.</div>`;
  }
  function openSearch(){searchOverlay.classList.add('open');renderSearch(searchInput.value);setTimeout(()=>searchInput.focus(),50)}
  function closeSearch(){searchOverlay.classList.remove('open')}
  document.querySelector('.search-trigger')?.addEventListener('click',openSearch);
  searchOverlay.querySelector('.search-close').addEventListener('click',closeSearch);
  searchOverlay.addEventListener('click',e=>{if(e.target===searchOverlay)closeSearch()});
  searchInput.addEventListener('input',e=>renderSearch(e.target.value));
  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}
    if(e.key==='Escape')closeSearch();
  });

  const observer=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible')}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  const emberBox=document.querySelector('.embers');
  if(emberBox){
    for(let i=0;i<28;i++){
      const e=document.createElement('i');e.className='ember';e.style.left=Math.random()*100+'%';e.style.bottom=(-10-Math.random()*20)+'px';e.style.animationDuration=(7+Math.random()*10)+'s';e.style.animationDelay=(-Math.random()*14)+'s';emberBox.appendChild(e);
    }
  }
  let ticking=false;
  window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{document.documentElement.style.setProperty('--scrollY',window.scrollY+'px');ticking=false})});
})();
