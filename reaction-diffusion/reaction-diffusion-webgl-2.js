let canvas;
let diffusionShader;
let pg;


const diffusionA = 1;
const diffusionB = 0.6;
const feed = 0.04;
const kill = 0.06;
const deltaT = 1.0;

function preload() {
    diffusionShader = loadShader("diffusion-shader.vert", "diffusion-shader.frag");
}

function setup() {
  colorMode(RGB, 1)
  canvas = createCanvas(windowWidth - 100, windowHeight - 100)
  pixelDensity(1)
  noStroke()
  background(1,0,0)
  fill(1,0,0)
  stroke(0,1,0)
  strokeWeight(5)
  ellipse(width / 2 - 50, height / 2, 50)
  ellipse(width / 2 + 50, height / 2, 50)
  ellipse(width / 2, height / 2 - 50, 50)
  ellipse(width / 2, height / 2 + 50, 50)
  initializeShader()
  

  frameRate(30)
}

function initializeShader() {
    pg = createGraphics(width, height, WEBGL)
    pg.pixelDensity(1)
    // diffusionShader = pg.loadShader("diffusion-shader.vert", "diffusion-shader.frag");

    pg.shader(diffusionShader)

    diffusionShader.setUniform('resolution', [width, height])
    diffusionShader.setUniform('canvas', canvas);
    diffusionShader.setUniform('diffusionA', [diffusionA]);
    diffusionShader.setUniform('diffusionB', [diffusionB]);
    diffusionShader.setUniform('kill', [kill]);
    diffusionShader.setUniform('feed', [feed]);
    diffusionShader.setUniform('deltaT', [deltaT]);
}

function draw() {
  pg.shader(diffusionShader)
  pg.rect(0,0,width, height);
  diffusionShader.setUniform('canvas', pg)

  image(pg, 0, 0)
}