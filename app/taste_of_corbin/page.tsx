import React from "react";
import Navbar from "../components/navbar";
import { getRestaurants } from "../lib/data/restaurants";
import Link from "next/link";

const RestaurantCards = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  return (
      <div
          className="flex flex-col rounded-2xl transition-transform duration-200 ease-in-out group hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-corbinRed focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          tabIndex={0}
      >
        <div
            className="flex flex-col bg-corbinGreen justify-between rounded-2xl border-2 border-lightCorbin bg-corbinGray/30 p-4 min-h-[12rem] sm:min-h-[14rem] h-full transition-all duration-200 ease-in-out group-hover:bg-corbinGreen/90 group-focus:bg-corbinGreen/90 group-hover:shadow-xl group-focus:shadow-xl"
        >
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white group-hover:text-lightCorbin group-focus:text-lightCorbin transition-colors">
              {name}
            </h2>
          </div>
          <div>
            <p
                className="text-sm sm:text-base font-normal text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-focus:opacity-100 group-hover:text-lightCorbin group-focus:text-lightCorbin"
            >
              {description}
            </p>
          </div>
        </div>
      </div>
  );
}

function Corbin_Eatery() {
  const restaurantInfo = getRestaurants();

  return (
      <>
        <div className="bg-background min-h-screen flex flex-col">
          <div className="w-full">
            <Navbar />
          </div>

          <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pb-8 sm:py-12">
            <section className="flex flex-col items-center text-center mb-8 sm:mb-10 md:mb-12">
              <div className="max-w-2xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-corbinRed">
                  Explore Our Trails
                </h1>
                <p className="text-md sm:text-lg md:text-xl font-semibold text-corbinBlue mt-2 sm:mt-3">
                  Which trail is right for you?
                </p>
                <p className="text-sm sm:text-base font-medium text-corbinBlue mt-1 sm:mt-2">
                  Did you know Corbin has over 50 miles of scenic trails?
                </p>
              </div>
            </section>

            <section
                className="relative rounded-2xl max-w-7xl mx-auto overflow-hidden mb-8 sm:mb-10 md:mb-12"
            >

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 p-4 sm:p-5 md:p-6">
                {restaurantInfo.map((restaurant, index) => (
                    <RestaurantCards
                        key={index}
                        name={restaurant.name}
                        description={restaurant.description}
                    />
                ))}
              </div>
            </section>

            <div className="flex w-full justify-center">
              <Link
                  href="https://parks.ky.gov/explore/cumberland-falls-state-resort-park-7786#trails"
                  className="corbin-button inline-block bg-corbinBlue text-white cursor-pointer rounded-full py-2.5 px-6 text-sm sm:text-base font-medium hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-corbinLightBlue focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-corbinLightBlue/80"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="See more trails at Kentucky State Parks website"
              >
                See More Trails
              </Link>
            </div>
          </main>
        </div>
      </>
  );
}

export default Corbin_Eatery;