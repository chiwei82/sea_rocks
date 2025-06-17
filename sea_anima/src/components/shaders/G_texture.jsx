export const GroundVertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const shader_1 = `
precision mediump float;

uniform float uTime;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;

    float scale = 1000.0;

    vec2 grid = floor(uv * scale) / scale;
    float wave = sin(grid.y * 10.0 + uTime) * 0.1;
    
    vec2 centerUV = fract(uv * scale) - 0.5;
    centerUV.x += wave;
    
    float gray = sin(uv.x * 10.0 + uTime) * 0.5 + 0.5;
    float radius = 0.25 * (1.0 - gray);

    float dist = length(centerUV);
    float mask = smoothstep(radius, radius - 0.01, dist);

    gl_FragColor = vec4(vec3(mask * 0.3), mask);
}
`;

export const GroundFragmentShader = shader_1;
