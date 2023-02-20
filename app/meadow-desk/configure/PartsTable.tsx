"use client";

import { Disclosure } from "@headlessui/react";
import {
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import convert from "convert";
import { PropsWithChildren, ReactNode } from "react";
import { crossbarOffset } from "./constants";
import { calculateDesktopCost, calculateRailCost8020 } from "./costCalculators";
import { displayInInches } from "./formatters";
import {
  calculateLegRailLength,
  calculateSideCrossbarLength,
} from "./sizeCalculators";
import { useConfiguratorStore } from "./store";

const DescriptionLink = ({
  href,
  children,
}: PropsWithChildren<{ href: string }>) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-gray-400 underline-offset-2 hover:underline"
    >
      {children}
    </a>
  );
};

interface PartsListEntry {
  id: string;
  name: string;
  count: number;
  costPerPart: number;
  url: string;
  description?: ReactNode;
  defaultOpen?: true;
}

const PartsTableRow = ({ entry }: { entry: PartsListEntry }) => {
  const partNameLink = (
    <>
      <div className="font-medium">
        <a
          href={entry.url}
          target="_blank"
          rel="noreferrer"
          className="flex underline-offset-2 hover:underline items-center space-x-2"
        >
          <div>{entry.name}</div>
          <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-700" />
        </a>
      </div>

      <div className="mt-0.5 sm:hidden">
        {entry.count} x ${entry.costPerPart.toFixed(2)}
      </div>
    </>
  );

  return (
    <tr className="border-b border-gray-200">
      <td className="py-4 pl-6 pr-3 sm:pl-0">
        {entry.description ? (
          <Disclosure defaultOpen={entry.defaultOpen}>
            {({ open }) => {
              const Icon = open ? ChevronUpIcon : ChevronDownIcon;

              return (
                <>
                  <div className="flex items-start">
                    <Disclosure.Button className="px-1 text-gray-600 hover:text-gray-400">
                      <Icon className="h-6 w-6" />
                    </Disclosure.Button>

                    <div>
                      {partNameLink}

                      <Disclosure.Panel className="font-sans text-base text-gray-600">
                        {entry.description}
                      </Disclosure.Panel>
                    </div>
                  </div>
                </>
              );
            }}
          </Disclosure>
        ) : (
          <div className="pl-8">{partNameLink}</div>
        )}
      </td>

      <td className="hidden py-4 px-3 text-right align-top sm:table-cell">
        {entry.count}
      </td>

      <td className="hidden py-4 px-3 text-right align-top sm:table-cell">
        ${entry.costPerPart.toFixed(2)}
      </td>

      <td className="py-4 pl-3 pr-6 text-right align-top sm:pr-0">
        ${(entry.count * entry.costPerPart).toFixed(2)}
      </td>
    </tr>
  );
};

