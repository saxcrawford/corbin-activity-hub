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
    <div className="flex flex-col self-center w-full sm:w-2/3 md:w-1/2 px-4 sm:px-0">
      <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight text-corbinRed">
        Corbin Activity Hub
      </h2>
      <p className="font-semibold text-lg sm:text-xl leading-normal text-corbinBlue">
        A place to discover, plan, and share activities in and around Corbin,
        Kentucky
      </p>
      <p className="mt-2 text-base leading-normal font-medium text-corbinBlue">
        Did you know Cumberland Falls is one of the few places in the world with a
        moonbow?
      </p>
      <Link href="/trip_planning">
        <button
            className="mt-8 w-36 text-white rounded-full py-2 px-4 text-base font-medium cursor-pointer bg-corbinBlue hover:scale-105 transition duration-200 focus:outline-none active:bg-corbinLightBlue focus:ring-2 focus:ring-white"
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
          className="rounded-xl bg-corbinGray/50 shadow-lg p-4 mx-2 sm:mx-4 my-3 h-auto sm:h-48"
          role="region"
          aria-label="Current weather information"
      >
        <h2 className="text-xl font-semibold text-lightCorbin mb-2">
          Today&apos;s Forecast
        </h2>
        <div className="flex flex-col sm:flex-row justify-around content-center gap-4 sm:gap-0">
          <div className="flex flex-col text-center items-center">
            <Image
                src={imgError ? "/default-weather-icon.png" : webIconAddress}
                alt={`Weather icon: ${capitalized}`}
                width={70}
                height={70}
                quality={90}
                priority={true}
                onError={() => setImgError(true)}
            />
            <p className="text-lg font-normal text-lightCorbin">{capitalized}</p>
            <p className="text-2xl font-normal text-lightCorbin">
              {Math.round(weather.main.temp)}°F
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg font-normal text-lightCorbin">
              Feels Like: {Math.round(weather.main.feels_like)}°F
            </p>
            <p className="text-lg font-normal text-lightCorbin">
              Humidity: {weather.main.humidity}%
            </p>
            <p className="text-lg font-normal text-lightCorbin">
              Wind Speed: {weather.wind.speed} mph
            </p>
          </div>
        </div>
      </div>
  );
});

WeatherCard.displayName = 'WeatherCard';

const ErrorCard = memo(({ onRetry }: { onRetry: () => void }) => (
    <div className="rounded-xl bg-corbinGray/50 shadow-lg p-4 mx-2 sm:mx-4 my-3 h-auto sm:h-48">
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-semibold text-lightCorbin">
          Unable to load weather data
        </h2>
        <p className="text-lightCorbin text-center">
          We&apos;re having trouble connecting to our weather service. Please try
          again later or check your internet connection.
        </p>
        <button
            onClick={onRetry}
            className="mt-2 px-4 py-2 bg-corbinBlue text-white rounded-full cursor-pointer hover:bg-corbinLightBlue transition duration-200 focus:ring-2 focus:ring-white"
            aria-label="Refresh weather data"
        >
          Refresh
        </button>
      </div>
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
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-corbinBlue rounded-2xl shadow-lg p-4 sm:p-5">
      <div className="rounded-2xl bg-corbinGreen flex flex-col justify-center gap-4 sm:gap-5 shadow-lg p-3 sm:p-4">
        <div className="text-center text-xl">
          <h3 className="text-3xl sm:text-4xl font-semibold text-lightCorbin">Welcome!</h3>
          <Clock
              format={"h:mm:ssa"}
              ticking={true}
              className="text-2xl sm:text-3xl font-semibold text-lightCorbin"
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
    <div className="bg-background min-h-screen">
      <div className="flex gap-2 p-4 sm:p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4">
        <Navbar />
      </div>
      <main className="flex flex-col lg:flex-row items-center justify-center h-3/4 px-4 sm:px-20 pt-8 sm:pt-10 gap-8 sm:gap-20">
        {children}
      </main>
    </div>
));

PageLayout.displayName = 'PageLayout';

function useWeather(refreshInterval = 60000) {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchWeather = useCallback(async () => {
    try {
      const weatherApiUrl = process.env.NEXT_PUBLIC_WEATHER_API_URL;
      if (!weatherApiUrl) {
        throw new Error('Weather API URL is not defined');
      }

      const url = new URL(weatherApiUrl);
      url.searchParams.append('_t', Date.now().toString());

      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch weather: ${response.status}`);
      }

      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError(new Error("Network error. Please check your connection."));
      } else {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
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

  return (
      <PageLayout>
        {loading ? (
            <LoadingSpinner />
        ) : (
            <>
              <InfoSection />
              <MainCard weather={weather} error={error} onRetry={refetch} />
            </>
        )}
      </PageLayout>
  );
}

export default Home;