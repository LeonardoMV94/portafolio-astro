// main3.js adaptado para Astro SPA transitions
import "astro:transitions/client"

window.darkMode = false;

const stickyClasses = ["fixed", "h-14"];
const unstickyClasses = ["absolute", "h-20"];
const stickyClassesContainer = [
	"border-neutral-300/50",
	"bg-white/80",
	"dark:border-neutral-600/40",
	"dark:bg-neutral-900/60",
	"backdrop-blur-2xl",
];
const unstickyClassesContainer = ["border-transparent"];
let headerElement = null;

function showDay(animate) {
	const sun = document.getElementById("sun");
	const moon = document.getElementById("moon");
	const dayText = document.getElementById("dayText");
	const nightText = document.getElementById("nightText");
	if (!sun || !moon || !dayText || !nightText) return;

	sun.classList.remove("setting");
	moon.classList.remove("rising");

	let timeout = 0;
	if (animate) {
		timeout = 500;
		moon.classList.add("setting");
	}
	setTimeout(() => {
		dayText.classList.remove("hidden");
		nightText.classList.add("hidden");
		moon.classList.add("hidden");
		sun.classList.remove("hidden");
		if (animate) {
			document.documentElement.classList.remove("dark");
			sun.classList.add("rising");
		}
	}, timeout);
}

function showNight(animate) {
	const sun = document.getElementById("sun");
	const moon = document.getElementById("moon");
	const dayText = document.getElementById("dayText");
	const nightText = document.getElementById("nightText");
	if (!sun || !moon || !dayText || !nightText) return;

	moon.classList.remove("setting");
	sun.classList.remove("rising");

	let timeout = 0;
	if (animate) {
		timeout = 500;
		sun.classList.add("setting");
	}
	setTimeout(() => {
		nightText.classList.remove("hidden");
		dayText.classList.add("hidden");
		sun.classList.add("hidden");
		moon.classList.remove("hidden");
		if (animate) {
			document.documentElement.classList.add("dark");
			moon.classList.add("rising");
		}
	}, timeout);
}

function applyMenuItemClasses() {
	const menuItems = document.querySelectorAll("#menu a");
	for (let i = 0; i < menuItems.length; i++) {
		if (menuItems[i].pathname === window.location.pathname) {
			menuItems[i].classList.add("text-neutral-900", "dark:text-white");
		}
	}
}

function evaluateHeaderPosition() {
	if (!headerElement) return;
	const menu = document.getElementById("menu");
	if (!menu || !headerElement.firstElementChild) return;
	if (window.scrollY > 16) {
		headerElement.firstElementChild.classList.add(...stickyClassesContainer);
		headerElement.firstElementChild.classList.remove(...unstickyClassesContainer);
		headerElement.classList.add(...stickyClasses);
		headerElement.classList.remove(...unstickyClasses);
		menu.classList.add("top-[56px]");
		menu.classList.remove("top-[75px]");
	} else {
		headerElement.firstElementChild.classList.remove(...stickyClassesContainer);
		headerElement.firstElementChild.classList.add(...unstickyClassesContainer);
		headerElement.classList.add(...unstickyClasses);
		headerElement.classList.remove(...stickyClasses);
		menu.classList.remove("top-[56px]");
		menu.classList.add("top-[75px]");
	}
}

function stickyHeaderFuncionality() {
	window.addEventListener("scroll", evaluateHeaderPosition);
}

function mobileMenuFunctionality() {
	const openBtn = document.getElementById("openMenu");
	const closeBtn = document.getElementById("closeMenu");
	if (openBtn) {
		openBtn.addEventListener("click", openMobileMenu);
	}
	if (closeBtn) {
		closeBtn.addEventListener("click", closeMobileMenu);
	}
}

function openMobileMenu() {
	const openBtn = document.getElementById("openMenu");
	const closeBtn = document.getElementById("closeMenu");
	const menu = document.getElementById("menu");
	const bg = document.getElementById("mobileMenuBackground");
	if (!openBtn || !closeBtn || !menu || !bg) return;
	openBtn.classList.add("hidden");
	closeBtn.classList.remove("hidden");
	menu.classList.remove("hidden");
	bg.classList.add("opacity-0");
	bg.classList.remove("hidden");
	setTimeout(() => {
		bg.classList.remove("opacity-0");
	}, 1);
}

function closeMobileMenu() {
	const openBtn = document.getElementById("openMenu");
	const closeBtn = document.getElementById("closeMenu");
	const menu = document.getElementById("menu");
	const bg = document.getElementById("mobileMenuBackground");
	if (!openBtn || !closeBtn || !menu || !bg) return;
	closeBtn.classList.add("hidden");
	openBtn.classList.remove("hidden");
	menu.classList.add("hidden");
	bg.classList.add("hidden");
}

function initMenuHeader() {
	console.log("initMenuHeader");
	headerElement = document.getElementById("header");
	if (!headerElement) return;

	// 1. Sincroniza la clase 'dark' según localStorage
	const darkModeLS = localStorage.getItem("dark_mode") === "true";
	if (darkModeLS) {
		document.documentElement.classList.add("dark");
		window.darkMode = true;
		showNight(false);
	} else {
		document.documentElement.classList.remove("dark");
		window.darkMode = false;
		showDay(false);
	}

	// 2. Limpia listeners previos del botón darkToggle
	const oldDarkToggle = document.getElementById("darkToggle");
	if (oldDarkToggle) {
		const newDarkToggle = oldDarkToggle.cloneNode(true);
		oldDarkToggle.parentNode.replaceChild(newDarkToggle, oldDarkToggle);
		newDarkToggle.addEventListener("click", () => {
			document.documentElement.classList.add("duration-300");
			if (document.documentElement.classList.contains("dark")) {
				localStorage.removeItem("dark_mode");
				showDay(true);
			} else {
				localStorage.setItem("dark_mode", true);
				showNight(true);
			}
		});
	}

	stickyHeaderFuncionality();
	applyMenuItemClasses();
	evaluateHeaderPosition();
	mobileMenuFunctionality();

	// Exponer funciones globales si se necesitan
	window.toggleDarkMode = () => {
		document.documentElement.classList.toggle('dark');
		if(document.documentElement.classList.contains('dark')){
			localStorage.setItem('dark_mode', true);
			window.darkMode = true;
		} else {
			window.darkMode = false;
			localStorage.setItem('dark_mode', false);
		}
	};
	window.stickyHeaderFuncionality = stickyHeaderFuncionality;
	window.evaluateHeaderPosition = evaluateHeaderPosition;
	window.applyMenuItemClasses = applyMenuItemClasses;
	window.openMobileMenu = openMobileMenu;
	window.closeMobileMenu = closeMobileMenu;
}

// Inicializar en carga inicial y tras cada transición SPA
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initMenuHeader);
} else {
	initMenuHeader();
}
window.addEventListener("astro:page-load", initMenuHeader); 