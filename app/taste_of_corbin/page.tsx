import React from "react";
import Navbar from "../components/navbar";

function Corbin_Eatery() {
  return (
      <>
        <div className="bg-background min-h-screen flex flex-col">
          <div className="w-full">
            <Navbar />
          </div>

          <div className="flex-grow flex flex-col items-center justify-center px-4">
            <div className="text-center max-w-2xl mx-auto">

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-corbinRed mb-4">
                Under Construction
              </h1>

              <h2 className="text-2xl sm:text-3xl font-semibold text-corbinBlue mb-6">
                Taste of Corbin
              </h2>

              <p className="text-lg sm:text-xl text-corbinBlue mb-4 leading-relaxed">
                We&apos;re cooking up something special! Our restaurant guide is currently being prepared
                to showcase the best dining experiences in Corbin, Kentucky.
              </p>

              <p className="text-base sm:text-lg text-corbinBlue/80 mb-8">
                Come back soon to discover amazing local eateries, including the birthplace of Kentucky Fried Chicken!
              </p>

              <div className="w-full max-w-md mx-auto mb-8">
                <div className="flex justify-between text-sm text-corbinBlue mb-2">
                  <span>Progress</span>
                  <span>25%</span>
                </div>
                <div className="w-full bg-corbinGray/30 rounded-full h-3">
                  <div
                      className="bg-gradient-to-r from-corbinRed to-corbinBlue h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: '25%' }}
                  ></div>
                </div>
              </div>

              <div className="bg-corbinGreen/10 border border-corbinGreen/20 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-corbinGreen mb-2">
                  Did You Know?
                </h3>
                <p className="text-corbinBlue">
                  Corbin, Kentucky is the birthplace of Kentucky Fried Chicken!
                  Colonel Sanders opened his first restaurant here in 1930.
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-corbinBlue/60 font-medium">
                  Expected to be available soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default Corbin_Eatery;