"use client";

import { useEffect, useState, useCallback, memo } from "react";
import Image from "next/image";
import Navbar from "./components/navbar";
import Link from "next/link";
import Carousel from "./components/carousel";
import Clock from "./components/clock";
import LoadingSpinner from "./components/loading";
import { getAttributions } from "./lib/data/attributions";

interface Weather {
    weather: {
        description: string;
        icon: string;
    }[];
    main: {
        temp: number;
        humidity: number;
        feels_like: number;
    };
    wind: {
        speed: number;
    };
}

const InfoSection = memo(() => (
    <div className="flex flex-col self-center text-center sm:text-left w-full sm:w-4/5 md:w-2/3 lg:w-auto lg:flex-1 lg:max-w-xl xl:max-w-4xl px-4 sm:px-0">
        <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-corbinRed">
            Corbin Activity Hub
        </h2>
        <p className="font-semibold text-md sm:text-lg md:text-xl leading-normal text-corbinBlue mt-2 sm:mt-3">
            A place to discover, plan, and share activities in and around Corbin,
            Kentucky
        </p>
        <p className="mt-2 text-sm sm:text-base leading-normal font-medium text-corbinBlue">
            Did you know Cumberland Falls is one of the few places in the world with a
            moonbow?
        </p>
        <Link href="/trip_planning" className="mt-6 sm:mt-8 self-center sm:self-start">
            <button
                className="w-36 sm:w-40 text-white rounded-full py-2 px-4 text-sm sm:text-base font-medium cursor-pointer bg-corbinBlue hover:scale-105 transition duration-200 focus:outline-none active:bg-corbinLightBlue focus:ring-2 focus:ring-white"
                aria-label="Plan your trip to Corbin, Kentucky"
                data-testid="plan-trip-button"
            >
                Plan Your Trip
            </button>
        </Link>
    </div>
));

InfoSection.displayName = 'InfoSection';

const WeatherCard = memo(({ weather }: { weather: Weather }) => {
    const weatherIcon = weather.weather[0].icon;
    const webIconAddress = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    const capitalized =
        weather.weather[0].description.charAt(0).toUpperCase() +
        weather.weather[0].description.slice(1);
    const [imgError, setImgError] = useState(false);

    return (
        <div
            className="rounded-xl bg-corbinGray/50 shadow-lg p-3 sm:p-4 mx-2 sm:mx-0 my-3 h-auto sm:min-h-[12rem]"
            role="region"
            aria-label="Current weather information"
        >
            <h2 className="text-lg sm:text-xl font-semibold text-lightCorbin mb-2 text-center sm:text-left">
                Today&apos;s Forecast
            </h2>
            <div className="flex flex-col sm:flex-row justify-around items-center sm:items-stretch gap-3 sm:gap-4">
                <div className="flex flex-col text-center items-center">
                    <Image
                        src={imgError ? "/default-weather-icon.png" : webIconAddress}
                        alt={`Weather icon: ${capitalized}`}
                        width={60}
                        height={60}
                        className="sm:w-[70px] sm:h-[70px]"
                        quality={90}
                        priority={true}
                        onError={() => setImgError(true)}
                    />
                    <p className="text-base sm:text-lg font-normal text-lightCorbin">{capitalized}</p>
                    <p className="text-xl sm:text-2xl font-normal text-lightCorbin">
                        {Math.round(weather.main.temp)}°F
                    </p>
                </div>
                <div className="flex flex-col justify-center text-center sm:text-left">
                    <p className="text-base sm:text-lg font-normal text-lightCorbin">
                        Feels Like: {Math.round(weather.main.feels_like)}°F
                    </p>
                    <p className="text-base sm:text-lg font-normal text-lightCorbin">
                        Humidity: {weather.main.humidity}%
                    </p>
                    <p className="text-base sm:text-lg font-normal text-lightCorbin">
                        Wind Speed: {weather.wind.speed} mph
                    </p>
                </div>
            </div>
        </div>
    );
});

