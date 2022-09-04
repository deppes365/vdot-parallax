'use strict'

const topBar = document.querySelector('.top-bar')
const navBar = document.querySelector('.nav-bar')
const siteTitle = document.querySelector('.site-title')


//distance of top of site title to top of window
const distance = siteTitle.getClientRects()[0].y;



// Changes narbar to a solid background when scrolling down or up
window.addEventListener('scroll', () => {
  if(window.scrollY >= 150) {
    navBar.classList.add('solid')
  } else if (window.scrollY <= 150) {
    navBar.classList.remove('solid')
  }

  //Changes opacity of site title based on scroll position
  const percentage = ((siteTitle.getClientRects()[0].y) / distance)
  siteTitle.style.opacity = percentage
})


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show')
        }
    })
}, {threshold: 0.5})

observer.observe(document.querySelector('.aside-page .container'))


