import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RADIUS = 1.55;

// A sphere of thousands of GPU points. Driven by `progress` (a motion MotionValue in
// [0,1] tied to scroll position): scrolling DOWN grows progress and the sphere disperses
// in a swirling scatter; scrolling UP shrinks progress and the particles spiral back home.
function ParticleSphere({ progress, count }) {
  const COUNT = count;
  const points = useRef(null);
  const material = useRef(null);
  const smooth = useRef(0);

  const geometry = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const randoms = new Float32Array(COUNT);
    const axes = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const gold = new THREE.Color('#f3cf61');
    const purple = new THREE.Color('#9a5cff');
    const light = new THREE.Color('#e4d4ff');

    for (let i = 0; i < COUNT; i++) {
      // Fibonacci sphere → even distribution.
      const t = (i + 0.5) / COUNT;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = Math.PI * (1 + Math.sqrt(5)) * i;
      positions[i * 3] = RADIUS * Math.sin(inclination) * Math.cos(azimuth);
      positions[i * 3 + 1] = RADIUS * Math.sin(inclination) * Math.sin(azimuth);
      positions[i * 3 + 2] = RADIUS * Math.cos(inclination);
      randoms[i] = Math.random();

      // Per-particle random unit axis → each point spirals around its own axis when it
      // disperses, giving the scatter a swirling, galaxy-like motion.
      let ax = Math.random() * 2 - 1;
      let ay = Math.random() * 2 - 1;
      let az = Math.random() * 2 - 1;
      const len = Math.hypot(ax, ay, az) || 1;
      axes[i * 3] = ax / len;
      axes[i * 3 + 1] = ay / len;
      axes[i * 3 + 2] = az / len;

      const c = Math.random();
      const col = c > 0.86 ? gold : c > 0.58 ? light : purple;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute('aAxis', new THREE.BufferAttribute(axes, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [COUNT]);

  useFrame((state, delta) => {
    const target = progress ? Math.min(Math.max(progress.get(), 0), 1) : 0;
    // Ease toward the scroll value (frame-rate independent) so the morph glides rather
    // than snapping — still driven by scroll position, just smoothed.
    smooth.current += (target - smooth.current) * Math.min(1, delta * 3.2);
    const p = smooth.current;
    const eased = p * p * (3 - 2 * p);
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
      material.current.uniforms.uProgress.value = p;
      material.current.uniforms.uDpr.value = state.gl.getPixelRatio();
    }
    if (points.current) {
      // Idle drift + a stronger turn as it disperses, so the scatter feels alive.
      points.current.rotation.y = eased * Math.PI * 0.7 + state.clock.elapsedTime * 0.05;
      points.current.rotation.x = eased * Math.PI * 0.12;
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
          uSize: { value: 24 }
        }}
        vertexShader={`
          attribute float aRandom;
          attribute vec3 aAxis;
          attribute vec3 aColor;
          uniform float uTime;
          uniform float uProgress;
          uniform float uDpr;
          uniform float uSize;
          varying vec3 vColor;
          varying float vTwinkle;

          // Rodrigues axis-angle rotation (columns = columns of R).
          mat3 rotAxis(vec3 a, float ang) {
            float s = sin(ang), c = cos(ang), oc = 1.0 - c;
            return mat3(
              c + oc*a.x*a.x,      oc*a.x*a.y + s*a.z,  oc*a.x*a.z - s*a.y,
              oc*a.x*a.y - s*a.z,  c + oc*a.y*a.y,      oc*a.y*a.z + s*a.x,
              oc*a.x*a.z + s*a.y,  oc*a.y*a.z - s*a.x,  c + oc*a.z*a.z
            );
          }

          void main() {
            vColor = aColor;
            float p = uProgress;                    // 0 = formed, 1 = dispersed
            float eased = p * p * (3.0 - 2.0 * p);  // smoother ease

            vec3 base = position;
            vec3 dir = normalize(position);

            // Spiral each particle around its own axis, farther as it disperses.
            float spin = eased * (2.2 + aRandom * 5.5);
            vec3 swirled = rotAxis(aAxis, spin) * base;

            // Outward push — varied per particle so it scatters into a cloud with depth.
            float dist = eased * (0.5 + aRandom * 2.2);
            vec3 pos = swirled + dir * dist;

            // Gentle idle drift so the formed sphere is never static, stronger mid-scatter.
            pos += vec3(
              sin(uTime * 0.40 + aRandom * 6.2831),
              cos(uTime * 0.34 + aRandom * 5.0),
              sin(uTime * 0.47 + aRandom * 4.0)
            ) * (0.028 + eased * 0.09);

            vTwinkle = 0.62 + 0.38 * sin(uTime * 2.0 + aRandom * 6.2831);

            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mv;
            float size = uSize * (0.4 + aRandom) * (1.0 + eased * 0.55);
            gl_PointSize = size * uDpr / -mv.z;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          varying float vTwinkle;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            // Soft glowing core with a bright center falloff.
            float alpha = smoothstep(0.5, 0.04, d);
            float core = smoothstep(0.32, 0.0, d);
            vec3 col = vColor * (0.75 + vTwinkle * 0.5) + core * 0.35;
            gl_FragColor = vec4(col, alpha * vTwinkle * 0.95);
          }
        `}
      />
    </points>
  );
}

export default function ScrollScene({ progress }) {
  // Lighter load on phones so it stays smooth: fewer particles, lower pixel ratio.
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;
  const count = isMobile ? 3000 : 6000;

  return (
    <Canvas
      camera={{ position: [0, 0, 4.8], fov: 42 }}
      dpr={isMobile ? [1, 1.3] : [1, 1.8]}
      gl={{ alpha: true, antialias: !isMobile, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <ParticleSphere progress={progress} count={count} />
    </Canvas>
  );
}
