// const xInc = 0.006;
// const yInc = xInc;
// const numSteps = 1;
// let fbo;

// function setup() {
//     createCanvas(200,100);
//     fbo = createGraphics(100,100);
//     pixelDensity(1);
//     fbo.pixelDensity(1);
// }

// function draw() {
//     drawNoise();
//     image(fbo, 100, 0);
//     dither();
//     noLoop();
// }

// function pixelIndex(x, y) {
//     return (x + y * fbo.width) * 4;
// }

// function drawNoise() {
//     fbo.loadPixels();
//     let xOffset = 0;
//     for (let x = 0; x < fbo.width; x++) {
//         yOffset = 0;
//         for (let y = 0; y < fbo.height; y++) {
//             const pixel = pixelIndex(x,y);
//             const n = noise(xOffset, yOffset);
//             const color = n * 255;
//             // console.log(color);
//             const stepColor = round(n * numSteps) * floor(255 / numSteps);
//             fbo.pixels[pixel + 0] = color;
//             fbo.pixels[pixel + 1] = color;
//             fbo.pixels[pixel + 2] = color;
//             fbo.pixels[pixel + 3] = 255;
//             yOffset += yInc;
//         }
//         xOffset += xInc;
//     }
//     fbo.updatePixels();
// }

// function applyColor(x, y, color) {
//     const pixel = pixelIndex(x,y);
//     pixels[pixel] = color;
//     pixels[pixel + 1] = color;
//     pixels[pixel + 2] = color;
//     pixels[pixel + 3] = 255;
// }

// function applyError(x, y, error) {
//     addError(7 / 16.0, x + 1, y, error);
//     addError(3 / 16.0, x - 1, y + 1, error);
//     addError(5 / 16.0, x, y + 1, error);
//     addError(1 / 16.0, x + 1, y + 1, error);
// }

// function addError(f, x, y, error) {
//     if (x < 0 || x >= width || y < 0 || y >= height) return;
//     const pixel = pixelIndex(x, y);
//     applyColor(x, y, pixels[pixel] + (f * error))
// }

// function dither() {
//     fbo.loadPixels();
//     loadPixels();
    
//     for (let x = 0; x < fbo.width; x++) {
//         for (let y = 0; y < fbo.height; y++) {
//             const pixel = pixelIndex(x,y);
//             const pixColor = fbo.pixels[pixel] / 255;
//             // console.log(pixColor);
//             const pixColorStep = round(pixColor * numSteps) * floor(255 / numSteps);

//             applyColor(x, y, pixColorStep);

//             applyError(x, y, pixColor - pixColorStep)
//         }
//     }
//     fbo.updatePixels();
//     updatePixels();
// }

let noiseImg;
const xInc = 0.006;
const yInc = xInc;
const numSteps = 4;
const imgHeight = 200;

function setup() {
    createCanvas(imgHeight * 2, imgHeight);
    noiseImg = createGraphics(imgHeight,imgHeight);
    // pixelDensity(1);
    noiseImg.pixelDensity(1);

    drawNoise();
    image(noiseImg, imgHeight, 0);

    noStroke();
    fill(0);
    // ditherImage(noiseImg);
    // image(noiseImg, imgHeight, 0);
}

function imgIndex(img, x, y) {
    return (x + y * img.width) * 4;
}

function drawNoise() {
    noiseImg.loadPixels();
    let xOffset = 0;
    for (let x = 0; x < noiseImg.width; x++) {
        let yOffset = 0;
        for (let y = 0; y < noiseImg.height; y++) {
            const pixel = imgIndex(noiseImg, x,y);
            const n = noise(xOffset, yOffset);
            const color = n * 255;
            // console.log(color);
            const stepColor = round(n * numSteps) * floor(255 / numSteps);
            noiseImg.pixels[pixel + 0] = stepColor;
            noiseImg.pixels[pixel + 1] = stepColor;
            noiseImg.pixels[pixel + 2] = stepColor;
            noiseImg.pixels[pixel + 3] = 255;
            yOffset += yInc;
        }
        xOffset += xInc;
    }
    noiseImg.updatePixels();
}

// function ditherImage(img) {
//     img.loadPixels();
//     img.noStroke();

//     for (let x = 0; x < img.width; x++) {
//         for (let y = 0; y < img.height; y++) {
//             const idx = imgIndex(img, x,y);
//             const col = color(img.pixels[idx], img.pixels[idx + 1], img.pixels[idx + 2], img.pixels[idx + 3])
//             console.log(col);
//         }
//     }

//     img.updatePixels();
// }

function draw() {
    const randX = round(random(noiseImg.width));
    const randY = round(random(noiseImg.height));
    const idx = imgIndex(noiseImg, randX, randY);
    const pixColor = noiseImg.pixels[idx];
    const randProb = round(random(255));


    if (randProb > pixColor) {
        ellipse(randX, randY, 1, 1)
    }
}