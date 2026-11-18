"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

type ChromeSceneProps = {
  active: boolean;
  onReady: () => void;
};

function AutoFrames({ active }: { active: boolean }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    let previous = 0;
    const targetFps = 30;
    const interval = 1000 / targetFps;

    function tick(time: number) {
      if (time - previous >= interval) {
        previous = time;
        invalidate();
      }
      frame = window.requestAnimationFrame(tick);
    }

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active, invalidate]);

  return null;
}

function Sculpture() {
  const tiltRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handlePointer(event: PointerEvent) {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    }

    window.addEventListener("pointermove", handlePointer, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointer);
  }, []);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.05);

    smooth.current.x +=
      (pointer.current.x - smooth.current.x) * Math.min(1, safeDelta * 2.4);
    smooth.current.y +=
      (pointer.current.y - smooth.current.y) * Math.min(1, safeDelta * 2.4);

    if (tiltRef.current) {
      tiltRef.current.rotation.y = smooth.current.x * 0.28;
      tiltRef.current.rotation.x = smooth.current.y * 0.18;
    }

    if (spinRef.current) {
      spinRef.current.rotation.y += safeDelta * 0.16;
      spinRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.55) * 0.045;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z -= safeDelta * 0.055;
      ringRef.current.rotation.x =
        1.15 + Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    }
  });

  return (
    <group ref={tiltRef}>
      <group ref={spinRef}>
        <mesh>
          <torusKnotGeometry args={[1, 0.35, 280, 48, 2, 3]} />
          <meshPhysicalMaterial
            color="#d6d6d6"
            metalness={1}
            roughness={0.075}
            envMapIntensity={1.4}
            clearcoat={0.6}
            clearcoatRoughness={0.22}
          />
        </mesh>
      </group>

      <group ref={ringRef} rotation={[1.15, 0.12, 0.35]}>
        <mesh>
          <torusGeometry args={[1.95, 0.007, 8, 220]} />
          <meshStandardMaterial
            color="#9a9a9a"
            metalness={1}
            roughness={0.35}
            transparent
            opacity={0.55}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function ChromeScene({ active, onReady }: ChromeSceneProps) {
  const isCompact =
    typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, isCompact ? 1.4 : 1.8]}
      camera={{ position: [0, 0, 6.2], fov: 38 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
        onReady();
      }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <SceneContents active={active} />
      </Suspense>
    </Canvas>
  );
}

function SceneContents({ active }: { active: boolean }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <spotLight
        position={[5, 5, 6]}
        intensity={22}
        angle={0.55}
        penumbra={1}
        decay={2}
        color="#ffffff"
      />
      <directionalLight position={[-6, -2, 4]} intensity={1.4} color="#bdbdbd" />

      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#050505"]} />
        <Lightformer
          form="rect"
          intensity={4}
          position={[0, 5, -9]}
          scale={[10, 4, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2.2}
          position={[-6, 1, 2]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[3.5, 8, 1]}
        />
        <Lightformer
          form="rect"
          intensity={3}
          position={[6, -1, 3]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[3, 7, 1]}
        />
        <Lightformer
          form="ring"
          intensity={2.4}
          position={[0, 3, 5]}
          scale={2.2}
        />
        <Lightformer
          form="circle"
          intensity={1.4}
          position={[0, -4, 2]}
          scale={3}
        />
        <Lightformer
          form="rect"
          intensity={1.2}
          position={[3, 4, 4]}
          rotation={[0, 0, Math.PI / 4]}
          scale={[0.35, 6, 1]}
        />
      </Environment>

      <Sculpture />
      <AutoFrames active={active} />
    </>
  );
}
