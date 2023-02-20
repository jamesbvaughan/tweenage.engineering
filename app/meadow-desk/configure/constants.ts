import convert from "convert";

export const halfInch = convert(0.5, "inches").to("meters");

export const threeQuarterInch = convert(0.75, "inches").to("meters");

export const inch = convert(1, "inches").to("meters");

export const crossbarThickness = convert(1 / 8, "inches").to("meters");
export const crossbarWidth = convert(1 / 2, "inches").to("meters");
export const crossbarOffset = convert(6, "inches").to("meters");

export const bumperHeight = convert(0.563, "inches").to("meters");
export const bumperRadius = halfInch
export const bumperOffset = halfInch
