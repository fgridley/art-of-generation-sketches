let rows;
let columns;
const xInc = 0.04;
const yInc = 0.04;
const xDist = 10;
const yDist = 10;

function setup() {
    createCanvas(2000,2000);

    rows = round(width / xDist);
    columns = round(height / yDist);
    rectMode(RADIUS);
    fill(0);
    noStroke();
}

function draw() {
    let xOffset = 0
    for (let i = 0; i < rows; i++) {
        let yOffset = 0
        for (let j = 0; j < columns; j++) {
            const radius = noise(xOffset, yOffset) * 7 + 4
            ellipse(i*xDist, j*yDist, radius)
            // rect(i*xDist, j*yDist, radius, radius)
            yOffset += yInc;
        }
        xOffset += xInc;
    }
    noLoop();
}

// function mousePressed() {
//     save('noise-shape-size.png');
// }