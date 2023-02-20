import { useGLTF } from "@react-three/drei";
import { ComponentProps } from "react";
import { Euler, Mesh } from "three";

import { rubberMaterial } from "./materials";

useGLTF.preload("/bumper.glb");

const sequence = [...Array(60).keys()];

const Bumper = (props: ComponentProps<"group">) => {
  const { nodes } = useGLTF("/bumper.glb") as unknown as {
    nodes: Record<string, Mesh>;
  };

  return (
    <group {...props} dispose={null}>
      {sequence.map((i) => (
        <mesh
          key={i}
          castShadow
          receiveShadow
          geometry={nodes[`SOLID_${i + 1}`].geometry}
          material={rubberMaterial}
          rotation={new Euler(-Math.PI / 2, 0, 0)}
        />
      ))}
    </group>
  );
};

export default Bumper;
