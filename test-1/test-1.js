// let noiseVal;
// const noiseScale = 0.2;
// const rows = 50;
// const cols = 50;
// let rowDist;
// let colDist;

// function setup() {
//   createCanvas(400, 400);
//   rowDist = height / rows;
//   colDist = width / cols;
// }

// function draw() {
//     background(255);
//     // for (let y = 0; y < height / rowDist; y++) {
//     //     for (let x = 0; x < width / colDist; x++) {
//     //       // noiceDetail of the pixels octave count and falloff value
//     //       noiseDetail(2, 0.2);
//     //       noiseVal = noise(x * noiseScale, y * noiseScale);
//     //       circle(x * colDist, y * rowDist, noiseVal * 30);
//     //     }
//     // }
//     for (let y = 0; y < height; y++) {
//         for (let x = 0; x < width; x++) {
//             // noiceDetail of the pixels octave count and falloff value
//             // noiseDetail(2, 0.2);
//             noiseDetail(2, 0.2);
//             noiseVal = noise(x * noiseScale, y * noiseScale);
//             stroke(noiseVal * 255);
//             point(x, y);
//         }
//     }
// }


let noiseVal;
let noiseScale = 0.02;

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(0);
  // Draw the left half of image
  for (let y = 0; y < height - 30; y++) {
    for (let x = 0; x < width / 2; x++) {
      // noiceDetail of the pixels octave count and falloff value
      noiseDetail(1, 0.01);
      noiseVal = noise(x * noiseScale, y * noiseScale);
      stroke(noiseVal * 255);
      point(x, y);
    }
  }
  // Draw the right half of image
  for (let y = 0; y < height - 30; y++) {
    for (let x = width / 2; x < width; x++) {
      // noiceDetail of the pixels octave count and falloff value
      noiseDetail(6, 0.6);
      noiseVal = noise(x * noiseScale, + y * noiseScale);
      stroke(noiseVal * 255);
      point(x, y);
    }
  }
}
