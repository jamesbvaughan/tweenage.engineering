import Image from "next/image";

import meadowDeskPic from "../public/images/meadow-desk.jpg";

const Home = () => {
  return (
    <main className="space-y-10">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="space-y-6 text-center">
          <h1 className="font-mono">MEADOW DESK</h1>

          <p className="text-xl font-light">
            an open frame constructed from anodized aluminum and assembled with
            a desktop of your choice, meadow desk is your very own modular
            workspace
          </p>

          <div>
            <a
              href="/meadow-desk/configure"
              className="text-xl hover:text-gray-400"
            >
              configure yours
            </a>
          </div>
        </div>

        <Image
          src={meadowDeskPic}
          priority
          alt="the meadow desk"
          className="order-first md:order-last"
        />
      </div>
    </main>
  );
};

export default Home;
