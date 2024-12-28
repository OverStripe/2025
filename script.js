// 🌟 DOM Elements
const modal = document.getElementById('modal');
const usernameInput = document.getElementById('username');
const startBtn = document.getElementById('start-btn');
const content = document.querySelector('.content');
const greeting = document.getElementById('greeting');
const celebrateBtn = document.getElementById('celebrate-btn');
const musicBtn = document.getElementById('music-btn');
const music = document.getElementById('background-music');
const fireworksCanvas = document.getElementById('fireworks');
const ctx = fireworksCanvas.getContext('2d');

// 🌟 Adjust Canvas Size
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

// 🌟 Handle Modal Input
startBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        // Set personalized greeting
        greeting.textContent = `✨ Happy New Year, ${username}! ✨`;

        // Hide Modal with Smooth Transition
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            content.style.display = 'block';
        }, 500);

        // Play Music
        music.play();
    } else {
        usernameInput.classList.add('error');
        setTimeout(() => usernameInput.classList.remove('error'), 1000);
    }
});

// 🌟 Background Music Toggle
let isMusicPlaying = true;
musicBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
        music.pause();
        musicBtn.textContent = '🎵 Play Music 🎵';
    } else {
        music.play();
        musicBtn.textContent = '🎵 Pause Music 🎵';
    }
    isMusicPlaying = !isMusicPlaying;
});

// 🌟 Fireworks Effect
let fireworks = [];
class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.velocityX = Math.random() * 4 - 2;
        this.velocityY = Math.random() * -4 - 4;
        this.alpha = 1;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.velocityY += 0.05;
        this.alpha -= 0.01;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// 🌟 Create Fireworks
function createFireworks(x, y) {
    for (let i = 0; i < 50; i++) {
        fireworks.push(new Firework(x, y));
    }
}

// 🌟 Animation Loop
function animateFireworks() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();

        if (firework.alpha <= 0) {
            fireworks.splice(index, 1);
        }
    });

    requestAnimationFrame(animateFireworks);
}
animateFireworks();

// 🌟 Confetti Animation
function startConfetti() {
    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.id = 'confetti';
    confettiCanvas.style.position = 'fixed';
    confettiCanvas.style.top = '0';
    confettiCanvas.style.left = '0';
    confettiCanvas.style.width = '100vw';
    confettiCanvas.style.height = '100vh';
    confettiCanvas.style.pointerEvents = 'none';
    document.body.appendChild(confettiCanvas);

    const confettiCtx = confettiCanvas.getContext('2d');
    const confettiParticles = [];

    // Create Confetti Particle
    class ConfettiParticle {
        constructor() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight - window.innerHeight;
            this.size = Math.random() * 5 + 2;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.velocityX = Math.random() * 2 - 1;
            this.velocityY = Math.random() * 3 + 2;
            this.rotation = Math.random() * 360;
        }

        update() {
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.rotation += 5;
            if (this.y > window.innerHeight) {
                this.y = Math.random() * window.innerHeight - window.innerHeight;
                this.x = Math.random() * window.innerWidth;
            }
        }

        draw() {
            confettiCtx.save();
            confettiCtx.translate(this.x, this.y);
            confettiCtx.rotate((this.rotation * Math.PI) / 180);
            confettiCtx.fillStyle = this.color;
            confettiCtx.fillRect(0, 0, this.size, this.size);
            confettiCtx.restore();
        }
    }

    // Generate Confetti Particles
    for (let i = 0; i < 150; i++) {
        confettiParticles.push(new ConfettiParticle());
    }

    // Animate Confetti
    function animateConfetti() {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiParticles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateConfetti);
    }

    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    animateConfetti();

    // Stop Confetti after 10 seconds
    setTimeout(() => {
        confettiCanvas.remove();
    }, 10000);
}

// 🌟 Celebrate Button Click Event
celebrateBtn.addEventListener('click', () => {
    // Trigger fireworks
    for (let i = 0; i < 5; i++) {
        createFireworks(
            Math.random() * fireworksCanvas.width,
            Math.random() * fireworksCanvas.height / 2
        );
    }

    // Trigger Confetti
    startConfetti();
});
