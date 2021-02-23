let grid;
let next;
const diffusionA = 0.8;
const diffusionB = 0.35;
const feed = 0.055;
const kill = 0.062;
const deltaT = 1.0;

function setup() {
  createCanvas(300, 300);
  pixelDensity(1);
  grid = [];
  next = [];

  for (let x = 0; x < width; x++) {
      grid[x] = [];
      next[x] = [];
      for (let y = 0; y < height; y++) {
          grid[x][y] = { a: 1, b: 0};
          next[x][y] = { a: 1, b: 0};
      }
  }

//   for (let x = width / 2 - 10; x < width/2 + 10; x++) {
//     for (let y = height / 2 - 10; y < height / 2 + 10; y++) {
//         grid[x][y] = { a: 0, b: 1};
//     }
// }
}

function draw() {
  background(0);

  // Calculates new a and b chemical values
  for (let x = 1; x < width - 1; x++) {
    for (let y = 1; y < height - 1; y++) {
        const a = grid[x][y].a;
        const b = grid[x][y].b;
        next[x][y].a = a + (deltaT * ((diffusionA * laplacian(x,y,"a")) - (a * b * b) + (feed * (1 - a))));
        next[x][y].b = b + (deltaT * ((diffusionB * laplacian(x,y,"b")) + (a * b * b) - ((kill + feed) * b)));;

        next[x][y].a = constrain(next[x][y].a, 0, 1);
        next[x][y].b = constrain(next[x][y].b, 0, 1)
    }
  }

  

  loadPixels();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        // calculates position in p5js pixel array at position (x,y)
        const pix = (x + y * width) * 4;
        const colorVal = next[x][y].a*255

        // sets rgba color values for pixel at position (x,y)
        pixels[pix + 0] = colorVal;
        pixels[pix + 1] = colorVal;
        pixels[pix + 2] = colorVal;
        pixels[pix + 3] = 255;
    }
  }
  updatePixels();

  updateGrid();
}

function updateGrid() {
    grid = next;
}

function laplacian(x, y, chem) {
    let sum = 0;
    sum += grid[x][y][chem] * -1;
    sum += grid[x - 1][y][chem] * 0.2;
    sum += grid[x + 1][y][chem] * 0.2;
    sum += grid[x][y + 1][chem] * 0.2;
    sum += grid[x][y - 1][chem] * 0.2;
    sum += grid[x - 1][y - 1][chem] * 0.05;
    sum += grid[x + 1][y - 1][chem] * 0.05;
    sum += grid[x + 1][y + 1][chem] * 0.05;
    sum += grid[x - 1][y + 1][chem] * 0.05;
    return sum;
}

function mousePressed() {
    for (let x = mouseX - 5; x < mouseX + 5; x++) {
        for (let y = mouseY - 5; y < mouseY + 5; y++) {
            grid[x][y] = { a: 0, b: 1};
        }
    }
  }