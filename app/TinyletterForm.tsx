"use client";

import { EnvelopeIcon } from "@heroicons/react/20/solid";

export default function TinyletterForm() {
  return (
    <form
      action="https://tinyletter.com/tweenage-engineering"
      method="post"
      target="popupwindow"
      onSubmit={() => {
        window.open(
          "https://tinyletter.com/tweenage-engineering",
          "popupwindow",
          "scrollbars=yes,width=800,height=600"
        );
        return true;
      }}
    >
      <div className="flex items-center justify-center space-x-2">
        <label htmlFor="tlemail" className="block text-gray-700">
          subscribe for updates
        </label>

        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <EnvelopeIcon
              className="h-5 w-5 text-gray-700"
              aria-hidden="true"
            />
          </div>

          <input
            type="email"
            name="email"
            id="tlemail"
            className="block w-full rounded-md border-none bg-dark pl-10 text-gray-700 placeholder-gray-800 focus:border-gray-800 focus:ring-gray-800 sm:text-sm"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <input type="hidden" value="1" name="embed" />
    </form>
  );
}
