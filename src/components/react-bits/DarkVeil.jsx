import React, { useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Triangle, Vec2 } from 'ogl';
import './DarkVeil.css';

const vertex = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uHueShift;
uniform float uNoise;
uniform float uScan;
uniform float uScanFreq;
uniform float uWarp;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

vec3 hueShift(vec3 color, float hue) {
  float angle = radians(hue);
  const vec3 k = vec3(0.57735, 0.57735, 0.57735);
  float cosAngle = cos(angle);
  return color * cosAngle + cross(k, color) * sin(angle) + k * dot(k, color) * (1.0 - cosAngle);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= uResolution.x / uResolution.y;

  float t = uTime * 0.18;
  p += vec2(
    sin(p.y * 3.4 + t * 2.2),
    cos(p.x * 2.8 - t * 1.7)
  ) * uWarp;

  float veil = noise(p * 1.4 + t) * 0.55 + noise(p * 3.2 - t * 0.8) * 0.28;
  float beam = smoothstep(0.85, -0.15, abs(p.x * 0.44 + p.y * 0.7 - 0.2));
  float vignette = smoothstep(1.4, 0.2, length(p));

  vec3 base = vec3(0.018, 0.022, 0.032);
  vec3 blue = vec3(0.10, 0.20, 0.30);
  vec3 gold = vec3(0.70, 0.52, 0.14);
  vec3 color = mix(base, blue, veil * vignette);
  color += gold * beam * 0.12;
  color = hueShift(color, uHueShift);

  float scanline = sin(gl_FragCoord.y * uScanFreq) * 0.5 + 0.5;
  color *= 1.0 - scanline * scanline * uScan;
  color += (hash(gl_FragCoord.xy + uTime) - 0.5) * uNoise;

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

export default function DarkVeil({
  hueShift = 0,
  noiseIntensity = 0.03,
  scanlineIntensity = 0.08,
  speed = 0.5,
  scanlineFrequency = 1.2,
  warpAmount = 0.08,
  resolutionScale = 1
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return undefined;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      canvas
    });
    const gl = renderer.gl;
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2() },
        uHueShift: { value: hueShift },
        uNoise: { value: noiseIntensity },
        uScan: { value: scanlineIntensity },
        uScanFreq: { value: scanlineFrequency },
        uWarp: { value: warpAmount }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const width = Math.max(1, parent.clientWidth);
      const height = Math.max(1, parent.clientHeight);
      renderer.setSize(width * resolutionScale, height * resolutionScale);
      program.uniforms.uResolution.value.set(width, height);
    };

    let frame = 0;
    const start = performance.now();
    const loop = () => {
      program.uniforms.uTime.value = ((performance.now() - start) / 1000) * speed;
      program.uniforms.uHueShift.value = hueShift;
      program.uniforms.uNoise.value = noiseIntensity;
      program.uniforms.uScan.value = scanlineIntensity;
      program.uniforms.uScanFreq.value = scanlineFrequency;
      program.uniforms.uWarp.value = warpAmount;
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    resize();
    loop();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      const loseContext = gl.getExtension('WEBGL_lose_context');
      if (loseContext) loseContext.loseContext();
    };
  }, [hueShift, noiseIntensity, scanlineIntensity, speed, scanlineFrequency, warpAmount, resolutionScale]);

  return <canvas ref={canvasRef} className="darkveil-canvas" aria-hidden="true" />;
}
