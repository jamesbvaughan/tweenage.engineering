import Image from "next/image";

import meadowDeskPic from "../../public/meadow-desk.jpg";

export default function Home() {
  return (
    <main className="space-y-10">
      <div className="grid-cols-1 md:grid-cols-2 grid items-center gap-8">
        <div className="text-center space-y-6">
          <h1>MEADOW DESK V1</h1>
          <p>
            a space frame constructed from anodized aluminum
            and assembled with formica-laminated plywood,
            meadow desk is your very own modular workspace
          </p>
        </div>

        <Image src={meadowDeskPic} priority alt="the meadow desk" className="order-first md:order-last" />
      </div>

      <div className="text-center">
        <h2>what is this?</h2>
        <p>blah blah blah</p>
      </div>
    </main>
  );
}
