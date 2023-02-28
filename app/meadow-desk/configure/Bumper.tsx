import { useGLTF } from "@react-three/drei";
import { ComponentProps } from "react";
import { Euler, Mesh } from "three";

import { rubberMaterial } from "./materials";

useGLTF.preload("/models/bumper.glb");

const Bumper = (props: ComponentProps<"group">) => {
  const { nodes } = useGLTF("/models/bumper.glb") as unknown as {
    nodes: Record<string, Mesh>;
  };

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SOLID.geometry}
        material={rubberMaterial}
        rotation={new Euler(-Math.PI / 2, 0, 0)}
      />
    </group>
  );
};

export default Bumper;
