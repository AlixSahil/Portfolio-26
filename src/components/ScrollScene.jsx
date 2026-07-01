import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

// Nested wireframe icosahedra (purple outer + gold inner) that rotate and scale as the
// section scrolls past. `progress` is a motion MotionValue in [0,1] for that section.
function Crystal({ progress }) {
  const group = useRef(null);
  const inner = useRef(null);

  useFrame((state) => {
    const p = progress ? progress.get() : 0;
    if (group.current) {
      group.current.rotation.y = p * Math.PI * 2.2 + state.clock.elapsedTime * 0.12;
      group.current.rotation.x = p * Math.PI * 0.6;
      const s = 0.7 + Math.sin(Math.min(Math.max(p, 0), 1) * Math.PI) * 0.5;
      group.current.scale.setScalar(s);
    }
    if (inner.current) {
      inner.current.rotation.y = -state.clock.elapsedTime * 0.25;
      inner.current.rotation.z = p * Math.PI;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial color="#b083ff" wireframe transparent opacity={0.85} />
      </mesh>
      <mesh ref={inner} scale={0.58}>
        <icosahedronGeometry args={[1.35, 0]} />
        <meshBasicMaterial color="#f3cf61" wireframe transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

export default function ScrollScene({ progress }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.3], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <Crystal progress={progress} />
    </Canvas>
  );
}
