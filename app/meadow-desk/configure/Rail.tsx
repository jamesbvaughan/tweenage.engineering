import { useGLTF } from "@react-three/drei";
import { ComponentProps } from "react";
import type { Mesh } from "three";

import { inch } from "./constants";
import { aluminumMaterial } from "./materials";
import { useConfiguratorStore } from "./store";

useGLTF.preload("/new-rail.glb");

const sequence = [...Array(66).keys()];

const railHeightInModel = inch;

const Rail = (props: ComponentProps<"group">) => {
  const { nodes } = useGLTF("/new-rail.glb") as unknown as {
    nodes: Record<string, Mesh>;
  };

  const { railHeight } = useConfiguratorStore();
  const offset = railHeight / 2;

  const railHeightScaleFactor = railHeight / railHeightInModel;

  return (
    <group {...props} dispose={null}>
      <group
        scale={[
          railHeightScaleFactor,
          1 / railHeightInModel,
          railHeightScaleFactor,
        ]}
      >
        <group position={[offset, offset, offset]}>
          {sequence.map((i) => (
            <mesh
              key={i}
              castShadow
              receiveShadow
              geometry={nodes[`1010-S-1-CL_${i + 1}`].geometry}
              material={aluminumMaterial}
            />
          ))}
        </group>
      </group>
    </group>
  );
};

export default Rail;
