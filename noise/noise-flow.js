const xInc = 0.03;
const yInc = xInc;
const zInc = xInc;
let zOffset = 0;
const scale = 10;
let rows;
let cols;
const numParticles = 100;
let particles = [];
let vectors = []

function setup() {
    createCanvas(200, 200);
    rows = width / scale;
    cols = height / scale;
    rectMode(RADIUS);

    particles = createParticles();
    
    // angleMode(DEGREES);
}

function draw() {
    background(255);
    let xOffset = 0;
    for (let x = 1; x <= rows; x++) {
        yOffset = 0;
        for (let y = 1; y <= cols; y++) {
            const n = noise(xOffset, yOffset, zOffset);
            const color = n * 255;

            // noStroke();
            // fill(color);
            // rect(x * scale, y * scale, scale, scale)

            let v = p5.Vector.fromAngle(n * TWO_PI)
            vectors.push(v);
            stroke(0);
            push();
            translate(x * scale, y * scale);
            rotate(v.heading());
            strokeWeight(1);
            stroke(0, 50)
            line(0, 0, scale + 1, 0);
            pop();

            yOffset += yInc;
        }
        xOffset += xInc;
    }
    // zOffset += zInc;

    updateParticles(particles);
    // noLoop();
}

function createParticles() {
    const parts = []
    for (var i = 0; i < numParticles; i++) {
        parts.push(new Particle());
    }

    return parts;
}

function updateParticles(parts) {
    for (let i = 0; i < parts.length; i++) {
        parts[i].update();
        parts[i].show();
    }
}

