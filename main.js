// ── Active nav on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Hero: generate measuring tape tick marks ──
const heroTicks = document.querySelector('.hero-ticks');
if (heroTicks) {
  const ns = 'http://www.w3.org/2000/svg';
  for (let x = 0; x <= 1200; x += 8) {
    const isMajor = x % 40 === 0;
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', x);
    line.setAttribute('x2', x);
    line.setAttribute('y1', '668');
    line.setAttribute('y2', isMajor ? '648' : '658');
    line.setAttribute('stroke-width', isMajor ? '0.7' : '0.4');
    line.setAttribute('opacity',      isMajor ? '0.1' : '0.055');
    heroTicks.appendChild(line);
  }
}
