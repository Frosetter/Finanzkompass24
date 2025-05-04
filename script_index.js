document.body.classList.add('dark');

const slider = document.getElementById('slider');
const slides = slider.querySelectorAll('.slide');
let currentIndex = 0;

function showSlide(index) {
  const totalSlides = slides.length;
  currentIndex = (index + totalSlides) % totalSlides; // sorgt für Loop
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

document.querySelectorAll('nav ul li a.no-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    alert(`Du hast den Bereich "${e.target.innerText}" gewählt. Inhalte folgen bald!`);
  });
});

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const icon = document.getElementById('theme-toggle');
  icon.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Drag to scroll auf .main-nav ul
const navWrapper = document.querySelector('.main-nav ul');
let isDragging = false;
let startX;
let scrollStart;

document.querySelectorAll('.main-nav a').forEach(a => {
  a.setAttribute('draggable', 'false');
});

if (navWrapper) {
  navWrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    navWrapper.classList.add('active');
    startX = e.pageX - navWrapper.offsetLeft;
    scrollStart = navWrapper.scrollLeft;
  });

  navWrapper.addEventListener('mouseleave', () => {
    isDragging = false;
    navWrapper.classList.remove('active');
  });

  navWrapper.addEventListener('mouseup', () => {
    isDragging = false;
    navWrapper.classList.remove('active');
  });

  navWrapper.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - navWrapper.offsetLeft;
    const scroll = (x - startX) * 1; // Geschwindigkeit
    navWrapper.scrollLeft = scrollStart - scroll;
  });
}