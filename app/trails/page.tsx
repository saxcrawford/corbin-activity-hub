import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Image from "next/image";
import cumberlandFalls from "../images/cumberlandFalls.jpeg";
import { getTrails } from "../lib/data/trails";

const TrailsCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-2 h-55 rounded-2xl transition duration-200 group hover:scale-105">
      <div
        className="rounded-2xl border-2 border-lightCorbin bg-corbinGray/20 p-4 h-full transition duration-200
                  group-hover:bg-corbinGreen/90 group-hover:text-lightCorbin group-hover:shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-3 text-white justify-center">
          {title}
        </h2>
        <p
          className="text-base font-normal text-white opacity-0 transition-opacity duration-200
                  group-hover:opacity-100"
        >
          {description}
        </p>
      </div>
      <div className="bg-lightCorbin text-sm font-normal" />
    </div>
  );
};

const Attribution = () => (
    <div className="col-span-full rounded-2xl text-white bg-black/40 mr-auto px-2 py-1 text-xs">
      <span>Image: </span>
      <Link
          href="http://creativecommons.org/licenses/by-sa/3.0/"
          title="Creative Commons Attribution-Share Alike 3.0"
          className="underline hover:text-corbinCream transition-colors"
          target="_blank"
          rel="noopener noreferrer"
      >
        CC BY-SA 3.0
      </Link>
      ,{" "}
      <Link
          href="https://commons.wikimedia.org/w/index.php?curid=161452"
          className="underline hover:text-corbinCream transition-colors"
          target="_blank"
          rel="noopener noreferrer"
      >
        Source
      </Link>
    </div>
);

function Trails() {
  const trailInfo = getTrails();

  return (
      <div className="bg-background min-h-screen">
        <div className="flex gap-2 p-4 sm:flex-row sm:items-center sm:gap-6 sm:py-4">
          <Navbar />
        </div>

        <main className="px-4 pb-8">
          <section className="flex flex-row justify-center mb-6">
            <div className="flex flex-col text-center max-w-2xl">
              <h1 className="text-4xl font-semibold text-corbinRed">
                Trails
              </h1>
              <p className="text-lg font-semibold text-corbinBlue mt-2">
                Which trail is right for you?
              </p>
              <p className="text-base font-medium text-corbinBlue mt-1">
                Did you know Corbin has over 50 miles of trails?
              </p>
            </div>
          </section>

          <section
              className="relative rounded-2xl max-w-7xl mx-auto overflow-hidden mb-6"
          >
            <div className="absolute inset-0 z-0">
              <Image
                  src={cumberlandFalls}
                  alt="Cumberland Falls"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1280px"
                  priority
                  className="object-cover"
                  quality={85}
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              <Attribution />

              {trailInfo.map((trail, index) => (
                  <TrailsCard
                      key={index}
                      title={trail.title}
                      description={trail.description}
                  />
              ))}
            </div>
          </section>

          <div className="flex w-full justify-center">
            <Link
                href="https://parks.ky.gov/explore/cumberland-falls-state-resort-park-7786#trails"
                className="corbin-button inline-block my-4 bg-corbinBlue text-white rounded-full py-2 px-6 text-base font-medium hover:scale-105 transition duration-200 focus:outline-none focus:ring-2 focus:ring-corbinLightBlue active:bg-corbinLightBlue"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="See more trails at Kentucky State Parks website"
            >
              See More Trails
            </Link>
          </div>
        </main>
      </div>
  );
}

export default Trails;
