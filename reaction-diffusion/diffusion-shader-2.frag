#ifdef GL_ES
precision highp float;
precision highp int;
#endif

uniform sampler2D tex;
uniform vec2 texOffset;

uniform vec2 resolution;
uniform float feed;
uniform float kill;
uniform float deltaT;
uniform float diffusionA;
uniform float diffusionB;

// varying vec4 vertColor;
// varying vec4 vertTexCoord;

void main() {
    vec2 posn = gl_FragCoord.xy / resolution;
    vec2 delta = 1. / resolution;

  vec2 tc0 = posn + vec2(-delta.s, -delta.t);
  vec2 tc1 = posn + vec2(     0.0, -delta.t);
  vec2 tc2 = posn + vec2(+delta.s, -delta.t);
  vec2 tc3 = posn + vec2(-delta.s,      0.0);
  vec2 tc4 = posn + vec2(     0.0,      0.0);
  vec2 tc5 = posn + vec2(+delta.s,      0.0);
  vec2 tc6 = posn + vec2(-delta.s, +delta.t);
  vec2 tc7 = posn + vec2(     0.0, +delta.t);
  vec2 tc8 = posn + vec2(+delta.s, +delta.t);

  vec4 col0 = texture2D(tex, tc0);
  vec4 col1 = texture2D(tex, tc1);
  vec4 col2 = texture2D(tex, tc2);
  vec4 col3 = texture2D(tex, tc3);
  vec4 col4 = texture2D(tex, tc4);
  vec4 col5 = texture2D(tex, tc5);
  vec4 col6 = texture2D(tex, tc6);
  vec4 col7 = texture2D(tex, tc7);
  vec4 col8 = texture2D(tex, tc8);

  vec2 uv = texture2D(tex, posn).rg;

  vec4 lapl = ( .05 * col0 + .2 * col1 + .05 * col2 +  
              .2 * col3  - 1.0 * col4 + .2 * col5 +
              .05 * col6 + .2 * col7 + .05 * col8); 

  float rate = uv.r * uv.g * uv.g;
  float du = diffusionA * lapl.r - rate + feed * (1.0 - uv.r);
  float dv = diffusionB * lapl.g + rate - (feed+kill) * uv.g;  

  float u = clamp(uv.r + du*deltaT,0.0,1.0); 
  float v = clamp(uv.g + dv*deltaT,0.0,1.0); 

  gl_FragColor = vec4( u, v,0.0, 1.0); 
}