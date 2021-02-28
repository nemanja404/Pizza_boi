const tabBtnsContainer = document.querySelector('.tabs__buttons');
const tabBtns = document.querySelectorAll('.tabs__button');
const tabContainer = document.querySelector('.tabs__content');
const tabs = document.querySelectorAll('.tabs__tab');
const btnModal = document.querySelector('.btn--modal-open');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.modal__close');
const btnSubmit = document.querySelector('.form');
const sections = document.querySelectorAll('.section');
const linksContainer = document.querySelector('.menu');
const btnPizza = document.querySelector('.btn--pizza');
const formInputs = document.querySelectorAll('.form__input');
const arrLeft = document.querySelector('.ingredients__arrow--left');
const arrRight = document.querySelector('.ingredients__arrow--right');
const slides = document.querySelectorAll('.ingredients__slide');
const logoText = document.querySelector('.year');
const nav = document.querySelector('.nav');
const bakers = document.querySelectorAll('.bakers__baker');
// variables

let currSlide = 1;
const year = new Date().getFullYear();
// FUNCTIONS

const transformSlides = curr => {
  slides.forEach(slide => {
    const n = slide.dataset.slider;
    slide.style.transform = `translatex(${(n - curr) * 100}%)`;
  });
};
transformSlides(currSlide);

logoText.insertAdjacentHTML('beforebegin', `&copy; ${year}`);

const goToLink = e => {
  e.preventDefault();
  if (e.target.tagName !== 'A') return;
  if (!e.target.classList.contains('btn--modal-open')) {
    const dest = document.querySelector(e.target.getAttribute('href'));
    dest.scrollIntoView({ behavior: 'smooth' });
  }
};

const closeModal = () => {
  modal.classList.remove('modal--active');
  formInputs.forEach(inp => {
    inp.value = '';
  });
};

const toggleTabBtn = tabBtn => {
  tabBtns.forEach(tab => tab.classList.remove('tabs__button--active'));
  tabBtn.classList.add('tabs__button--active');
};

const toggleTab = destination => {
  const num = destination.dataset.btn;
  tabs.forEach(tab => tab.classList.remove('tabs__tab--active'));
  tabs[num].classList.add('tabs__tab--active');
};

// INTERSECTION OBSERVERS

const stickyNav = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('nav--sticky');
  else nav.classList.remove('nav--sticky');
};

const navObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-150px',
});

navObserver.observe(section1);

const contentSlide = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('bakers__baker--active');
  observer.unobserve(entry.target);
};

const bakersObserver = new IntersectionObserver(contentSlide, {
  root: null,
  threshold: 0,
  rootMargin: '-250px',
});

bakers.forEach(baker => {
  bakersObserver.observe(baker);
});
// EVENT LISTENERS

// TABS
tabBtnsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('tabs__button')) {
    toggleTabBtn(e.target);
    toggleTab(e.target);
  }
});

//MODAL

btnModal.addEventListener('click', () => {
  modal.classList.add('modal--active');
});

closeModalBtn.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;

  closeModal();
});

modal.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) closeModal();
});

// Sumbit form
btnSubmit.addEventListener('submit', e => {
  e.preventDefault();
  setTimeout(closeModal, 500);
});
// scroll into view
linksContainer.addEventListener('click', e => {
  goToLink(e);
});

btnPizza.addEventListener('click', e => {
  goToLink(e);
});

// slider

arrRight.addEventListener('click', () => {
  if (currSlide === 5) currSlide = 1;
  else currSlide++;
  transformSlides(currSlide);
});
arrLeft.addEventListener('click', () => {
  if (currSlide === 1) currSlide = 5;
  else currSlide--;
  transformSlides(currSlide);
});
