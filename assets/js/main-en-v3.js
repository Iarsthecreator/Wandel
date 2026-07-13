(() => {
  const sub = location.pathname.includes('/wiki/');
  const base = sub ? '../' : '';
  const config = window.WANDEL_CONFIG || {};
  const navItems = [
    ['index.html','Home'],
    ['wiki.html','Wiki'],
    ['handbook.html','Handbook'],
    ['world.html','World'],
    ['updates.html','Updates'],
    ['roadmap.html','Roadmap'],
    ['team.html','Team']
  ];

  const sword = `<svg viewBox="0 0 64 64" aria-hidden="true"><path fill="#d8ad60" d="M31 6h4l2 13 12 3-2 5-10-1v25l-5 7-5-7V26l-10 1-2-5 12-3z"/><path stroke="#f3dfb0" stroke-width="3" stroke-linecap="round" d="M23 18h18"/></svg>`;

  const header = document.querySelector('[data-site-header]');
  if (header) {
    const current = location.pathname.split('/').pop() || 'index.html';
    header.innerHTML = `<header class="site-header"><div class="nav-wrap">
      <a class="brand" href="${base}index.html">
        <span class="brand-mark">${sword}</span>
        <span class="brand-copy"><strong>WANDEL</strong><span>Medieval Fantasy RPG</span></span>
      </a>
      <button class="menu-toggle" aria-label="Open menu">☰</button>
      <nav class="main-nav">
        ${navItems.map(([url, name]) => `<a href="${base}${url}" class="${current === url ? 'active' : ''}">${name}</a>`).join('')}
        <button class="search-trigger" aria-label="Open search">⌕ Search <small>Ctrl K</small></button>
      </nav>
    </div></header>`;
  }

  const footer = document.querySelector('[data-site-footer]');
  if (footer) {
    footer.innerHTML = `<footer class="footer">
      <div class="footer-grid">
        <div>
          <div class="brand">
            <span class="brand-mark">${sword}</span>
            <span class="brand-copy"><strong>WANDEL</strong><span>Wandel Studios</span></span>
          </div>
          <p style="color:#9e9689;max-width:430px;margin-top:16px">
            An independent medieval fantasy RPG experience on Roblox. This website serves as the official project page, handbook and expandable wiki.
          </p>
        </div>
        <div>
          <h4>Game</h4>
          <a href="${base}index.html">Home</a>
          <a href="${base}handbook.html">Handbook</a>
          <a href="${base}wiki.html">Wiki</a>
          <a href="${base}roadmap.html">Roadmap</a>
        </div>
        <div>
          <h4>Community</h4>
          <a href="#" data-external="game">Play Wandel</a>
          <a href="#" data-external="group">Wandel Studios Group</a>
          <a href="#" data-external="discord">Discord</a>
          <a href="${base}team.html">Credits</a>
        </div>
        <div>
          <h4>Legal</h4>
          <a href="${base}legal-notice.html">Legal Notice</a>
          <a href="${base}privacy-policy.html">Privacy Policy</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Wandel Studios. All rights reserved.</span>
        <span>Development build · Content may change.</span>
      </div>
    </footer>`;
  }

  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  menu?.addEventListener('click', () => nav?.classList.toggle('open'));

  function toast(message) {
    let element = document.querySelector('.toast');
    if (!element) {
      element = document.createElement('div');
      element.className = 'toast';
      document.body.appendChild(element);
    }
    element.textContent = message;
    element.classList.add('show');
    clearTimeout(window.__wandelToast);
    window.__wandelToast = setTimeout(() => element.classList.remove('show'), 3200);
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

  document.addEventListener('click', event => {
    const link = event.target.closest('[data-external]');
    if (!link) return;
    const type = link.dataset.external;
    const url = externalUrls[type];
    if (!url || url === '#') {
      event.preventDefault();
      toast(`The ${externalLabels[type] || 'external'} link has not been configured yet.`);
    }
  });

  const searchOverlay = document.createElement('div');
  searchOverlay.className = 'search-overlay';
  searchOverlay.innerHTML = `<div class="search-panel">
    <div class="search-top">
      <input class="search-input" placeholder="Wiki, systems, locations, items ..." aria-label="Search website">
      <button class="search-close" aria-label="Close search">✕</button>
    </div>
    <div class="search-results"></div>
  </div>`;
  document.body.appendChild(searchOverlay);

  const searchInput = searchOverlay.querySelector('.search-input');
  const results = searchOverlay.querySelector('.search-results');
  const searchIndex = window.WANDEL_SEARCH_INDEX || [];

  function renderSearch(query = '') {
    query = query.trim().toLowerCase();
    const matches = (
      query
        ? searchIndex.filter(item =>
            `${item.title} ${item.category} ${item.summary}`.toLowerCase().includes(query)
          )
        : searchIndex.slice(0, 8)
    ).slice(0, 12);

    results.innerHTML = matches.length
      ? matches.map(item => `<a class="search-result" href="${base}${item.url}">
          <strong>${item.title}</strong>
          <span>${item.category} · ${item.summary}</span>
        </a>`).join('')
      : `<div class="search-empty">No matching entries found.</div>`;
  }

  function openSearch() {
    searchOverlay.classList.add('open');
    renderSearch(searchInput.value);
    setTimeout(() => searchInput.focus(), 50);
  }

  function closeSearch() {
    searchOverlay.classList.remove('open');
  }

  document.querySelector('.search-trigger')?.addEventListener('click', openSearch);
  searchOverlay.querySelector('.search-close').addEventListener('click', closeSearch);
  searchOverlay.addEventListener('click', event => {
    if (event.target === searchOverlay) closeSearch();
  });
  searchInput.addEventListener('input', event => renderSearch(event.target.value));

  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openSearch();
    }
    if (event.key === 'Escape') closeSearch();
  });

  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

  const emberBox = document.querySelector('.embers');
  if (emberBox) {
    for (let index = 0; index < 28; index += 1) {
      const ember = document.createElement('i');
      ember.className = 'ember';
      ember.style.left = `${Math.random() * 100}%`;
      ember.style.bottom = `${-10 - Math.random() * 20}px`;
      ember.style.animationDuration = `${7 + Math.random() * 10}s`;
      ember.style.animationDelay = `${-Math.random() * 14}s`;
      emberBox.appendChild(ember);
    }
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--scrollY', `${window.scrollY}px`);
      ticking = false;
    });
  });
})();
