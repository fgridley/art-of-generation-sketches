const xInc = 0.03;
const yInc = xInc;
const zInc = xInc;
let zOffset = 0;
const scale = 5;
let rows;
let cols;

function setup() {
    createCanvas(200, 200);
    rows = width / scale;
    cols = height / scale;
}

function draw() {
    background(255);
    let xOffset = 0;
    for (let x = 1; x <= rows; x++) {
        yOffset = 0;
        for (let y = 1; y <= cols; y++) {
            const n = noise(xOffset, yOffset, zOffset);
            const color = n * 255;

            let v = p5.Vector.fromAngle(n * TWO_PI)
            stroke(0);
            push();
            translate(x * scale, y * scale);
            rotate(v.heading());
            line(0, 0, scale + 1, 0);
            pop();

            yOffset += yInc;
        }
        xOffset += xInc;
    }
    zOffset += zInc;
    // noLoop();
}

