const xInc = 0.02;
const yInc = xInc;
const numSteps = 16;
const xDist = 10;
const yDist = 10;

function setup() {
    createCanvas(800, 800);
    pixelDensity(1);
    rectMode(RADIUS);
    noStroke();
}

function draw() {
    drawSquares();
    noLoop();
}

function drawSquares() {
    let xOffset = 0;
    for (let x = 0; x < width / xDist; x++) {
        yOffset = 0;
        for (let y = 0; y < height / yDist; y++) {
            const nCur = noise(xOffset, yOffset);
            const noiseNormalized = ceil(nCur * numSteps)
            const color = noiseNormalized * (256 / numSteps);
            fill(color);
            rect(x*xDist, y*yDist, xDist, yDist);
            yOffset += yInc;
        }
        xOffset += xInc;
    }
}

function drawPixels() {
    loadPixels();
    let xOffset = 0;
    for (let x = 0; x < width; x++) {
        yOffset = 0;
        for (let y = 0; y < height; y++) {
            const pixel = (x + y * width) * 4;
            const nCur = noise(xOffset, yOffset);
            const noiseNormalized = ceil(nCur * numSteps)
            const color = noiseNormalized * (256 / numSteps);
            pixels[pixel + 0] = color;
            pixels[pixel + 1] = color;
            pixels[pixel + 2] = color;
            pixels[pixel + 3] = 255;
            yOffset += yInc;
        }
        xOffset += xInc;
    }

    updatePixels();
}