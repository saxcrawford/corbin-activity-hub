"use client";

const LoadingSpinner = ({ message = "Loading your adventure..." }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4">
            <div
                className="relative w-12 h-12 sm:w-16 sm:h-16"
                role="status"
                aria-label="Loading content"
            >
                <div className="absolute top-0 left-0 w-full h-full border-4 border-corbinBlue/30 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-t-corbinRed rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-base sm:text-lg font-medium text-corbinBlue text-center">
                {message}
            </p>
        </div>
    );
};

export default LoadingSpinner;