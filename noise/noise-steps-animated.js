const xInc = 0.006;
const yInc = xInc;
const numSteps = 10;
const zInc = 0.007;
let zOffset;

function setup() {
    createCanvas(300, 300);
    pixelDensity(1);
    zOffset = 0;
}

function draw() {
    loadPixels();
    let xOffset = 0;
    for (let x = 0; x < width; x++) {
        yOffset = 0;
        for (let y = 0; y < height; y++) {
            const pixel = (x + y * width) * 4;
            const nCur = noise(xOffset, yOffset, zOffset);
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

    zOffset += zInc;
    updatePixels();
}