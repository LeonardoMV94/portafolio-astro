const OFFSET = 80;

const scrollToHash = () => {
  console.log('scrollToHash');
  const hash = window.location.hash;
  if (hash.length > 1) {
    requestAnimationFrame(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: top - OFFSET,
          behavior: 'smooth',
        });
      }
    });
  }
};

// Escucha cambios de hash manualmente
window.addEventListener('hashchange', scrollToHash);

// También ejecutar al cargar
window.addEventListener('DOMContentLoaded', scrollToHash);