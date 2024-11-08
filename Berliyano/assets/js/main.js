if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js') // Ganti dengan path ke file service worker Anda
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}


/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById('header');
  if (window.scrollY >= 50) header.classList.add('scroll-header');
  else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.services__modal'),
  modalBtns = document.querySelectorAll('.services__button'),
  modalClose = document.querySelectorAll('.services__modal-close');

function openModal(modalIndex) {
  modalViews[modalIndex].classList.add('active-modal');
}

modalBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => openModal(i));
});

modalClose.forEach((btn) => {
  btn.addEventListener('click', () => {
    modalViews.forEach((modal) => {
      modal.classList.remove('active-modal');
    });
  });
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container', {
  selectors: {
    target: '.work__card',
  },
  animation: {
    duration: 300,
  },
});

/* Link active work */
const linkWork = document.querySelectorAll('.work__item');

function activeWork() {
  linkWork.forEach((link) => link.classList.remove('active-work'));
  this.classList.add('active-work');
}

linkWork.forEach((link) => link.addEventListener('click', activeWork));

/*=============== SWIPER TESTIMONIAL ===============*/
let swiperTestimonial = new Swiper('.testimonial__container', {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 48,
    },
  },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id');
    const sectionLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionLink?.classList.add('active-link');
    } else {
      sectionLink?.classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById('theme-button');
const lightTheme = 'light-theme';
const iconTheme = 'bx-sun';

// Previously selected theme (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun';

// We validate if the user previously chose a topic
if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme);
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
  // reset: true, // If you want animations to repeat, uncomment this line
});

sr.reveal('.home__data');
sr.reveal('.home__handle', { delay: 700 });
sr.reveal('.home__social, .home__scroll', { delay: 900, origin: 'bottom' });
