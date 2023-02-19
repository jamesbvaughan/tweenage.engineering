"use client";

import { ComponentProps } from "react";

import { halfInch, inch, threeQuarterInch } from "./constants";
import { displayInInches } from "./formatters";
import ConfiguratorRadioGroup from "./RadioGroup";
import { useConfiguratorStore } from "./store";

const SliderField = ({
  label,
  ...inputProps
}: ComponentProps<"input"> & { label: string; value: number }) => {
  return (
    <div className="relative pt-1">
      <label htmlFor={inputProps.id} className="form-label">
        {label}: {displayInInches(inputProps.value)} inches
      </label>

      <input
        type="range"
        className="form-range h-6 w-full appearance-none bg-dark p-0 focus:shadow-none focus:outline-none focus:ring-0"
        step={inch}
        {...inputProps}
      />
    </div>
  );
};

const desktopThicknessOptions = [
  { value: halfInch, name: '1/2"' },
  { value: threeQuarterInch, name: '3/4"' },
  { value: inch, name: '1"' },
] as const;

const DesktopThicknessOptions = () => {
  const { desktopThickness } = useConfiguratorStore();

  return (
    <ConfiguratorRadioGroup
      label="Desktop thickness"
      options={desktopThicknessOptions}
      value={desktopThickness}
      onChange={(value) =>
        useConfiguratorStore.setState({ desktopThickness: value })
      }
    />
  );
};

const desktopPlacementOptions = [
  { value: "top", name: "Top" },
  { value: "inset", name: "Inset" },
] as const;

const DesktopPlacementOptions = () => {
  const { desktopPlacement } = useConfiguratorStore();
  return (
    <ConfiguratorRadioGroup
      label="Desktop placement"
      options={desktopPlacementOptions}
      value={desktopPlacement}
      onChange={(value) =>
        useConfiguratorStore.setState({ desktopPlacement: value })
      }
    />
  );
};

const ConfigurationForm = () => {
  const { width, height, depth } = useConfiguratorStore();

  return (
    <div>
      <DesktopThicknessOptions />
      <DesktopPlacementOptions />

      <SliderField
        id="height"
        label="Height"
        min={0.1}
        max={3}
        value={height}
        onChange={(event) => {
          useConfiguratorStore.setState({ height: Number(event.target.value) });
        }}
      />
      <SliderField
        id="width"
        label="Width"
        min={0.1}
        max={4}
        value={width}
        onChange={(event) =>
          useConfiguratorStore.setState({ width: Number(event.target.value) })
        }
      />
      <SliderField
        id="depth"
        label="Depth"
        min={0.1}
        max={4}
        value={depth}
        onChange={(event) =>
          useConfiguratorStore.setState({ depth: Number(event.target.value) })
        }
      />
    </div>
  );
};

export default ConfigurationForm;
