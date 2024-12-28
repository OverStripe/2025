// Fireworks Animation
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let particles = [];

// Firework Constructor
function Firework(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocityY = Math.random() * -4 - 6;
    this.gravity = 0.1;
    this.exploded = false;
    this.particleCount = 50;
}

Firework.prototype.update = function() {
    if (this.velocityY >= 0 && !this.exploded) {
        this.exploded = true;
        for (let i = 0; i < this.particleCount; i++) {
            particles.push(new Particle(this.x, this.y, this.color));
        }
    }
    this.y += this.velocityY;
    this.velocityY += this.gravity;
};

Firework.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
};

// Countdown Timer
const countdown = document.getElementById('countdown');
function updateCountdown() {
    const now = new Date();
    const newYear = new Date('2025-01-01T00:00:00');
    const difference = newYear - now;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    countdown.innerHTML = `🎯 Countdown: ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateCountdown, 1000);

// Play Music and Fireworks
document.getElementById('fireworks-btn').addEventListener('click', () => {
    document.getElementById('celebration-music').play();
    for (let i = 0; i < 5; i++) {
        fireworks.push(
            new Firework(
                Math.random() * canvas.width,
                canvas.height,
                `hsl(${Math.random() * 360}, 100%, 50%)`
            )
        );
    }
});

// Animation Loop
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.exploded) fireworks.splice(index, 1);
    });
    requestAnimationFrame(animate);
}
animate();
