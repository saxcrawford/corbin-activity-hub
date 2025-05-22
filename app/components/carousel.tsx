
"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./carousel.module.css";
import corbinOld from "../images/corbin-old.jpg";
import cumberlandFalls from "../images/cumberlandFalls.jpeg";
import corbinSkyline from "../images/corbinSkyline.jpg";

interface Attribution {
  link: string;
  startAuthor: string;
  linkCC: string;
  startAuthorWiki: string;
  linkWiki: string;
  creativeCommons: string;
}

const Carousel = ({ attributions }: { attributions: Attribution[] }) => {
  const images = [corbinOld, cumberlandFalls, corbinSkyline];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const currentAttribution = attributions[currentIndex];
  const imageDescriptions = ["Historic Corbin downtown view", "Cumberland Falls waterfall", "Corbin skyline"];

  return (
      <div className={styles.carouselContainer} role="region" aria-roledescription="carousel" aria-label="Corbin area images">
        <div className={styles.imageWrapper}>
          <Image
              src={images[currentIndex]}
              alt={imageDescriptions[currentIndex] || `Corbin area image ${currentIndex + 1}`}
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.image}
              priority={currentIndex === 0}
          />

          <button
              onClick={prevImage}
              className={`${styles.arrow} ${styles.prev}`}
              aria-label="Previous image"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
                aria-hidden="true"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <button
              onClick={nextImage}
              className={`${styles.arrow} ${styles.next}`}
              aria-label="Next image"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
                aria-hidden="true"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        <div className="rounded-b-2xl bg-black/40 p-1 border-t-2 border-corbinGreen text-center text-xs sm:text-sm text-white">
          {currentAttribution ? (
              <>
                <a href={currentAttribution.link} className="underline hover:text-corbinCream transition-colors" target="_blank" rel="noopener noreferrer">
                  {currentAttribution.startAuthor}
                </a>{" "}
                <a href={currentAttribution.linkCC} className="underline hover:text-corbinCream transition-colors" target="_blank" rel="noopener noreferrer">
                  {currentAttribution.startAuthorWiki}
                </a>{" "}
                <a href={currentAttribution.linkWiki} className="underline hover:text-corbinCream transition-colors" target="_blank" rel="noopener noreferrer">
                  {currentAttribution.creativeCommons}
                </a>
              </>
          ) : (
              <p>No attribution found.</p>
          )}
        </div>
      </div>
  );
};

export default Carousel;