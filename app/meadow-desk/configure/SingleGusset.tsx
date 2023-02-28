import { useGLTF } from "@react-three/drei";
import { ComponentProps } from "react";
import { Euler, Mesh } from "three";

import { aluminumMaterial } from "./materials";

useGLTF.preload("/models/gusset.glb");

const SingleGusset = (props: ComponentProps<"group">) => {
  const { nodes } = useGLTF("/models/gusset.glb") as unknown as {
    nodes: Record<string, Mesh>;
  };

  return (
    <group {...props} dispose={null}>
      <group rotation={new Euler(0, 0, Math.PI / 2)}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["47065T663_Silver_Gusset_Bracket"].geometry}
          material={aluminumMaterial}
        />
      </group>
    </group>
  );
};

export default SingleGusset;
