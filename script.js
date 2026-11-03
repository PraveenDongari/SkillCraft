const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  toggle.textContent = isDark ? '☾' : '☼';
  toggle.setAttribute('aria-pressed', String(isDark));
});

const views = {
  certificate: document.getElementById('certificateView'),
  verify: document.getElementById('verifyView'),
  application: document.getElementById('applicationView'),
  home: document.getElementById('homeView')
};
const homeHashes = new Set(['#home', '#internships', '#features', '#faqs', '#contact']);

function showView() {
  const hash = window.location.hash;
  const viewName = hash === '#verify'
    ? 'verify'
    : hash === '#apply'
      ? 'application'
      : homeHashes.has(hash)
        ? 'home'
        : 'certificate';

  Object.entries(views).forEach(([name, view]) => {
    view.classList.toggle('is-active', name === viewName);
  });

  document.querySelectorAll('.site-header nav a').forEach(link => {
    if (link.hash === '#home' || link.hash === '#verify') {
      if (link.hash === '#home' && viewName === 'home') {
        link.setAttribute('aria-current', 'page');
      } else if (link.hash === '#verify' && viewName === 'verify') {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  });

  if (hash === '#verify' || hash === '#apply') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (homeHashes.has(hash)) {
    requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

window.addEventListener('hashchange', showView);
showView();

document.querySelectorAll('button[data-view="apply"]').forEach(button => {
  button.addEventListener('click', () => {
    window.location.assign('https://docs.google.com/forms/d/e/1FAIpQLSe4rGPCBYF7FcwWjO5st47odd73qLxQomGOL_aZjii-V3Xnvg/viewform');
  });
});

const certificateView = document.getElementById('certificateView');
window.setTimeout(() => {
  certificateView.classList.remove('is-loading');
  certificateView.classList.add('is-loaded');
  certificateView.setAttribute('aria-busy', 'false');
  certificateView.querySelector('.certificate-loading').setAttribute('aria-hidden', 'true');
  certificateView.querySelector('.details').setAttribute('aria-hidden', 'false');
}, 1600);

const revealElements = document.querySelectorAll('.reveal-on-scroll');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('is-visible'));
}

const certificateForm = document.getElementById('certificateForm');
certificateForm.addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('certificateMessage').textContent =
    'This demo is not connected to a live certificate verification service.';
});

const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('contactStatus').textContent =
    'Demo only — your message was not sent.';
});

const applicationForm = document.getElementById('applicationForm');
applicationForm.addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('applicationStatus').textContent =
    'This is a demo. Your application was not submitted.';
});

const backTop = document.querySelector('.back-top');
const updateBackTop = () => {
  backTop.classList.toggle('is-visible', window.scrollY > 300);
};

window.addEventListener('scroll', updateBackTop, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
updateBackTop();
