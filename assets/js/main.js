(() => {
  const sub = location.pathname.includes('/wiki/');
  const base = sub ? '../' : '';
  const config = window.WANDEL_CONFIG || {};
  const navItems = [
    ['index.html','Home'], ['wiki.html','Wiki'], ['handbook.html','Handbook'],
    ['world.html','World'], ['updates.html','Updates'], ['roadmap.html','Roadmap'], ['team.html','Team']
  ];
  const sword = `<svg viewBox="0 0 64 64" aria-hidden="true"><path fill="#d8ad60" d="M31 6h4l2 13 12 3-2 5-10-1v25l-5 7-5-7V26l-10 1-2-5 12-3z"/><path stroke="#f3dfb0" stroke-width="3" stroke-linecap="round" d="M23 18h18"/></svg>`;
  const header = document.querySelector('[data-site-header]');
  if (header) {
    const current = location.pathname.split('/').pop() || 'index.html';
    header.innerHTML = `<header class="site-header"><div class="nav-wrap">
      <a class="brand" href="${base}index.html"><span class="brand-mark">${sword}</span><span class="brand-copy"><strong>WANDEL</strong><span>Medieval Fantasy RPG</span></span></a>
      <button class="menu-toggle" aria-label="Open menu">☰</button>
      <nav class="main-nav">${navItems.map(([u,n])=>`<a href="${base}${u}" class="${current===u?'active':''}">${n}</a>`).join('')}
      <button class="search-trigger" aria-label="Open search">⌕ Search <small>Ctrl K</small></button></nav></div></header>`;
  }

  const footer = document.querySelector('[data-site-footer]');
  if (footer) footer.innerHTML = `<footer class="footer"><div class="footer-grid">
    <div><div class="brand"><span class="brand-mark">${sword}</span><span class="brand-copy"><strong>WANDEL</strong><span>Wandel Studios</span></span></div><p style="color:#9e9689;max-width:430px;margin-top:16px">An independent medieval fantasy RPG experience on Roblox. This website serves as the official project page, handbook and expandable wiki.</p></div>
    <div><h4>Game</h4><a href="${base}index.html">Home</a><a href="${base}handbook.html">Handbook</a><a href="${base}wiki.html">Wiki</a><a href="${base}roadmap.html">Roadmap</a></div>
    <div><h4>Community</h4><a href="#" data-external="game">Play Wandel</a><a href="#" data-external="group">Wandel Studios Group</a><a href="#" data-external="discord">Discord</a><a href="${base}team.html">Credits</a></div>
    <div><h4>Legal</h4><a href="${base}legal-notice.html">Legal Notice</a><a href="${base}privacy-policy.html">Privacy Policy</a></div>
  </div><div class="footer-bottom"><span>© 2026 Wandel Studios. All rights reserved.</span><span>In development · Content may change.</span></div></footer>`;

  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  menu?.addEventListener('click',()=>nav?.classList.toggle('open'));

  function toast(msg) {
    let el = document.querySelector('.toast');
    if (!el) { el=document.createElement('div'); el.className='toast'; document.body.appendChild(el); }
    el.textContent=msg; el.classList.add('show'); clearTimeout(window.__toast); window.__toast=setTimeout(()=>el.classList.remove('show'),3200);
  }

  const externalUrls = {
    game: config.robloxGameUrl || config.robloxUrl,
    roblox: config.robloxGameUrl || config.robloxUrl,
    group: config.robloxGroupUrl,
    discord: config.discordUrl
  };
  const externalLabels = {
    game: 'Roblox game',
    roblox: 'Roblox game',
    group: 'Roblox group',
    discord: 'Discord invite'
  };

  document.querySelectorAll('[data-external]').forEach(link => {
    const type = link.dataset.external;
    const url = externalUrls[type];
    if (url && url !== '#') {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });

  document.addEventListener('click', e => {
    const link = e.target.closest('[data-external]');
    if (!link) return;
    const type = link.dataset.external;
    const url = externalUrls[type];
    if (!url || url === '#') {
      e.preventDefault();
      toast(`The ${externalLabels[type] || 'external'} link has not been configured yet.`);
    }
  });

  const searchOverlay = document.createElement('div');
  searchOverlay.className='search-overlay';
  searchOverlay.innerHTML=`<div class="search-panel"><div class="search-top"><input class="search-input" placeholder="Wiki, systems, locations, items ..." aria-label="Search website"><button class="search-close" aria-label="Close search">✕</button></div><div class="search-results"></div></div>`;
  document.body.appendChild(searchOverlay);
  const searchInput=searchOverlay.querySelector('.search-input');
  const results=searchOverlay.querySelector('.search-results');
  const index=window.WANDEL_SEARCH_INDEX||[];
  function renderSearch(q='') {
    q=q.trim().toLowerCase();
    const found=(q?index.filter(x=>(x.title+' '+x.category+' '+x.summary).toLowerCase().includes(q)):index.slice(0,8)).slice(0,12);
    results.innerHTML=found.length?found.map(x=>`<a class="search-result" href="${base}${x.url}"><strong>${x.title}</strong><span>${x.category} · ${x.summary}</span></a>`).join(''):`<div class="search-empty">No matching entries found.</div>`;
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
