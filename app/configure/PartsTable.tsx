"use client";

import { displayInInches } from "./formatters";
import {
  calculateDesktopWidth,
  calculateLegRailLength
} from "./sizeCalculators";
import { useConfiguratorStore } from "./store";

const railDollarsPerInch = 0.37;
// or $0.37 from 8020 https://8020.net/1010-s.html
const maxRailLengthInches8020 = 89;
const costPerCut8020 = 2.79;

interface PartsListEntry {
  id: number;
  name: string;
  count: number;
  costPerPart: number;
}

const calculateRailCost = (inches: number) => {
  return inches * railDollarsPerInch + costPerCut8020;
};

const PartsTable = () => {
  const {
    height,
    depth,
    width,
    railHeight,
    desktopPlacement,
    desktopThickness,
  } = useConfiguratorStore();

  const legRailLength = calculateLegRailLength(
    height,
    railHeight,
    desktopThickness,
    desktopPlacement
  );

  const desktopWidth = calculateDesktopWidth(
    width,
    railHeight,
    desktopPlacement
  );

  // TODO: price this
  const desktopCost = 60;
  const legRailCost = calculateRailCost(legRailLength);
  const horizontalSupportRailCost = calculateRailCost(depth);

  const totalCost =
    4 * legRailCost + 4 * horizontalSupportRailCost + desktopCost;

  const partsListEntries: PartsListEntry[] = [
    {
      id: 1,
      name: `Leg rails (${displayInInches(legRailLength)}")`,
      count: 4,
      costPerPart: legRailCost,
    },
    {
      id: 2,
      name: `Horizontal supports (${displayInInches(depth)}")`,
      count: 4,
      costPerPart: horizontalSupportRailCost,
    },
    {
      id: 3,
      name: `Desktop (${displayInInches(desktopWidth)}" x ${displayInInches(
        depth
      )}" x ${displayInInches(desktopThickness)}")`,
      count: 1,
      costPerPart: desktopCost,
    },
  ];

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold sm:pl-0"
          >
            Part
          </th>
          <th
            scope="col"
            className="hidden py-3.5 px-3 text-right text-sm font-semibold  sm:table-cell"
          >
            Count
          </th>
          <th
            scope="col"
            className="hidden py-3.5 px-3 text-right text-sm font-semibold  sm:table-cell"
          >
            Cost per part
          </th>
          <th
            scope="col"
            className="py-3.5 pl-3 pr-6 text-right text-sm font-semibold  sm:pr-0"
          >
            Cost
          </th>
        </tr>
      </thead>
      <tbody>
        {partsListEntries.map((partsListEntry) => (
          <tr key={partsListEntry.id} className="border-b border-gray-200">
            <td className="py-4 pl-6 pr-3 text-sm sm:pl-0">
              <div className="font-medium">{partsListEntry.name}</div>
              <div className="mt-0.5  sm:hidden">
                {partsListEntry.count} x $
                {partsListEntry.costPerPart.toFixed(2)}
              </div>
            </td>
            <td className="hidden py-4 px-3 text-right text-sm sm:table-cell">
              {partsListEntry.count}
            </td>
            <td className="hidden py-4 px-3 text-right text-sm sm:table-cell">
              ${partsListEntry.costPerPart.toFixed(2)}
            </td>
            <td className="py-4 pl-3 pr-6 text-right text-sm sm:pr-0">
              ${(partsListEntry.count * partsListEntry.costPerPart).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th
            scope="row"
            colSpan={3}
            className="hidden pl-6 pr-3 pt-6 text-right text-sm font-normal  sm:table-cell sm:pl-0"
          >
            Total
          </th>
          <th
            scope="row"
            className="pl-6 pr-3 pt-6 text-left text-sm font-normal  sm:hidden"
          >
            Total
          </th>
          <td className="pl-3 pr-6 pt-6 text-right text-sm  sm:pr-0">
            ${totalCost.toFixed(2)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default PartsTable;
