import { inch } from "./constants";
import { DesktopPlacement } from "./DesktopPlacement";

export const calculateLegRailLength = (
  deskHeight: number,
  railHeight: number,
  desktopThickness: number,
  desktopPlacement: DesktopPlacement
) => {
  return desktopPlacement === "top"
    ? deskHeight - 2 * railHeight - desktopThickness
    : deskHeight - 2 * railHeight;
};

export const calculateSideCrossbarLength = (
  frameHeight: number,
  deskDepth: number,
  crossbarOffset: number
) => {
  return Math.sqrt(
    Math.pow(deskDepth, 2) + Math.pow(frameHeight - crossbarOffset, 2)
  ) - (inch);
};

export const calculateRearCrossbarLength = (
  frameHeight: number,
  deskWidth: number,
  crossbarOffset: number
) => {
  return Math.sqrt(
    Math.pow(deskWidth, 2) + Math.pow(frameHeight - crossbarOffset, 2)
  ) - (0.5 * inch);
};

export const calculateDesktopWidth = (
  deskWidth: number,
  railHeight: number,
  desktopPlacement: DesktopPlacement
) => {
  return desktopPlacement === "top" ? deskWidth : deskWidth - 2 * railHeight;
};
