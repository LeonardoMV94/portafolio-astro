/* ──────────────────────────────────────────────────────────────
   site-theme.js  •  modo oscuro • sticky header • mobile menu
   Funciona con Astro 5 + view‑transitions
──────────────────────────────────────────────────────────────── */

import "astro:transitions/client";

/* ≡ utilidades de tema ———————————————————————————————— */
const prefersDark   = () => localStorage.getItem("dark_mode") === "true";
const setDark       = (on) => {
  document.documentElement.classList.toggle("dark", on);
  localStorage.setItem("dark_mode", on);
};

/* ≡ clases de sticky header ————————————————————————————— */
const sticky        = ["fixed", "h-14"];
const unsticky      = ["absolute", "h-20"];
const contSticky    = [
  "border-neutral-300/50", "bg-white/80",
  "dark:border-neutral-600/40", "dark:bg-neutral-900/60",
  "backdrop-blur-2xl",
];
const contUnsticky  = ["border-transparent"];

/* ≡ arranque principal ——————————————————————————————— */
function init() {
  /* 1. Selecciona nuevos nodos (se reemplazan en cada swap) */
  const header   = document.getElementById("header");
  const menu     = document.getElementById("menu");
  const darkBtn  = document.getElementById("darkToggle");
  const openBtn  = document.getElementById("openMenu");
  const closeBtn = document.getElementById("closeMenu");
  const bgMenu   = document.getElementById("mobileMenuBackground");

  /* Páginas sin header: salir ‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑ */
  if (!header || !menu) return;

  /* 2. Estado inicial de tema */
  setDark(prefersDark());

  /* 3. Sticky header — limpia handler anterior y crea nuevo */
  if (window.__scrollHandler) {
    window.removeEventListener("scroll", window.__scrollHandler);
  }
  window.__scrollHandler = () => updateHeader(header, menu);
  window.addEventListener("scroll", window.__scrollHandler, { passive: true });
  updateHeader(header, menu);

  /* 4. Toggle dark / light */
  darkBtn?.addEventListener(
    "click",
    () => {
      // obtener el estado actual del tema desde el localStorage
      const currentTheme = localStorage.getItem("dark_mode");
      console.log("currentTheme", currentTheme);
      // si el estado actual es dark, cambiar a light, y viceversa
      if (document.documentElement.classList.contains("dark")) {
        localStorage.removeItem("dark_mode");
        showDay(true);
      } else {
        localStorage.setItem("dark_mode", true);
        showNight(true);
      }
      // cambiar el estado del tema
      // const enable = !document.documentElement.classList.contains("dark");
      // console.log("enable", enable);
      // setDark(enable);
      // animateTheme(enable);
    }, // evita duplicados en esta navegación
  );

  /* 5. Menú móvil */
  openBtn?.addEventListener("click", () => openMobileMenu(openBtn, closeBtn, menu, bgMenu), { once: true });
  closeBtn?.addEventListener("click", () => closeMobileMenu(openBtn, closeBtn, menu, bgMenu), { once: true });
}

function showDay(animate) {
	document.getElementById("sun").classList.remove("setting");
	document.getElementById("moon").classList.remove("rising");

	let timeout = 0;

	if (animate) {
		timeout = 500;

		document.getElementById("moon").classList.add("setting");
	}

	setTimeout(() => {
		document.getElementById("dayText").classList.remove("hidden");
		document.getElementById("nightText").classList.add("hidden");

		document.getElementById("moon").classList.add("hidden");
		document.getElementById("sun").classList.remove("hidden");

		if (animate) {
			document.documentElement.classList.remove("dark");
			document.getElementById("sun").classList.add("rising");
		}
	}, timeout);
}

function showNight(animate) {
	document.getElementById("moon").classList.remove("setting");
	document.getElementById("sun").classList.remove("rising");

	let timeout = 0;

	if (animate) {
		timeout = 500;

		document.getElementById("sun").classList.add("setting");
	}

	setTimeout(() => {
		document.getElementById("nightText").classList.remove("hidden");
		document.getElementById("dayText").classList.add("hidden");

		document.getElementById("sun").classList.add("hidden");
		document.getElementById("moon").classList.remove("hidden");

		if (animate) {
			document.documentElement.classList.add("dark");
			document.getElementById("moon").classList.add("rising");
		}
	}, timeout);
}

/* ≡ sticky header ———————————————————————————————— */
function updateHeader(header, menu) {
  if (window.scrollY > 16) {
    header.firstElementChild.classList.add(...contSticky);
    header.firstElementChild.classList.remove(...contUnsticky);
    header.classList.add(...sticky);
    header.classList.remove(...unsticky);
    menu.classList.add("top-[56px]");
    menu.classList.remove("top-[75px]");
  } else {
    header.firstElementChild.classList.remove(...contSticky);
    header.firstElementChild.classList.add(...contUnsticky);
    header.classList.add(...unsticky);
    header.classList.remove(...sticky);
    menu.classList.remove("top-[56px]");
    menu.classList.add("top-[75px]");
  }
}

/* ≡ animación sol / luna (opcional) ——————————————— */
function animateTheme(enableDark) {
  const sun  = document.getElementById("sun");
  const moon = document.getElementById("moon");
  const dayT = document.getElementById("dayText");
  const ngtT = document.getElementById("nightText");
  if (!sun || !moon) return;

  if (enableDark) {               // noche
    sun.classList.add("setting");
    setTimeout(() => {
      sun.classList.add("hidden");
      moon.classList.remove("hidden");
      moon.classList.add("rising");
      dayT?.classList.add("hidden");
      ngtT?.classList.remove("hidden");
    }, 500);
  } else {                        // día
    moon.classList.add("setting");
    setTimeout(() => {
      moon.classList.add("hidden");
      sun.classList.remove("hidden");
      sun.classList.add("rising");
      ngtT?.classList.add("hidden");
      dayT?.classList.remove("hidden");
    }, 500);
  }
}

/* ≡ menú móvil ———————————————————————————————— */
function openMobileMenu(openBtn, closeBtn, menu, bg) {
  openBtn.classList.add("hidden");
  closeBtn.classList.remove("hidden");
  menu.classList.remove("hidden");
  bg.classList.add("opacity-0");
  bg.classList.remove("hidden");
  requestAnimationFrame(() => bg.classList.remove("opacity-0"));
}
function closeMobileMenu(openBtn, closeBtn, menu, bg) {
  closeBtn.classList.add("hidden");
  openBtn.classList.remove("hidden");
  menu.classList.add("hidden");
  bg.classList.add("hidden");
}

/* ≡ engancha a los eventos de Astro —————————————— */
document.addEventListener("DOMContentLoaded",  init, { once: true });
document.addEventListener("astro:page-load",   init);      // después de navegar
document.addEventListener("astro:after-swap",  init);      // tras el swap

/* ≡ parche anti‑flash en <head> ———————————————— */
/* Añade esto *inline* en tu layout, antes de cualquier CSS:
<script is:inline>
  if (localStorage.getItem('dark_mode') === 'true') {
    document.documentElement.classList.add('dark');
  }
</script>
*/
