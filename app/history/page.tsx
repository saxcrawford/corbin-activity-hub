import React from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import corbinOld from "../images/corbin-old.jpg";
import Image from "next/image";

function History() {
    return (
        <div className="bg-background min-h-screen flex flex-col">
            <div className="w-full">
                <Navbar/>
            </div>

            <main className="flex-grow flex items-center justify-center mx-auto xl:max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-30 items-center justify-center lg:justify-start">
                    <div className="flex flex-col w-full lg:w-1/3 lg:sticky lg:top-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-corbinRed">
                            History of Corbin
                        </h1>
                        <p className="text-md sm:text-lg md:text-xl font-semibold text-corbinBlue mt-2">
                            What you need to know about Corbin, Kentucky
                        </p>
                        <p className="text-xs sm:text-sm md:text-base font-medium text-corbinBlue mt-4">
                            Did you know Corbin is home to the original Kentucky Fried
                            Chicken?
                        </p>
                        <div className="mt-6 shadow-lg rounded-2xl">
                            <div className="relative aspect-video w-full">
                                <Image
                                    src={corbinOld}
                                    alt="Historical photograph of Corbin"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-t-2xl"
                                    placeholder="blur"
                                />
                            </div>
                            <div
                                className="rounded-b-2xl bg-black/50 p-2 border-t border-lightCorbin/50 text-center text-xs sm:text-sm text-white">
                                By{" "}
                                <Link
                                    href="//commons.wikimedia.org/w/index.php?title=User:Derek1252&amp;action=edit&amp;redlink=1"
                                    className="underline hover:text-blue-300 transition-colors"
                                    title="User:Derek1252 (page does not exist)"
                                >
                                    Derek1252
                                </Link>{" "}
                                - <span className="int-own-work">Self-photographed</span>,{" "}
                                <Link
                                    href="https://creativecommons.org/licenses/by-sa/3.0"
                                    className="underline hover:text-blue-300 transition-colors"
                                    title="Creative Commons Attribution-Share Alike 3.0"
                                    rel="license noopener noreferrer"
                                    target="_blank"
                                >
                                    CC BY-SA 3.0
                                </Link>
                                ,{" "}
                                <Link
                                    href="https://commons.wikimedia.org/w/index.php?curid=25097468"
                                    className="underline hover:text-blue-300 transition-colors"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    Link
                                </Link>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-center lg:justify-start">
                            <Link
                                href="https://en.wikipedia.org/wiki/Corbin,_Kentucky"
                                className="inline-block"
                            >
                                <button
                                    className="bg-corbinGreen cursor-pointer text-white rounded-full py-2.5 px-6 text-sm sm:text-base font-medium hover:scale-105 transition-all duration-200 focus:outline-none active:bg-corbinGreen/80 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-corbinGreen">
                                    Read More Here
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div
                        className="flex flex-col md:flex-row w-full bg-corbinBlue text-white rounded-2xl p-4 sm:p-6 md:p-8 gap-6 md:gap-8 lg:w-2/3">
                        <div className="w-full md:w-1/2 space-y-3">
                            <p className="text-sm sm:text-base font-medium leading-relaxed">
                                The town now known as Corbin was officially incorporated in
                                1895, situated along Lynn Camp Creek. Before incorporation, the
                                area bore the name Lynn Camp, after William Lynn, a traveler
                                from Virginia who disappeared in the region around 1800.
                            </p>
                            <p className="text-sm sm:text-base font-medium leading-relaxed">
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
                        <div className="w-full md:w-1/2 space-y-3">
                            <p className="text-sm sm:text-base font-medium leading-relaxed">
                                Interestingly, the wives of these two families—Emaline Cummins
                                and Armelda Moore—were sisters, daughters of George Y. Sears,
                                who owned substantial land in the region. Railroad development
                                played a crucial role in the town&apos;s growth. After the Civil
                                War, tracks initially extended only as far as Livingston,
                                Kentucky, but by 1883, they reached what would become Corbin and
                                continued to Jellico.
                            </p>
                            <p className="text-sm sm:text-base font-medium leading-relaxed">
                                The town&apos;s naming has an interesting
                                history. James Eaton, serving as the first postmaster, initially
                                named the settlement &quot;Cummins&quot; to honor his friend
                                Nelson Cummins. However, the U.S. Postal Department informed him
                                this name couldn&apos;t be used because another post office with
                                the same name already existed in Rockcastle County. In 1885,
                                Eaton renamed the town after Reverend James Corbin Floyd, a
                                minister who happened to be visiting at that time.{" "}
                                <Link
                                    className="text-corbinSalmon underline decoration-solid hover:text-corbinSalmon/80 transition-colors"
                                    href={"https://www.corbin-ky.gov/Blog/3/history-of-corbin"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    (Source: City of Corbin)
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
