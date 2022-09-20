'use strict';

const topBar = document.querySelector('.top-bar');
const navBar = document.querySelector('.nav-bar');
const siteTitle = document.querySelector('.site-title');
const menuBtn = document.querySelector('.mobile-menu-btn');
const menu = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const fadeIn = document.querySelectorAll('.fade-in');
const carouselCards = document.querySelectorAll('.carousel .card');
const carouselContainer = document.querySelector('.carousel-container');
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev-btn')
const nextBtn = document.querySelector('.next-btn')

//distance of top of site title to top of window
const distance = siteTitle.getClientRects()[0].y;

// Changes narbar to a solid background when scrolling down or up
window.addEventListener('scroll', () => {
	if (window.scrollY >= 150) {
		navBar.classList.add('solid');
	} else if (window.scrollY <= 150) {
		navBar.classList.remove('solid');
	}

	//Changes opacity of site title based on scroll position
	const percentage = siteTitle.getClientRects()[0].y / distance;
	siteTitle.style.opacity = percentage;
});

const observer = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('show');
			}
		});
	},
	{ threshold: 0.5 }
);

observer.observe(document.querySelector('.aside-page .container'));

fadeIn.forEach(element => {
	observer.observe(element);
});

// Page observer to activate current link
const pageObserver = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const pageObserved = entry.target.id;

				navLinks.forEach(link => {
					link.classList.remove('active');

					if (link.innerHTML.toLowerCase() === pageObserved) {
						link.classList.add('active');
					}
				});
			}
		});
	},
	{ threshold: 0.25 }
);
// Event listeners

const closeMenu = () => {
	menuBtn.classList.remove('menu-active');
	menu.classList.remove('menu-active');
};

pages.forEach(page => {
	pageObserver.observe(page);
});

menuBtn.addEventListener('click', () => {
	menuBtn.classList.toggle('menu-active');
	menu.classList.toggle('menu-active');
});

navLinks.forEach(link => {
	link.addEventListener('click', () => {
		if (menu.classList.contains('menu-active')) {
			closeMenu();
		}
	});
});

// Allows User to close
pages.forEach(page => {
	page.addEventListener('click', () => {
		if (menu.classList.contains('menu-active')) {
			closeMenu();
		}
	});
});

// Allows user to close mobile menu by clicking on menu background
menu.addEventListener('click', e => {
	if (
		menu.classList.contains('menu-active') &&
		!e.target.classList.contains('nav-link')
	) {
		closeMenu();
	}
});


// Carousel JS
let cardNum = 0;
let centerOfCarouselContainer = carouselContainer.clientWidth / 2;
let cardWidth = carousel.clientWidth / carouselCards.length;


carousel.style.transform = `translateX(${
	centerOfCarouselContainer - cardWidth / 2 - cardWidth * cardNum
}px)`;

const nextFunc = () => {

	if (cardNum >= carouselCards.length - 1) {
		cardNum = 0;
	} else {
		cardNum = cardNum + 1;
	}
	carousel.style.transform = `translateX(${
		centerOfCarouselContainer - cardWidth / 2 - cardWidth * cardNum
	}px)`;
};

const prevFunc = () => {

	if (cardNum <= 0) {
		cardNum = (carouselCards.length - 1);
	} else {
		cardNum = cardNum - 1;
	}
	carousel.style.transform = `translateX(${
		centerOfCarouselContainer - cardWidth / 2 - cardWidth * cardNum
	}px)`;
};

nextBtn.addEventListener('click', () => nextFunc())
prevBtn.addEventListener('click', () => prevFunc())


window.addEventListener('resize', () => {
	centerOfCarouselContainer = carouselContainer.clientWidth / 2;
	cardWidth = carousel.clientWidth / carouselCards.length;
	window.location.reload()
});




