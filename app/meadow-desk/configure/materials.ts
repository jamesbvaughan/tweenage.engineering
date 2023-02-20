import { MeshStandardMaterial, TextureLoader } from "three";

const loader = new TextureLoader();

export const aluminumMaterial = new MeshStandardMaterial({
  color: "rgb(171, 171, 171)",
  roughness: 0.5,
  metalness: 0.8,
});

export const rubberMaterial = new MeshStandardMaterial({
  color: "#111111",
  roughness: 0.9,
})

const woodColor = "#b7924d";

const plywoodEdgeMaterial = new MeshStandardMaterial({
  color: woodColor,
  map: loader.load("/plywood-edge.jpeg"),
});

const plywoodFaceMaterial = new MeshStandardMaterial({
  color: woodColor,
  map: loader.load("/wood-face.jpg"),
});

export const plywoodBoxMaterials = [
  plywoodEdgeMaterial,
  plywoodEdgeMaterial,
  plywoodFaceMaterial,
  plywoodFaceMaterial,
  plywoodEdgeMaterial,
  plywoodEdgeMaterial,
];
