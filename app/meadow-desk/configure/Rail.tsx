import { useGLTF } from "@react-three/drei";
import { ComponentProps } from "react";
import type { Mesh } from "three";

import { inch } from "./constants";
import { aluminumMaterial } from "./materials";
import { useConfiguratorStore } from "./store";

useGLTF.preload("/models/t-slot.glb");

const railHeightInModel = inch;

const Rail = (props: ComponentProps<"group">) => {
  const { nodes } = useGLTF("/models/t-slot.glb") as unknown as {
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
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["1010-S-1-CL"].geometry}
            material={aluminumMaterial}
          />
        </group>
      </group>
    </group>
  );
};

export default Rail;
