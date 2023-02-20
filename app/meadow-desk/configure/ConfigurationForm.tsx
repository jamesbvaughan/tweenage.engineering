"use client";

import convert from "convert";
import { ComponentProps } from "react";

import { halfInch, inch, threeQuarterInch } from "./constants";
import { displayInInches } from "./formatters";
import InputLabel from "./InputLabel";
import ConfiguratorRadioGroup from "./RadioGroup";
import { ConfiguratorState, useConfiguratorStore } from "./store";

const SliderField = ({
  label,
  formattedValue,
  ...inputProps
}: ComponentProps<"input"> & {
  label: string;
  value: number;
  formattedValue: string;
}) => {
  return (
    <div className="relative space-y-2 pt-1">
      <InputLabel htmlFor={inputProps.id} className="form-label">
        {label}
      </InputLabel>

      <div className="flex items-center space-x-4 text-lg">
        <div className="shrink-0">{formattedValue}</div>

        <input
          type="range"
          className="form-range h-2 w-full appearance-none bg-dark p-0 accent-gray-400 focus:shadow-none focus:outline-none focus:ring-0"
          step={inch}
          {...inputProps}
        />
      </div>
    </div>
  );
};
const overallPresets: {
  value: Partial<ConfiguratorState>;
  name: string;
}[] = [
    {
      value: {
        width: convert(48, "inches").to("meters"),
        depth: convert(24, "inches").to("meters"),
        height: convert(37, "inches").to("meters"),
        desktopPlacement: "top",
      },
      name: "james' desk",
    },
    {
      value: {
        width: 1.195,
        depth: 0.77,
        height: 0.75,
        desktopPlacement: "inset",
      },
      name: "field desk",
    },
  ];

const OverallPresets = () => {
  const store = useConfiguratorStore();

  const currentPreset = overallPresets.find((preset) =>
    Object.keys(preset.value).every(
      (key) =>
        // @ts-expect-error - TODO fix the types here
        preset[key] === store[key]
    )
  );

  return (
    <ConfiguratorRadioGroup
      label="Overall preset"
      options={overallPresets}
      value={currentPreset?.value}
      onChange={(value) => useConfiguratorStore.setState(value)}
    />
  );
};

const desktopSizePresets = [
  {
    value: {
      width: convert(48, "inches").to("meters"),
      depth: convert(24, "inches").to("meters"),
    },
    name: '48" x 24"',
  },
  {
    value: {
      width: convert(48, "inches").to("meters"),
      depth: convert(48, "inches").to("meters"),
    },
    name: '48" x 48"',
  },
] as const;

const DesktopSizePresets = () => {
  const { width, depth } = useConfiguratorStore();

  const currentPreset = desktopSizePresets.find(
    (preset) => preset.value.width === width && preset.value.depth === depth
  );

  return (
    <ConfiguratorRadioGroup
      label="Desktop size preset"
      options={desktopSizePresets}
      value={currentPreset?.value}
      onChange={(value) =>
        useConfiguratorStore.setState({
          width: value.width,
          depth: value.depth,
        })
      }
    />
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

const scaleReferenceOptions = [
  {
    value: "hotdog",
    name: "Hotdog",
    title:
      '"Hotdog Low Poly Food G06" (https://skfb.ly/6SnxM) by OHOW is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/)',
  },
  { value: "none", name: "None" },
] as const;

const ScaleReferenceOptions = () => {
  const { scaleReference } = useConfiguratorStore();

  return (
    <ConfiguratorRadioGroup
      label="Scale reference"
      options={scaleReferenceOptions}
      value={scaleReference}
      onChange={(value) =>
        useConfiguratorStore.setState({ scaleReference: value })
      }
    />
  );
};

const ConfigurationForm = () => {
  const { width, height, depth } = useConfiguratorStore();

  return (
    <div className="space-y-4">
      <OverallPresets />
      <DesktopSizePresets />
      <DesktopThicknessOptions />
      <DesktopPlacementOptions />
      <ScaleReferenceOptions />

      <SliderField
        id="height"
        label="Height"
        min={convert(5, "inches").to("meters")}
        max={convert(48, "inches").to("meters")}
        value={height}
        formattedValue={`${displayInInches(height)}" tall`}
        onChange={(event) => {
          useConfiguratorStore.setState({ height: Number(event.target.value) });
        }}
      />
      <SliderField
        id="width"
        label="Width"
        min={convert(1, "feet").to("meters")}
        max={convert(8, "feet").to("meters")}
        value={width}
        formattedValue={`${displayInInches(width)}" wide`}
        onChange={(event) =>
          useConfiguratorStore.setState({ width: Number(event.target.value) })
        }
      />
      <SliderField
        id="depth"
        label="Depth"
        min={convert(1, "feet").to("meters")}
        max={convert(4, "feet").to("meters")}
        value={depth}
        formattedValue={`${displayInInches(depth)}" deep`}
        onChange={(event) =>
          useConfiguratorStore.setState({ depth: Number(event.target.value) })
        }
      />
    </div>
  );
};

export default ConfigurationForm;
