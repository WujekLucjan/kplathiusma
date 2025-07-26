// Poniżej Twoja funkcja zmiany motywu z script.js
function changeTheme(theme) {
    document.body.classList.remove('theme-white', 'theme-red', 'theme-black');
    document.body.classList.add(`theme-${theme}`); // Poprawiono: użyto backticków

    const favicon = document.getElementById('favicon');
    if (favicon) { // Dodano sprawdzenie, czy favicon istnieje
        favicon.href = `img/moon_${theme}.png`; // Poprawiono: użyto backticków
    }

    localStorage.setItem('theme', theme);
}

// Załaduj zapisany motyw
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'black';
    changeTheme(savedTheme);
    initAudioPlayers();
});

// ----------- NIestandardowy odtwarzacz audio ------------

function initAudioPlayers() {
    const audioBlocks = document.querySelectorAll('.audio-block');

    audioBlocks.forEach(block => {
        const src = block.dataset.src;
        const audio = new Audio(src);
        audio.preload = 'metadata';

        const btn = block.querySelector('.btn-playpause');
        const progressContainer = block.querySelector('.progress-container');
        const progressBar = block.querySelector('.progress');
        const timeDisplay = block.querySelector('.time');

        // Play/Pause toggle
        btn.addEventListener('click', () => {
            if (audio.paused) {
                // zatrzymaj inne
                document.querySelectorAll('.audio-block').forEach(otherBlock => {
                    if (otherBlock !== block && otherBlock._audio && !otherBlock._audio.paused) {
                        otherBlock._audio.pause();
                        otherBlock.querySelector('.btn-playpause').innerHTML = '&#9658;'; // play
                    }
                });
                audio.play();
            } else {
                audio.pause();
            }
        });

        // Aktualizacja przycisku
        audio.addEventListener('play', () => {
            btn.innerHTML = '&#10073;&#10073;'; // pauza
        });
        audio.addEventListener('pause', () => {
            btn.innerHTML = '&#9658;'; // play
        });

        // Aktualizacja paska postępu i czasu
        audio.addEventListener('timeupdate', () => {
            if (audio.duration) {
                const progressPercent = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = progressPercent + '%';

                timeDisplay.textContent = formatTime(audio.currentTime);
            }
        });

        // Kliknięcie w pasek postępu - przeskok
        progressContainer.addEventListener('click', e => {
            const rect = progressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const newTime = (clickX / width) * audio.duration;
            audio.currentTime = newTime;
        });

        // Zapis audio w elemencie, aby łatwo było odwołać się do niego (np. do zatrzymania innych)
        block._audio = audio;
    });
}

// Format czasu w mm:ss
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`; // Poprawiono: użyto backticków
}

const canvas = document.getElementById('ashParticles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.5 + 0.5;
    this.speed = Math.random() * 0.5 + 0.2;
    this.alpha = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.reset();
      this.y = 0;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 200, 200, ${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < 100; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

  const roseContainer = document.getElementById("rose-container");

  function createRosePetal() {
    const petal = document.createElement("img");
    petal.src = "img/rose_petals.png";
    petal.className = "rose-petal";

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 4 + Math.random() * 3 + "s";
    petal.style.opacity = Math.random();
    petal.style.transform = `rotate(${Math.random() * 360}deg)`;

    roseContainer.appendChild(petal);

    setTimeout(() => {
      roseContainer.removeChild(petal);
    }, 7000);
  }

  setInterval(createRosePetal, 400);
