import { useGLTF } from "@react-three/drei";
import { ComponentProps } from "react";
import { Euler, Mesh } from "three";

import { inch } from "./constants";
import { aluminumMaterial } from "./materials";
import { useConfiguratorStore } from "./store";

useGLTF.preload("/single-gusset.glb");

const sequence = [...Array(31).keys()];

const railHeightInModel = inch;

const SingleGusset = (props: ComponentProps<"group">) => {
  const { nodes } = useGLTF("/single-gusset.glb") as unknown as {
    nodes: Record<string, Mesh>;
  };

  const { railHeight } = useConfiguratorStore();
  const offset = railHeight / 2;

  return (
    <group {...props} dispose={null}>
      <group rotation={new Euler(0, 0, Math.PI / 2)}>
        {/* <group position={[offset, offset, offset]}> */}
        {sequence.map((i) => (
          <mesh
            key={i}
            castShadow
            receiveShadow
            geometry={
              nodes[`47065T663_Silver_Gusset_Bracket_${i + 1}`].geometry
            }
            material={aluminumMaterial}
          />
        ))}
      </group>
      {/* </group> */}
    </group>
  );
};

export default SingleGusset;
