const nav = document.querySelector('.main-nav');

let isDown = false;
let startX;
let scrollLeft;

nav.addEventListener('mousedown', (e) => {
  isDown = true;
  nav.classList.add('active');
  startX = e.pageX - nav.offsetLeft;
  scrollLeft = nav.scrollLeft;
});

nav.addEventListener('mouseleave', () => {
  isDown = false;
  nav.classList.remove('active');
});

nav.addEventListener('mouseup', () => {
  isDown = false;
  nav.classList.remove('active');
});

nav.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - nav.offsetLeft;
  const walk = (x - startX) * 2; // Scroll-Geschwindigkeit anpassen
  nav.scrollLeft = scrollLeft - walk;
});
