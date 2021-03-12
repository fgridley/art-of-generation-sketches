const xInc = 0.01;
const yInc = xInc;

function setup() {
    createCanvas(700, 900);
    pixelDensity(1);
}

function draw() {
    loadPixels();
    let xOffset = 0;
    for (let x = 0; x < width; x++) {
        yOffset = 0;
        for (let y = 0; y < height; y++) {
            const pixel = (x + y * width) * 4;
            const color = random() * 256;
            pixels[pixel + 0] = color;
            pixels[pixel + 1] = color;
            pixels[pixel + 2] = color;
            pixels[pixel + 3] = 255;
            yOffset += yInc;
        }
        xOffset += xInc;
    }

    updatePixels();
    noLoop();
}

