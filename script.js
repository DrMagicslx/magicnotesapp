const currentFile = window.location.pathname.split('/').pop() || 'index.html';
const appIcon = 'app-icon-web.png?v=20261001b';

const header = document.querySelector('.site-header');
if (header) {
  header.innerHTML = `
    <div class="nav-wrap">
      <a class="brand" href="index.html">
        <img src="${appIcon}" alt=""><span>Magic Notes</span>
      </a>
      <button class="nav-toggle" type="button" aria-label="Navigation öffnen" aria-expanded="false" data-nav-toggle>☰</button>
      <nav class="site-nav" aria-label="Hauptnavigation" data-nav>
        <a href="index.html" data-route="home">Startseite</a>
        <a href="index.html#funktionen" data-route="features">Funktionen</a>
        <a href="index.html#datenschutz" data-route="privacy">Privatsphäre</a>
        <a href="index.html#premium" data-route="premium">Premium</a>
        <a href="support.html" data-route="support">Support</a>
        <a href="rechtliches.html" data-route="legal">Rechtliches</a>
      </nav>
    </div>`;
}

const footer = document.querySelector('.site-footer');
if (footer) {
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="index.html"><img src="${appIcon}" alt=""><span>Magic Notes</span></a>
          <p class="footer-copy">Eine persönliche Notiz-App mit einem kleinen Funken Magie.</p>
        </div>
        <div class="footer-links">
          <strong>Hilfe</strong>
          <a href="support.html" data-footer-page="support.html">Support & Kontakt</a>
          <a href="konto-loeschen.html" data-footer-page="konto-loeschen.html">Konto löschen</a>
          <a href="community-richtlinien.html" data-footer-page="community-richtlinien.html">Community-Regeln</a>
        </div>
        <div class="footer-links">
          <strong>Rechtliches</strong>
          <a href="datenschutz.html" data-footer-page="datenschutz.html">Datenschutzerklärung</a>
          <a href="nutzungsbedingungen.html" data-footer-page="nutzungsbedingungen.html">Nutzungsbedingungen</a>
          <a href="impressum.html" data-footer-page="impressum.html">Impressum</a>
        </div>
      </div>
      <div class="copyright">© <span data-year></span> Magic Notes · Entwurfsstand 01.10.2026</div>
    </div>`;
}

const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.textContent = isOpen ? '✕' : '☰';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = '☰';
    });
  });
}

function setActiveRoute(route) {
  document.querySelectorAll('[data-route]').forEach((link) => {
    if (link.dataset.route === route) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

const legalFiles = new Set([
  'rechtliches.html',
  'datenschutz.html',
  'impressum.html',
  'nutzungsbedingungen.html',
  'community-richtlinien.html',
]);

if (currentFile === 'index.html') {
  const sections = [
    { id: 'funktionen', route: 'features' },
    { id: 'datenschutz', route: 'privacy' },
    { id: 'premium', route: 'premium' },
  ];

  const updateIndexRoute = () => {
    let route = 'home';
    sections.forEach(({ id, route: sectionRoute }) => {
      const section = document.getElementById(id);
      if (section && section.getBoundingClientRect().top <= 170) route = sectionRoute;
    });
    setActiveRoute(route);
  };

  updateIndexRoute();
  window.addEventListener('scroll', updateIndexRoute, { passive: true });
  window.addEventListener('hashchange', updateIndexRoute);
} else if (currentFile === 'support.html' || currentFile === 'konto-loeschen.html') {
  setActiveRoute('support');
} else if (legalFiles.has(currentFile)) {
  setActiveRoute('legal');
} else {
  setActiveRoute('home');
}

document.querySelectorAll('[data-footer-page]').forEach((link) => {
  if (link.dataset.footerPage === currentFile) link.setAttribute('aria-current', 'page');
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});
