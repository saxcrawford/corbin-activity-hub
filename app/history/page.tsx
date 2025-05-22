import React from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import corbinOld from "../images/corbin-old.jpg";

function History() {
  return (
    <div className="bg-background min-h-screen">
      <div className="flex gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4">
        <Navbar />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex flex-col w-full lg:w-1/3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-corbinRed">
              History of Corbin
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-corbinBlue mt-2">
              What you need to know about Corbin, Kentucky
            </p>
            <p className="text-sm sm:text-base font-medium text-corbinBlue mt-4">
              Did you know Corbin is home to the original Kentucky Fried
              Chicken?
            </p>
            <div
                className="mt-6 h-64 rounded-t-2xl bg-corbinGray/20 shadow-lg bg-center bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(${corbinOld.src})`,
                }}
                aria-label="Historical photograph of Corbin"
                role="img"
            ></div>
            <div className="rounded-b-2xl bg-black/40 p-1 border-2 border-lightCorbin text-center text-sm text-white">
              By{" "}
              <Link
                href="//commons.wikimedia.org/w/index.php?title=User:Derek1252&amp;action=edit&amp;redlink=1"
                className="underline hover:text-blue-300"
                title="User:Derek1252 (page does not exist)"
              >
                Derek1252
              </Link>{" "}
              - <span className="int-own-work">Self-photographed</span>,{" "}
              <Link
                href="https://creativecommons.org/licenses/by-sa/3.0"
                className="underline hover:text-blue-300"
                title="Creative Commons Attribution-Share Alike 3.0"
                rel="license noopener noreferrer"
                target="_blank"
              >
                CC BY-SA 3.0
              </Link>
              ,{" "}
              <Link
                href="https://commons.wikimedia.org/w/index.php?curid=25097468"
                className="underline hover:text-blue-300"
                rel="noopener noreferrer"
                target="_blank"
              >
                Link
              </Link>
            </div>
            <div className="mt-6">
              <Link
                href="https://en.wikipedia.org/wiki/Corbin,_Kentucky"
                className="inline-block"
              >
                <button className="bg-corbinGreen cursor-pointer text-white rounded-full py-2 px-6 font-medium hover:scale-105 transition duration-200 focus:outline-none active:bg-corbinGreen/50 focus:ring focus:ring-white">
                  Read More Here
                </button>
              </Link>
            </div>
          </div>

          <div className="flex w-full bg-corbinBlue rounded-2xl gap-5 px-10 lg:w-2/3">
            <div className="w-full mt-8 lg:mt-0 self-center">
              <p className="text-white text-sm sm:text-base font-medium">
                The town now known as Corbin was officially incorporated in
                1895, situated along Lynn Camp Creek. Before incorporation, the
                area bore the name Lynn Camp, after William Lynn, a traveler
                from Virginia who disappeared in the region around 1800.
                Following the American Civil War, the landscape between London
                and Williamsburg contained only about half a dozen farms. Just
                north of present-day Corbin stood a mill run by the McHargue
                family and a post office called &quot;Whip-poor-will.&quot;
                Nearby communities included Woodbine, which had a post office in
                Liberty Sutton&apos;s residence, and Rockholds, where Rosa
                Graves managed a tavern. Another tavern was operated by H.C.
                Gillis. The 1870s saw few inhabitants in the area, with notable
                early settlers including the families of Nelson Cummins and John
                Moore.
              </p>
            </div>
            <div className="w-full mt-8 lg:mt-0 self-center">
              <p className="text-white text-sm sm:text-base font-medium">
                Interestingly, the wives of these two families—Emaline Cummins
                and Armelda Moore—were sisters, daughters of George Y. Sears,
                who owned substantial land in the region. Railroad development
                played a crucial role in the town&apos;s growth. After the Civil
                War, tracks initially extended only as far as Livingston,
                Kentucky, but by 1883, they reached what would become Corbin and
                continued to Jellico. The town&apos;s naming has an interesting
                history. James Eaton, serving as the first postmaster, initially
                named the settlement &quot;Cummins&quot; to honor his friend
                Nelson Cummins. However, the U.S. Postal Department informed him
                this name couldn&apos;t be used because another post office with
                the same name already existed in Rockcastle County. In 1885,
                Eaton renamed the town after Reverend James Corbin Floyd, a
                minister who happened to be visiting at that time.{" "}
                <Link
                  className="text-corbinSalmon underline decoration-solid"
                  href={"https://www.corbin-ky.gov/Blog/3/history-of-corbin"}
                >
                  Based on historical information from the City of Corbin
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default History;