WeatherCard.displayName = 'WeatherCard';

const ErrorCard = memo(({ onRetry }: { onRetry: () => void }) => (
    <div className="rounded-xl bg-corbinGray/50 shadow-lg p-3 sm:p-4 mx-2 sm:mx-0 my-3 h-auto sm:min-h-[12rem] flex flex-col items-center justify-center text-center">
        <h2 className="text-lg sm:text-xl font-semibold text-lightCorbin">
            Unable to load weather data
        </h2>
        <p className="text-lightCorbin text-sm sm:text-base mt-1">
            We&apos;re having trouble connecting. Please try again.
        </p>
        <button
            onClick={onRetry}
            className="mt-3 sm:mt-4 px-4 py-2 bg-corbinBlue text-white rounded-full cursor-pointer text-sm sm:text-base hover:bg-corbinLightBlue transition duration-200 focus:ring-2 focus:ring-white"
            aria-label="Refresh weather data"
        >
            Refresh
        </button>
    </div>
));

ErrorCard.displayName = 'ErrorCard';

const MainCard = memo(({
                           weather,
                           error,
                           onRetry
                       }: {
    weather: Weather | null;
    error: Error | null;
    onRetry: () => void;
}) => (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:w-auto lg:flex-shrink-0 xl:max-w-xl 2xl:max-w-2xl bg-corbinBlue rounded-2xl shadow-lg p-3 sm:p-4 md:p-5 self-center">
        <div className="rounded-2xl bg-corbinGreen flex flex-col justify-center gap-3 sm:gap-4 shadow-lg p-3 sm:p-4">
            <div className="text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-lightCorbin">Welcome!</h3>
                <Clock
                    format={"h:mm:ssa"}
                    ticking={true}
                    className="text-xl sm:text-2xl md:text-3xl font-semibold text-lightCorbin"
                />
            </div>

            {error || !weather ? <ErrorCard onRetry={onRetry} /> : <WeatherCard weather={weather} />}

            <div>
                <Carousel attributions={getAttributions()} />
            </div>
        </div>
    </div>

));

MainCard.displayName = 'MainCard';

const PageLayout = memo(({ children }: { children: React.ReactNode }) => (
    <div className="bg-background min-h-screen flex flex-col">
        <div className="w-full">
            <Navbar />
        </div>
        <main className="flex-grow flex flex-col lg:flex-row items-center lg:items-start justify-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16 py-6 sm:py-8 md:py-10 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {children}
        </main>
    </div>
));

PageLayout.displayName = 'PageLayout';

function useWeather(refreshInterval = 60000) {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const API_BASE_URL = 'https://weather-api-43md.onrender.com';

    const fetchWeather = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/api/weather/currentCorbin`);
            if (!response.ok) {
                let errorMsg = `Failed to fetch weather: ${response.status}`;
                try {
                    const errorData = await response.json();
                    if (errorData && errorData.message) {
                        errorMsg = errorData.message;
                    }
                }
                catch (err) {
                    console.error("Failed to parse error data:", err);
                    errorMsg = "Failed to fetch weather";
                }
                throw new Error(errorMsg);
            }
            const data = await response.json();
            setWeather(data);
        } catch (err) {
            console.error("Weather fetch error:", err);
            setError(err as Error);
            setWeather(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWeather();

        const intervalId = refreshInterval > 0
            ? setInterval(fetchWeather, refreshInterval)
            : undefined;

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [fetchWeather, refreshInterval]);

    return { weather, loading, error, refetch: fetchWeather };
}


function Home() {
    const { weather, loading, error, refetch } = useWeather();

    const handleRetry = useCallback(() => {
        refetch();
    }, [refetch]);

    return (
        <PageLayout>
            {loading ? (
                <main className="flex items-center justify-center">
                    <LoadingSpinner />
                </main>
            ) : (
                <>
                    <InfoSection />
                    <MainCard weather={weather} error={error} onRetry={handleRetry} />
                </>
            )}
        </PageLayout>
    );
}

export default Home;