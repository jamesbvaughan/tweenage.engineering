"use client";

import { ComponentProps } from "react";
import Model from "./Model";
import PartsTable from "./PartsTable";
import ConfiguratorRadioGroup from "./RadioGroup";
import { useConfiguratorStore } from "./store";

function Option({
  id,
  label,
  description,
}: {
  id: string;
  label: string;
  description: string;
}) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-5 items-center">
        <input
          id={id}
          aria-describedby={`${id}-description`}
          name={id}
          type="checkbox"
          className="text-indigo-600 focus:ring-indigo-500 h-4 w-4 rounded border-gray-300"
        />
      </div>

      <div className="ml-3 font-sans text-sm">
        <label htmlFor={id} className="font-medium text-gray-500">
          {label}
        </label>
        <p id={`${id}-description`} className="text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
}

// function Options() {
//   return (
//     <fieldset className="space-y-5">
//       <legend className="sr-only">Options</legend>
//
//       <Option
//         id="cuttingAluminumOkay"
//         label="I'm okay with cutting aluminum"
//         description="You can save some money if you cut the rails to the correct size yourself."
//       />
//     </fieldset>
//   );
// }

// TODO: hardcode the per-foot prices
const railDollarsPerInch = 0.79;
// or $0.37 from 8020 https://8020.net/1010-s.html
const maxRailLengthInches8020 = 89;
const costPerCut8020 = 2.79;

