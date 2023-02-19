import convert from "convert";
import { create } from "zustand";

import { inch, threeQuarterInch } from "./constants";
import { DesktopPlacement } from "./DesktopPlacement";

export interface ConfiguratorState {
  /**
   * The width of the desk in meters
   */
  width: number;

  /**
   * The height of the desk in meters (from the floor to the top of the
   * desktop)
   */
  height: number;

  /**
   * The depth of the desk in meters
   */
  depth: number;

  /**
   * Whether the user is okay with cutting aluminum to save money vs buying
   * pre-cut lengths.
   */
  cuttingAluminumIsOkay: boolean;

  desktopPlacement: DesktopPlacement;

  desktopThickness: number;

  railHeight: number;
}

const defaultState: ConfiguratorState = {
  width: convert(48, "inches").to("meters"),
  height: convert(37, "inches").to("meters"),
  depth: convert(24, "inches").to("meters"),
  cuttingAluminumIsOkay: true,
  desktopPlacement: "top",
  desktopThickness: threeQuarterInch,
  railHeight: inch,
};

// TODO: persist this in the URL

export const useConfiguratorStore = create<ConfiguratorState>(
  () => defaultState
);
