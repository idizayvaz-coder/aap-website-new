// loader
  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('hide'), 350);
  });

  // AOS init
  AOS.init({ duration: 800, once: true, offset: 60 });

  // navbar scroll state
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // mobile menu
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  mobileToggle.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));

  // counters
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.closest('.counter-card').classList.add('in-view');
        const el = entry.target;
        const target = +el.dataset.target;
        let current = 0;
        const step = Math.max(1, target / 60);
        const tick = () => {
          current += step;
          if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(tick);
          } else {
            el.textContent = target;
          }
        };
        tick();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterObserver.observe(c));

  // sector tabs
  const sectorTabs = document.querySelectorAll('.sector-card');
  const sectorPanels = document.querySelectorAll('.sector-panel');
  sectorTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.sector;
      sectorTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      sectorPanels.forEach(p => p.classList.toggle('hidden', p.dataset.panel !== id));
      document.getElementById('sector-panels').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  // accordions
  document.querySelectorAll('.acc-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel = trigger.nextElementSibling;
      const icon = trigger.querySelector('.acc-icon');
      const isOpen = panel.style.maxHeight && panel.style.maxHeight !== '0px';
      // close siblings in same group
      const group = trigger.closest('.space-y-3');
      if (group) {
        group.querySelectorAll('.acc-panel').forEach(p => { if (p !== panel) p.style.maxHeight = '0px'; });
        group.querySelectorAll('.acc-icon').forEach(i => { if (i !== icon) i.classList.replace('fa-minus', 'fa-plus'); });
      }
      if (isOpen) {
        panel.style.maxHeight = '0px';
        icon.classList.replace('fa-minus', 'fa-plus');
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
        icon.classList.replace('fa-plus', 'fa-minus');
      }
    });
  });

  // gsap hero text fine-tune (subtle parallax on hero video)
  gsap.registerPlugin(ScrollTrigger);
  gsap.to('header video', {
    yPercent: 12,
    ease: 'none',
    scrollTrigger: { trigger: 'header', start: 'top top', end: 'bottom top', scrub: true }
  });
