export const SeaWaveVertexShader = `
uniform float time;
varying vec2 vUv;

void main() {
    vUv = uv;

    vec3 pos = position;

    float waveX = sin(pos.x * 2.0 + time * 2.0) * 0.05;
    float waveY = cos(pos.y * 2.0 + time * 2.5) * 0.05;

    pos.z += waveX + waveY;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const SeaWaveFragmentShader = `
varying vec2 vUv;
void main() {
    gl_FragColor = vec4(vUv, 1.0, 1.0);
}
`;