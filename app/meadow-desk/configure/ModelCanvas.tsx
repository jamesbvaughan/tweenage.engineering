"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Desk from "./Desk";

const ModelCanvas = () => {
  return (
    <Canvas
      camera={{
        position: [-4, 2, -4],
        near: 0.01,
        fov: 15,
      }}
      className="min-h-[480px]"
    >
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[-10, -1, -5]} />

      <OrbitControls
        enableDamping={false}
        enablePan={false}
        enableZoom={false}
      />

      <Desk />
    </Canvas>
  );
};

export default ModelCanvas;
