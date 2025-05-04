document.body.classList.add('dark');

let lastOpenedSubmenu = null;

function openNav() {
  document.getElementById('nav').classList.add('open');
  document.getElementById('main').classList.add('hidden');
}

function closeNav() {
  document.getElementById('nav').classList.remove('open');
  document.getElementById('main').classList.remove('hidden');
}

function loadContent(content) {
  document.getElementById('main').innerHTML = `
    <h1>${content}</h1>
    <p>Die <a href="#" class="definition" data-text="Ein Konsensmechanismus ist ein Verfahren, mit dem Blockchain-Netzwerke Transaktionen validieren.">Konsensmechanismen</a> sind essenziell für dezentrale Systeme.</p>
    <div id="overlay">
    <div class="popup">
    <button onclick="closePopup()">×</button>
    <div id="popupText">Text hier...</div>
    </div>
    </div>
  `;
  closeNav();
}

function toggleSubmenu(id, event) {
  event.stopPropagation();
  const submenu = document.getElementById(id);
  if (!submenu) return;

  const arrow = event.target;
  if (submenu.classList.contains('open')) {
    submenu.classList.remove('open');
    arrow.classList.remove('open');
  } else {
    submenu.classList.add('open');
    arrow.classList.add('open');
  }
}

function loadAndToggle(id, content) {
  lastOpenedSubmenu = id;
  loadContent(content);
  if (window.innerWidth > 768) {
    toggleSubmenu(id);                              /*NEU */
  }
}



function load_html(id, file) {
  loadTopic(file)

}

window.addEventListener('DOMContentLoaded', () => {
  loadTopic('/Krypto/Krypto/Kryptowaehrungen/Kryptowaehrungen.html');
});

async function loadTopic(file) {
  try {
    const res = await fetch(file);
    const rawHtml = await res.text();

    // Zuerst die Audio-Datei aus HTML-Kommentar extrahieren
    const audioMatch = rawHtml.match(/<!--\s*audio:(.*?)\s*-->/i);
    let audioSrc = '';

    if (audioMatch && audioMatch[1]) {
      audioSrc = audioMatch[1].trim();
    }

    // Nur den #main-content ersetzen, nicht den ganzen <main>!
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.innerHTML = rawHtml.replace(/<!--.*?-->/g, '');
    }

    // Jetzt das Audio-Element setzen
    const audio = document.getElementById('audio');
    if (audio && audioSrc) {
      audio.src = 'audio/' + audioSrc;
      audio.load();
      console.log('Audio-URL gesetzt:', audio.src);
    } else if (audio) {
      audio.src = '';
    }

    // Bei mobilen Geräten Navigation schließen
    if (window.innerWidth <= 768) {
      closeNav();
    }

  } catch (error) {
    console.error('Fehler beim Laden:', error);
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.innerHTML = '<p>Inhalt konnte nicht geladen werden.</p>';
    }
  }
}

function reopenNavWithSubmenu() {
  if (lastOpenedSubmenu) {
    document.getElementById('nav').classList.add('open');
    document.getElementById('main').classList.add('hidden');
    document.getElementById(lastOpenedSubmenu).classList.add('open');
  }
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

// 🔁 Live-Suche
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', function () {
    const term = this.value.toLowerCase();

    // Alle Submenüs vorab öffnen
    document.querySelectorAll('.submenu').forEach(sub => sub.classList.add('open'));

    // Alle sichtbaren Klick-Spans durchgehen (alle Level)
    document.querySelectorAll('.nav-item span, .nav-item-1 span, .nav-item-1-sub span, .nav-item-2 span').forEach(span => {
      const match = span.textContent.toLowerCase().includes(term);
      span.parentElement.style.display = match ? 'block' : 'none';

      // Wenn es ein Treffer ist → öffne alle übergeordneten Submenus
      if (match) {
        let parent = span.parentElement.parentElement;
        while (parent && parent.classList) {
          if (parent.classList.contains('submenu')) {
            parent.classList.add('open');
          }
          parent = parent.parentElement;
        }
      }
    });
  });
}


// Öffnen beim Klick POP-UP
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('definition')) {
    e.preventDefault();
    const text = e.target.getAttribute('data-text');
    document.getElementById('popupText').textContent = text;
    document.getElementById('overlay').style.display = 'flex';
  }
});

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('definition')) {
    e.preventDefault();
    const file = e.target.getAttribute('data-text'); // Pfad zur externen Datei

    // Jetzt die Datei per fetch() laden
    fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error('Datei konnte nicht geladen werden.');
        }
        return response.text();
      })
      .then(data => {
        document.getElementById('popupText').innerHTML = data; // Inhalt ins Popup schreiben
        document.getElementById('overlay').style.display = 'flex'; // Popup anzeigen
      })
      .catch(error => {
        console.error('Fehler beim Laden:', error);
        document.getElementById('popupText').textContent = 'Fehler beim Laden der Definition.';
        document.getElementById('overlay').style.display = 'flex';
      });
  }
});

