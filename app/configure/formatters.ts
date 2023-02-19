import convert from "convert";

export const displayInInches = (meters: number) => {
  return convert(meters, "meters").to("inches").toPrecision(2);
};
