// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Kintsugi crack line — reveals as you scroll, gilding the page's spine
const crackPath = document.getElementById('crackPath');
if (crackPath && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const pathLength = crackPath.getTotalLength();
  crackPath.style.strokeDasharray = pathLength;
  crackPath.style.strokeDashoffset = pathLength;

  const updateCrack = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1);
    crackPath.style.strokeDashoffset = pathLength * (1 - progress);
  };

  window.addEventListener('scroll', updateCrack, { passive: true });
  updateCrack();
}

// Scroll reveal for sections
const revealTargets = document.querySelectorAll('.about, .projects-index, .project, .cv, .contact');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('is-visible'));
}
