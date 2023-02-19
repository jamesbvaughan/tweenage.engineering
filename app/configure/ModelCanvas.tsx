"use client";

import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ComponentProps } from "react";
import { Euler } from "three";

import { aluminumMaterial, plywoodBoxMaterials } from "./materials";
import Rail from "./Rail";
import {
  calculateCrossbarLength,
  calculateDesktopWidth,
  calculateLegRailLength
} from "./sizeCalculators";
import { useConfiguratorStore } from "./store";

const inchesPerMeter = 39.3700787402;

/** One inch in meters */
const inch = 1 / inchesPerMeter;

const crossbarThickness = (1 / 8) * inch;
const crossbarWidth = (1 / 2) * inch;
const crossbarOffset = 5 * inch;

const Crossbar = (groupProps: ComponentProps<"group">) => {
  const { width, height } = useConfiguratorStore();

  const crossbarLength = calculateCrossbarLength(height, width, crossbarOffset);

  return (
    <group {...groupProps}>
      <Box
        args={[crossbarThickness, crossbarWidth, crossbarLength]}
        material={aluminumMaterial}
      />
    </group>
  );
};

const Crossbars = (groupProps: ComponentProps<"group">) => {
  const { width, height } = useConfiguratorStore();

  const angle = Math.atan((height - crossbarOffset) / width);

  // const length = calculateCrossbarLength(height, width, crossbarOffset);

  return (
    <group {...groupProps}>
      <group position={[0, 0, 0]}>
        <Crossbar rotation={[angle, 0, 0]} />
        <Crossbar rotation={[-angle, 0, 0]} />
      </group>
    </group>
  );
};

const Desktop = (groupProps: ComponentProps<"group">) => {
  const { width, depth, desktopPlacement, desktopThickness, railHeight } =
    useConfiguratorStore();

  const desktopWidth = calculateDesktopWidth(
    width,
    railHeight,
    desktopPlacement
  );

  return (
    <group {...groupProps}>
      <Box
        args={[depth, desktopThickness, desktopWidth]}
        material={plywoodBoxMaterials}
        position={[depth / 2, desktopThickness / 2, desktopWidth / 2]}
      />
    </group>
  );
};

const LegAssembly = (groupProps: ComponentProps<"group">) => {
  const { height, depth, desktopPlacement, desktopThickness, railHeight } =
    useConfiguratorStore();

  const legRailLength = calculateLegRailLength(
    height,
    railHeight,
    desktopThickness,
    desktopPlacement
  );

  return (
    <group {...groupProps}>
      <Rail // Top bar
        scale={[1, depth, 1]}
        position={[0, legRailLength + 2 * railHeight, 0]}
        rotation={new Euler(0, 0, -Math.PI / 2)}
      />
      <Rail // Bottom bar
        scale={[1, depth, 1]}
        position={[0, railHeight, 0]}
        rotation={new Euler(0, 0, -Math.PI / 2)}
      />
      <Rail // Front leg
        scale={[1, legRailLength, 1]}
        position={[0, railHeight, 0]}
      />
      <Rail // Back leg
        scale={[1, legRailLength, 1]}
        position={[depth - railHeight, railHeight, 0]}
      />
    </group>
  );
};

const Desk = (groupProps: ComponentProps<"group">) => {
  const { width, height, depth, desktopThickness, railHeight } =
    useConfiguratorStore();

  return (
    <group {...groupProps}>
      <group position={[-depth / 2, -height / 2, -width / 2]}>
        <LegAssembly />
        <LegAssembly position={[0, 0, width - railHeight]} />

        <Crossbars
          position={[
            depth - crossbarThickness / 2 - railHeight,
            height / 2,
            width / 2,
          ]}
        />
        <Desktop position={[0, height - desktopThickness, 0]} />
      </group>
    </group>
  );
};

const ModelCanvas = () => {
  return (
    <Canvas camera={{ position: [-5, 3, -4], near: 0.01, fov: 15 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} intensity={1} />

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
