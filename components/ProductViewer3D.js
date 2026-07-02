'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Bounds,
  Center,
  AdaptiveDpr,
  AdaptiveEvents,
  Html,
} from '@react-three/drei';
import { RotateCw } from 'lucide-react';
import ProjectModel from './models/ProjectModels';

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 font-mono text-xs text-ink-muted">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-pcb border-t-transparent" />
        Loading model…
      </div>
    </Html>
  );
}

export default function ProductViewer3D({ type, color = '#1b5e3a' }) {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [3.2, 2.4, 4], fov: 38 }}
        onPointerDown={() => setAutoRotate(false)}
      >
        <color attach="background" args={['#ffffff']} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 4]} intensity={1.3} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-4, 2, -3]} intensity={0.5} color={color} />

        <Suspense fallback={<Loader />}>
          <Bounds fit clip observe margin={1.4}>
            <Center>
              <ProjectModel type={type} color={color} />
            </Center>
          </Bounds>
          <Environment preset="city" />
          <ContactShadows position={[0, -0.02, 0]} opacity={0.35} scale={10} blur={2.2} far={3} />
        </Suspense>

        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={1.4}
          enablePan={false}
          minDistance={2.5}
          maxDistance={9}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.05}
        />
        <AdaptiveDpr pixelated={false} />
        <AdaptiveEvents />
      </Canvas>

      <button
        type="button"
        onClick={() => setAutoRotate((v) => !v)}
        className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md border border-ink/10 bg-paper-raised/90 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-muted backdrop-blur transition-colors hover:text-ink"
      >
        <RotateCw size={12} />
        {autoRotate ? 'Rotating' : 'Rotate'}
      </button>
      <span className="absolute bottom-3 left-3 rounded-md border border-ink/10 bg-paper-raised/90 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-muted backdrop-blur">
        Drag to orbit
      </span>
    </div>
  );
}
