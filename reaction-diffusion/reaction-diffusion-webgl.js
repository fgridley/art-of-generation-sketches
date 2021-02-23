
const diffusionA = 0.8;
const diffusionB = 0.35;
const feed = 0.055;
const kill = 0.062;
const deltaT = 1.0;
const winHeight = 400;
const winWidth = 400;

let diffusionShader;
let frameBuff;
let tex = 
{
  last : null,
  cur : null,
  swap : function() {
    var tmp = this.last;
    this.last = this.cur;
    this.cur = tmp;
  }
};

let gl;

function preload() {
    diffusionShader = loadShader("diffusion-shader.vert", "diffusion-shader.frag");
}

function setup() {
    pixelDensity(1);

    createCanvas(winWidth, winHeight, WEBGL);
    noStroke();

    gl = drawingContext;

    frameBuff = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuff);

    console.log(gl);

    tex.last = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex.last);
    {
        const level = 0;
        const internalFormat = gl.RGBA;
        const border = 0;
        const format = gl.RGBA;
        const type = gl.UNSIGNED_BYTE;
        const data = null;
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                      width, height, border,
                      format, type, data);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    tex.cur = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex.cur);
    {
        const level = 0;
        const internalFormat = gl.RGBA;
        const border = 0;
        const format = gl.RGBA;
        const type = gl.UNSIGNED_BYTE;
        const data = null;
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    width, height, border,
                    format, type, data);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    initializeCanvas();
}

function draw() {
    shader(diffusionShader)
    updateCanvas();
    
}

// function windowResized(){
//     resizeCanvas(windowWidth, windowHeight);
// }

function initializeCanvas() {
    const attachmentPoint = gl.COLOR_ATTACHMENT0;
    const level = 0;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, tex.cur, level);
    // frameBuff.background(0);
    // frameBuff.fill(0);
    // frameBuff.rect(0,0,winWidth, winHeight);
    // frameBuff.fill(255)
    // frameBuff.ellipse(winWidth/2, winHeight/2, 20, 20)

    background(0);
    fill(0);
    rect(0,0,winWidth, winHeight);
    fill(255)
    ellipse(winWidth/2, winHeight/2, 20, 20)

    tex.swap();
    console.log(tex);
}

function updateCanvas() {
    const attachmentPoint = gl.COLOR_ATTACHMENT0;
    const level = 0;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, tex.cur, level);

    diffusionShader.setUniform('resolution', [winWidth, winHeight])
    diffusionShader.setUniform('tex', tex.last);
    diffusionShader.setUniform('diffusionA', [diffusionA]);
    diffusionShader.setUniform('diffusionB', [diffusionB]);
    diffusionShader.setUniform('kill', [kill]);
    diffusionShader.setUniform('feed', [feed]);
    diffusionShader.setUniform('deltaT', [deltaT]);

    tex.swap();
}