const PartsTable = () => {
  const { height, depth, railHeight, desktopPlacement, desktopThickness } =
    useConfiguratorStore();

  const legRailLength = calculateLegRailLength(
    height,
    railHeight,
    desktopThickness,
    desktopPlacement
  );

  const desktopCost = calculateDesktopCost();
  const legRailCost = calculateRailCost8020(legRailLength);
  const horizontalSupportRailCost = calculateRailCost8020(depth);

  const sideCrossbarLength = calculateSideCrossbarLength(
    height - desktopThickness,
    depth,
    crossbarOffset
  );

  const totalCost =
    4 * legRailCost + 4 * horizontalSupportRailCost + desktopCost;

  const tSlotDescription = (
    <div>
      The link and price for t-slot here are from{" "}
      <DescriptionLink href="https://8020.net/">80/20</DescriptionLink>. They
      charge $2.79 per cut, which is reflected here, but you can save some money
      if you don&apos;t mind ordering longer pieces and cutting them yourself.
      <br />
      You can also get t-slot{" "}
      <DescriptionLink href="https://www.mcmaster.com/products/t-slotted-framing/rail-profile~single/rail-height~1/single-rail-profile-style~four-slot/color~silver/">
        here on McMaster-Carr
      </DescriptionLink>
      , but it&apos;s more expensive.
    </div>
  );

  const partsListEntries: PartsListEntry[] = [
    {
      id: "desktop",
      name: `Desktop (48" x 24" x 1/2" project panels)`,
      count: 2,
      costPerPart: desktopCost,
      url: "https://www.homedepot.com/p/Columbia-Forest-Products-1-2-in-x-2-ft-x-4-ft-Europly-Maple-Plywood-Project-Panel-Free-Custom-Cut-Available-3691/207004189",
      description: (
        <div>
          This is an example of one desktop option, sandwiching two 1/2&quot;
          plywood panels for a 1&quot; desktop. You could use any desktop you
          like here and adjust the overall price estimate accordingly.
        </div>
      ),
      defaultOpen: true,
    },
    {
      id: "leg-rails",
      name: `Leg rails (${displayInInches(legRailLength)}")`,
      count: 4,
      costPerPart: legRailCost,
      url: "https://8020.net/1010-s.html",
      description: tSlotDescription,
    },
    {
      id: "horizontal-support-rails",
      name: `Horizontal supports (${displayInInches(depth)}")`,
      count: 4,
      costPerPart: horizontalSupportRailCost,
      url: "https://8020.net/1010-s.html",
      description: tSlotDescription,
    },
    {
      id: "rear-crossbars",
      name: `Aluminum for rear crossbars (6')`,
      count: 2,
      costPerPart: 5.92,
      url: "https://www.mcmaster.com/catalog/129/4161/8975K577",
    },
    {
      id: "side-crossbars",
      name: `Aluminum for side crossbars (${sideCrossbarLength <= convert(3, "feet").to("meters") ? 3 : 6
        }')`,
      count: 2,
      costPerPart:
        sideCrossbarLength <= convert(3, "feet").to("meters") ? 3.37 : 5.92,
      url: "https://www.mcmaster.com/catalog/129/4161/8975K577",
    },
    {
      id: "crossbar-nuts",
      name: "T-slot nuts for crossbars",
      count: 4,
      costPerPart: 1.72,
      url: "https://www.mcmaster.com/47065T383/",
    },
    {
      id: "gussets",
      name: "Corner gussets (fastening hardware included)",
      count: 8,
      costPerPart: 9.97,
      url: "https://www.mcmaster.com/47065T663/",
      description: (
        <div>
          There are <em>a ton</em> of different options for fastening the rails
          to each other. I personally like these ones, but they are pretty
          expensive. You can see more options for McMaster{" "}
          <DescriptionLink href="https://www.mcmaster.com/products/t-slotted-framing/t-slotted-framing-structural-brackets/rail-height~1/rail-profile~single/">
            here
          </DescriptionLink>{" "}
          and from 80/20{" "}
          <DescriptionLink href="https://8020.net/catalog/category/view/id/17/?series=17">
            here
          </DescriptionLink>
          .
        </div>
      ),
    },
    {
      id: "bumpers",
      name: "Bumpers (fastening hardware included)",
      count: 4,
      costPerPart: 4.72,
      url: "https://www.mcmaster.com/3136n147/",
      description: (
        <div>
          The bumpers I&apos;ve linked here are pricey, but you could use any
          bumpers you like here, or leave them off entirely depending on what
          kind of floor you&apos;ll be placing the desk on.
        </div>
      ),
    },
  ];

  return (
    <table className="min-w-full table-fixed divide-y divide-gray-300 font-mono">
      <thead className="font-semibold">
        <tr>
          <th scope="col" className="py-3.5 pl-6 pr-3 text-left sm:pl-0">
            Part
          </th>
          <th
            scope="col"
            className="hidden py-3.5 px-3 text-right sm:table-cell"
          >
            Count
          </th>
          <th
            scope="col"
            className="hidden w-44 py-3.5 px-3 text-right sm:table-cell"
          >
            Cost per part
          </th>
          <th scope="col" className="w-28 py-3.5 pl-3 pr-6 text-right sm:pr-0">
            Cost
          </th>
        </tr>
      </thead>

      <tbody className="text-lg">
        {partsListEntries.map((partsListEntry) => (
          <PartsTableRow entry={partsListEntry} key={partsListEntry.id} />
        ))}
      </tbody>

      <tfoot>
        <tr>
          <th
            scope="row"
            colSpan={3}
            className="font-norma hidden pl-6 pr-3 pt-6 text-right sm:table-cell sm:pl-0"
          >
            Total
          </th>
          <th
            scope="row"
            className="pl-6 pr-3 pt-6 text-left font-normal sm:hidden"
          >
            Total
          </th>
          <td className="pl-3 pr-6 pt-6 text-right sm:pr-0">
            ${totalCost.toFixed(2)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default PartsTable;
