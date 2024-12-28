// Fireworks Canvas
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
    this.radius = 3;
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
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
};

// Particle Constructor
function Particle(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 2 + 1;
    this.velocityX = Math.random() * 4 - 2;
    this.velocityY = Math.random() * 4 - 2;
    this.gravity = 0.05;
    this.alpha = 1;
}

Particle.prototype.update = function() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.velocityY += this.gravity;
    this.alpha -= 0.02;
};

Particle.prototype.draw = function() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
};

// Animation Loop
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.exploded) fireworks.splice(index, 1);
    });

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.alpha <= 0) particles.splice(index, 1);
    });

    requestAnimationFrame(animate);
}

// Launch Fireworks on Button Click
document.getElementById('fireworks-btn').addEventListener('click', () => {
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

// Start Animation
animate();
