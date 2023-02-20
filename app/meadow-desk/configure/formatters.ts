import convert from "convert";

export const displayInInches = (valueInMeters: number): string => {
  const valueInInches = convert(valueInMeters, "meters").to("inches");

  return Math.round(valueInInches).toString();
};
