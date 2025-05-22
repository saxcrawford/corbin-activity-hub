import React from "react";
import Navbar from "../components/navbar";
import { getRestaurants } from "../lib/data/restaurants";

const TrailsCard = ({
  image,
  title,
  description,
}: {
  image: { src: string };
  title: string;
  description: string;
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${image.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="rounded-2xl bg-corbinGreen shadow-lg p-4 hover:scale-105 transition duration-200"
    >
      <div className="rounded-2xl shadow-lg p-4 h-full text-lightCorbin transition duration-200">
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
        <p className="text-base font-normal">{description}</p>
      </div>
    </div>
  );
};

function Corbin_Eatery() {
  const restaurantInfo = getRestaurants();

  const groupedRestaurants = restaurantInfo.reduce((acc, restaurant) => {
    if (!acc[restaurant.type]) {
      acc[restaurant.type] = [];
    }
    acc[restaurant.type].push(restaurant);
    return acc;
  }, {});

  return (
    <>
      <div className="bg-background h-screen">
        <div className="flex gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4">
          <Navbar />
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col text-center">
            <h1 className="text-[48px]/15 font-semibold text-corbinRed">
              Taste of Corbin
            </h1>
            <p className="text-[20px]/6 font-semibold text-corbinBlue">
              Find the best places to eat in Corbin, Kentucky!
            </p>
            <p className="text-[15px]/5 font-medium text-corbinBlue">
              Did you know Corbin is home to the original Kentucky Fried
              Chicken?
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
          {Object.entries(groupedRestaurants).map(([type, restaurants]) => (
            <div key={type} className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-corbinRed">{type}</h2>
              {restaurants.map((restaurant) => (
                <TrailsCard
                  key={restaurant.id}
                  image={restaurant.image}
                  title={restaurant.name}
                  description={restaurant.description}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Corbin_Eatery;
