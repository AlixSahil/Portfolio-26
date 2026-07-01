import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 4200;
const RADIUS = 1.55;

// A sphere built from thousands of GPU points that rotate and disperse outward as the
// section scrolls past (`progress` is a motion MotionValue in [0,1]).
function ParticleSphere({ progress }) {
  const points = useRef(null);
  const material = useRef(null);
  const smooth = useRef(0);

  const geometry = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const randoms = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);
    const gold = new THREE.Color('#f3cf61');
    const purple = new THREE.Color('#9a5cff');
    const light = new THREE.Color('#d9c2ff');

    for (let i = 0; i < COUNT; i++) {
      // Fibonacci sphere → even distribution.
      const t = (i + 0.5) / COUNT;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = Math.PI * (1 + Math.sqrt(5)) * i;
      positions[i * 3] = RADIUS * Math.sin(inclination) * Math.cos(azimuth);
      positions[i * 3 + 1] = RADIUS * Math.sin(inclination) * Math.sin(azimuth);
      positions[i * 3 + 2] = RADIUS * Math.cos(inclination);
      randoms[i] = Math.random();

      const c = Math.random();
      const col = c > 0.86 ? gold : c > 0.6 ? light : purple;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((state, delta) => {
    const target = progress ? Math.min(Math.max(progress.get(), 0), 1) : 0;
    // Ease toward the scroll value (frame-rate independent) so the morph glides rather
    // than snapping — still driven by scroll position, just smoothed.
    smooth.current += (target - smooth.current) * Math.min(1, delta * 3.5);
    const p = smooth.current;
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
      material.current.uniforms.uProgress.value = p;
      material.current.uniforms.uDpr.value = state.gl.getPixelRatio();
    }
    if (points.current) {
      points.current.rotation.y = p * Math.PI * 1.2 + state.clock.elapsedTime * 0.04;
      points.current.rotation.x = p * Math.PI * 0.28;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uDpr: { value: 1 },
          uSize: { value: 26 }
        }}
        vertexShader={`
          attribute float aRandom;
          attribute vec3 aColor;
          uniform float uTime;
          uniform float uProgress;
          uniform float uDpr;
          uniform float uSize;
          varying vec3 vColor;
          void main() {
            vColor = aColor;
            vec3 pos = position;
            // Breathe out then back in (peak at mid-scroll) so the sphere reforms and
            // never scatters out of the frame at the ends. Subtle amplitude.
            float disp = sin(uProgress * 3.14159265) * (0.12 + aRandom * 0.55);
            float wobble = sin(uTime * 0.5 + aRandom * 6.2831) * 0.04;
            pos += normalize(position) * (disp + wobble);
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = uSize * uDpr * (0.45 + aRandom) / -mv.z;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.08, d);
            gl_FragColor = vec4(vColor, alpha * 0.92);
          }
        `}
      />
    </points>
  );
}

export default function ScrollScene({ progress }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.8], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <ParticleSphere progress={progress} />
    </Canvas>
  );
}
