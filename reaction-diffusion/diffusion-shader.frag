// These are necessary definitions that let you graphics card know how to render the shader
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform sampler2D canvas;

uniform float diffusionA;
uniform float diffusionB;
uniform float kill;
uniform float feed;
uniform float deltaT;

vec2 outFrag;

void main() {
    vec2 posn = gl_FragCoord.xy / resolution;
    vec2 val = texture2D(canvas, posn).rg;
    vec2 delta = 1. / resolution;
    vec2 lap = -val;

    lap += texture2D(canvas, posn - vec2(-delta.x, 0.)).rg * 0.20;
    lap += texture2D(canvas, posn - vec2(delta.x, 0.)).rg * 0.20;
    lap += texture2D(canvas, posn - vec2(0., -delta.y)).rg * 0.20;
    lap += texture2D(canvas, posn - vec2(0., delta.y)).rg * 0.20;
    lap += texture2D(canvas, posn - vec2(-delta.x, -delta.y)).rg * 0.05;
    lap += texture2D(canvas, posn - vec2(delta.x, -delta.y)).rg * 0.05;
    lap += texture2D(canvas, posn - vec2(-delta.x, delta.y)).rg * 0.05;
    lap += texture2D(canvas, posn - vec2(delta.x, delta.y)).rg * 0.05;
    
    float nA = diffusionA * lap.r - val.r * val.g * val.g + feed * (1.0 - val.r);
    float nB = diffusionB * lap.g + val.r * val.g * val.g - (feed + kill) * val.g;
    
    outFrag = val + vec2(nA, nB) * deltaT;

    gl_FragColor = vec4(outFrag, 0.0, 1.0);
}


    
    // lap += textureOffset(canvas, posn, ivec2(-1, 0)).rg * 0.20;
    // lap += textureOffset(canvas, posn, ivec2(+1, 0)).rg * 0.20;
    // lap += textureOffset(canvas, posn, ivec2( 0,-1)).rg * 0.20;
    // lap += textureOffset(canvas, posn, ivec2( 0,+1)).rg * 0.20;
    // lap += textureOffset(canvas, posn, ivec2(-1,-1)).rg * 0.05;
    // lap += textureOffset(canvas, posn, ivec2(+1,-1)).rg * 0.05;
    // lap += textureOffset(canvas, posn, ivec2(-1,+1)).rg * 0.05;
    // lap += textureOffset(canvas, posn, ivec2(+1,+1)).rg * 0.05;