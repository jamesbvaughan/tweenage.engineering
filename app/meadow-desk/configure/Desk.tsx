import { Box } from "@react-three/drei";
import { ComponentProps, useMemo } from "react";
import { Euler } from "three";
import Bumper from "./Bumper";

import {
  bumperHeight,
  bumperOffset,
  bumperRadius,
  crossbarOffset,
  crossbarThickness,
  crossbarWidth,
} from "./constants";
import Hotdog from "./Hotdog";
import { aluminumMaterial, getPlywoodBoxMaterials } from "./materials";
import Rail from "./Rail";
import SingleGusset from "./SingleGusset";
import {
  calculateDesktopWidth,
  calculateLegRailLength,
  calculateRearCrossbarLength,
  calculateSideCrossbarLength,
} from "./sizeCalculators";
import { useConfiguratorStore } from "./store";

const Crossbar = (groupProps: ComponentProps<"group">) => {
  return (
    <group {...groupProps}>
      <Box
        args={[crossbarWidth, 1, crossbarThickness]}
        material={aluminumMaterial}
      />
    </group>
  );
};

const RearCrossbars = (groupProps: ComponentProps<"group">) => {
  const { width, height, desktopThickness } = useConfiguratorStore();

  const angle = Math.atan(width / (height - crossbarOffset));

  const rearCrossbarLength = calculateRearCrossbarLength(
    height - desktopThickness,
    width,
    crossbarOffset
  );

  return (
    <group {...groupProps}>
      <Crossbar scale={[1, rearCrossbarLength, 1]} rotation={[0, 0, angle]} />
      <Crossbar scale={[1, rearCrossbarLength, 1]} rotation={[0, 0, -angle]} />
    </group>
  );
};

const Desktop = (groupProps: ComponentProps<"group">) => {
  const {
    width,
    depth,
    desktopPlacement,
    scaleReference,
    desktopThickness,
    railHeight,
  } = useConfiguratorStore();

  const desktopWidth = calculateDesktopWidth(
    width,
    railHeight,
    desktopPlacement
  );

  const plywoodBoxMaterials = useMemo(getPlywoodBoxMaterials, []);

  return (
    <group {...groupProps}>
      {scaleReference === "hotdog" && (
        <Hotdog position={[width / 3, desktopThickness, depth / 3]} />
      )}

      <Box
        args={[desktopWidth, desktopThickness, depth]}
        material={plywoodBoxMaterials}
        position={[
          desktopPlacement === "top"
            ? desktopWidth / 2
            : desktopWidth / 2 + railHeight,
          desktopThickness / 2,
          depth / 2,
        ]}
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
        rotation={new Euler(Math.PI / 2, 0, 0)}
      />
      <Rail // Bottom bar
        scale={[1, depth, 1]}
        position={[0, railHeight, 0]}
        rotation={new Euler(Math.PI / 2, 0, 0)}
      />
      <Rail // Front leg
        scale={[1, legRailLength, 1]}
        position={[0, railHeight, 0]}
      />
      <Rail // Back leg
        scale={[1, legRailLength, 1]}
        position={[0, railHeight, depth - railHeight]}
      />

      <SingleGusset // Front bottom
        position={[railHeight / 2, railHeight, railHeight]}
        rotation={new Euler(0, Math.PI, 0)}
      />
      <SingleGusset // Back bottom
        position={[railHeight / 2, railHeight, depth - railHeight]}
      />
      <SingleGusset // Front top
        position={[railHeight / 2, legRailLength + railHeight, railHeight]}
        rotation={new Euler(Math.PI, 0, 0)}
      />
      <SingleGusset // Back top
        position={[
          railHeight / 2,
          legRailLength + railHeight,
          depth - railHeight,
        ]}
        rotation={new Euler(-Math.PI / 2, 0, 0)}
      />

      <Bumper // Front bumper
        position={[
          bumperRadius,
          -bumperHeight / 2,
          bumperRadius + bumperOffset,
        ]}
      />
      <Bumper // Back bumper
        position={[
          bumperRadius,
          -bumperHeight / 2,
          depth - bumperRadius - bumperOffset,
        ]}
      />
    </group>
  );
};

const SideCrossbars = () => {
  const { height, width, depth, desktopThickness } = useConfiguratorStore();

  const sideCrossbarAngle = Math.atan(depth / (height - crossbarOffset));
  const sideCrossbarLength = calculateSideCrossbarLength(
    height,
    depth,
    crossbarOffset
  );

  return (
    <group>
      <Crossbar // Left crossbar
        rotation={new Euler(sideCrossbarAngle, Math.PI / 2, 0)}
        scale={[1, sideCrossbarLength, 1]}
        position={[
          width + crossbarThickness / 2,
          (height - desktopThickness) / 2,
          depth / 2,
        ]}
      />

      <Crossbar // Right crossbar
        rotation={new Euler(sideCrossbarAngle, Math.PI / 2, 0)}
        scale={[1, sideCrossbarLength, 1]}
        position={[
          -crossbarThickness / 2,
          (height - desktopThickness) / 2,
          depth / 2,
        ]}
      />
    </group>
  );
};

const Desk = (groupProps: ComponentProps<"group">) => {
  const { width, height, depth, desktopThickness, railHeight } =
    useConfiguratorStore();

  return (
    <group {...groupProps}>
      <group position={[-width / 2, -height / 2, -depth / 2]}>
        <LegAssembly />
        <LegAssembly position={[width - railHeight, 0, 0]} />

        <SideCrossbars />

        <RearCrossbars
          position={[
            width / 2,
            (height - desktopThickness) / 2,
            depth - crossbarThickness / 2 - railHeight,
          ]}
        />

        <Desktop position={[0, height - desktopThickness, 0]} />
      </group>
    </group>
  );
};

export default Desk;
