import React from "react";
import Navbar from "../components/navbar";
import {getRestaurants} from "../lib/data/restaurants";
import Link from "next/link";

const RestaurantCards = ({
                             name,
                             cuisine,
                             rating,
                             description,
                         }: {
    name: string;
    cuisine: string;
    rating: number;
    description: string;
}) => {
    return (
        <div
            className="flex flex-col shadow-md rounded-2xl transition-transform duration-200 ease-in-out group hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-corbinRed focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            tabIndex={0}
        >
            <div
                className="bg-corbinRedLight rounded-tl-2xl rounded-tr-2xl border-t-1 border-r-1 border-l-1 border-white p-4 min-h-[10rem] sm:min-h-[12rem] h-full transition-all duration-200 ease-in-out group-hover:shadow-xl group-focus:shadow-xl"
            >
                test
            </div>
            <div
                className="flex flex-col bg-white justify-between rounded-bl-2xl rounded-br-2xl border-t-1 border-r-1 border-l-1 border-white p-4 min-h-[12rem] sm:min-h-[14rem] h-full transition-all duration-200 ease-in-out group-hover:shadow-xl group-focus:shadow-xl"
            >
                <div>
                    <h2 className="text-lg sm:text-xl mb-1 font-semibold text-corbinBlue ">
                        {name}
                    </h2>
                    <p
                        className="text-sm sm:text-base mb-1 font-normal text-corbinBlue"
                    >
                        {cuisine}
                    </p>
                    <p
                        className="text-sm sm:text-base font-normal text-corbinBlue"
                    >
                        {rating}
                    </p>
                </div>
                <div>
                    <p
                        className="text-sm sm:text-base font-normal text-corbinBlue transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-focus:opacity-100"
                    >
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
const RestaurantType = ["American", "Indian", "Pizza", "Barbecue", "Bar & Grill", "Mexican", "Japanese", "Chinese"]

function Corbin_Eatery() {
    const restaurantInfo = getRestaurants();
    const restaurantTypes = RestaurantType.map(type =>
        <button className="bg-corbinGray rounded-full cursor-pointer text-corbinBlue font-semibold px-5 py-2 mb-5 hover:bg-corbinGreen hover:text-lightCorbin hover:scale-105 transition-all duration-200" key={type}>{type}</button>
    );

    return (
        <>
            <div className="bg-background min-h-screen flex flex-col">
                <div className="w-full bg-gradient-to-r from-corbinBlue to-lightCorbin">
                    <Navbar/>
                </div>

                <main
                    className="flex-grow flex flex-col items-center justify-center pb-8 ">
                    <section className="w-full bg-gradient-to-r from-corbinBlue to-lightCorbin flex flex-col items-center text-center mb-8 py-8 sm:mb-10 md:mb-12">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-lightCorbin text-shadow-md">
                                Taste of Corbin
                            </h1>
                            <p className="text-md sm:text-lg md:text-xl font-semibold text-lightCorbin text-shadow-md mt-2 sm:mt-3">
                                Which restaurant is right for you?
                            </p>
                            <p className="text-sm sm:text-base font-medium text-lightCorbin text-shadow-md mt-1 sm:mt-2">
                                Discover the flavors that make Corbin a culinary destination
                            </p>
                        </div>
                    </section>

                    <section className="w-full flex items-center justify-center gap-5">
                        {restaurantTypes}
                    </section>

                    <section
                        className="relative rounded-2xl max-w-7xl mx-auto overflow-hidden mb-8 sm:mb-10 md:mb-12"
                    >

                        <div
                            className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 p-4 sm:p-5 md:p-6">
                            {restaurantInfo.map((restaurant, index) => (
                                <RestaurantCards
                                    key={index}
                                    name={restaurant.name}
                                    cuisine={restaurant.cuisine}
                                    rating={restaurant.rating}
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