// Schließen
function closePopup() {
  document.getElementById('overlay').style.display = 'none';
}

function toggleUseCases(button) {
  const box = document.getElementById('useCases');
  const arrow = document.getElementById('arrow');
  const isOpen = box.style.maxHeight && box.style.maxHeight !== '0px';

  if (isOpen) {
    box.style.maxHeight = '0';
    box.style.opacity = '0';
    arrow.style.transform = 'rotate(0deg)';
    button.querySelector('span').textContent = 'Anwendungsfälle anzeigen';
  } else {
    box.style.maxHeight = '500px';
    box.style.opacity = '1';
    arrow.style.transform = 'rotate(180deg)';
    button.querySelector('span').textContent = 'Anwendungsfälle ausblenden';
  }
}

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
    e.preventDefault(); // Verhindert Text markieren & Dragging von Links
    isDragging = true;
    navWrapper.classList.add('active');
    startX = e.pageX - navWrapper.offsetLeft;
    scrollStart = navWrapper.scrollLeft;
  });

  navWrapper.addEventListener('mouseleave', () => {
    // Hier KEIN "isDragging = false" mehr!
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

  // ➡️ Wichtig: Mouseup überall im Fenster abfangen
  window.addEventListener('mouseup', () => {
    isDragging = false;
    navWrapper.classList.remove('active');
  });
}

//MP3 PLAYER
// Audio-Element global
let audio = document.getElementById('audio');

function initAudioPlayer() {
  if (!audio) {
    audio = document.getElementById('audio');
  }
}

// Play-Button Funktion
function playAudio() {
  initAudioPlayer();
  if (audio && audio.src && audio.src.endsWith('.mp3')) {
    audio.play().catch(error => console.error('Fehler beim Abspielen:', error));
  } else {
    console.warn('Keine abspielbare Audiodatei geladen.');
  }
}

// Pause-Button Funktion
function pauseAudio() {
  initAudioPlayer();
  if (audio.src) {
    audio.pause();
  }
}

// Stop-Button Funktion
function stopAudio() {
  initAudioPlayer();
  if (audio.src) {
    audio.pause();
    audio.currentTime = 0;
  }
}

// Lautstärkeregler
function changeVolume() {
  const volumeSlider = document.getElementById('volume-slider');
  const audio = document.getElementById('audio');
  if (audio && volumeSlider) {
    audio.volume = volumeSlider.value;
  }
}

function rewindAudio() {
  const audio = document.getElementById('audio');
  if (audio) {
    audio.currentTime = Math.max(0, audio.currentTime - 5); // 5 Sekunden zurück, aber nicht negativ
  }
}

function forwardAudio() {
  const audio = document.getElementById('audio');
  if (audio) {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 5); // 5 Sekunden vor, aber nicht über Ende hinaus
  }
}



/*Pop-Up Inhalt Loader*/
document.addEventListener('DOMContentLoaded', function () {
  // Alle Links mit der Klasse "definition" finden
  const definitions = document.querySelectorAll('.definition');

  definitions.forEach(function (definition) {
    definition.addEventListener('click', function (event) {
      event.preventDefault(); // Link-Klick unterbrechen

      // Dateipfad aus dem data-text Attribut lesen
      const file = this.getAttribute('data-text');

      // Inhalt der Datei laden
      fetch(file)
        .then(response => {
          if (!response.ok) {
            throw new Error('Datei konnte nicht geladen werden.');
          }
          return response.text();
        })
        .then(data => {
          // Einfach als Alert anzeigen
          alert(data);

          // Alternativ: In ein eigenes Element auf der Seite schreiben (z.B. Modal oder Tooltip)
          // document.getElementById('popup').innerHTML = data;
        })
        .catch(error => {
          console.error('Fehler beim Laden:', error);
          alert('Fehler beim Laden der Definition.');
        });
    });
  });
});

function toggleAccordion(button) {
  const allItems = document.querySelectorAll('.accordion-item');
  const currentItem = button.closest('.accordion-item');
  const isAlreadyOpen = currentItem.classList.contains('open');

  allItems.forEach(item => item.classList.remove('open'));

  if (!isAlreadyOpen) {
    currentItem.classList.add('open');
  }
}