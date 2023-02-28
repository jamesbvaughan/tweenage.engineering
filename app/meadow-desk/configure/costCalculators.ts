import convert from "convert";

export const calculateDesktopCost = () => {
  // TODO: include calculations for different desktop sizes

  // Based on this plywood:
  //   https://www.homedepot.com/p/Columbia-Forest-Products-1-2-in-x-2-ft-x-4-ft-Europly-Maple-Plywood-Project-Panel-Free-Custom-Cut-Available-3691/207004189
  return 43.99;
};

export const calculateRailCostMcMaster = (meters: number) => {
  const railDollarsPerInch = 0.79;

  // TODO: make this take into account the prices of the pre-cut lengths

  return convert(meters, "meters").to("inches") * railDollarsPerInch;
};

export const calculateRailCost8020 = (meters: number) => {
  const railDollarsPerInch = 0.37;
  // const maxRailLengthInches8020 = 89;
  const costPerCut8020 = 2.79;

  return (
    convert(meters, "meters").to("inches") * railDollarsPerInch + costPerCut8020
  );
};
