"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Navbar from "../components/navbar";
import LoadingSpinner from "../components/loading";

interface WeatherForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
}

interface WeatherData {
  list: WeatherForecastItem[];
}

const ErrorDisplay = ({ onRetry }: { onRetry: () => void }) => (
    <main className="flex-grow flex items-center justify-center px-4 py-8">
      <div className="rounded-2xl bg-corbinGreen shadow-lg p-4 sm:p-6 w-full max-w-md text-center">
        <div className="rounded-2xl bg-corbinGray/50 shadow-lg p-4 sm:p-6 h-full">
          <div className="flex flex-col items-center justify-center">
            <h2 className="mb-3 text-xl sm:text-2xl font-bold text-corbinRed">
              Unable to Load Weather
            </h2>
            <p className="text-sm sm:text-base text-corbinBlue mb-4">
              There was an issue fetching the weather forecast. Please check your
              connection and try again.
            </p>
            <button
                onClick={onRetry}
                className="px-5 py-2.5 bg-corbinBlue text-white rounded-full text-sm sm:text-base font-medium hover:bg-corbinLightBlue transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Retry fetching weather data"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </main>
);

const WeatherCard = ({
                       weatherItem,
                       date,
                       isPriority,
                     }: {
  weatherItem: WeatherForecastItem;
  date: string;
  isPriority: boolean;
}) => {
  const [imgError, setImgError] = useState(false);

  const weatherIcon = weatherItem.weather[0]?.icon || "01d";
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  const description =
      weatherItem.weather[0]?.description.charAt(0).toUpperCase() +
      weatherItem.weather[0]?.description.slice(1) || "Clear sky";

  const temp = Math.round(weatherItem.main.temp);
  const feelsLike = Math.round(weatherItem.main.feels_like);
  const humidity = weatherItem.main.humidity;
  const windSpeed = weatherItem.wind.speed;

  return (
      <div className="rounded-2xl bg-corbinGreen shadow-lg p-4 mx-5 sm:m-0 sm:p-4 hover:scale-105 transition-transform duration-200 ease-in-out">
        <div className="rounded-2xl bg-corbinGray/50 shadow-lg p-3 sm:p-4 h-full">
          <h2 className="text-lg sm:text-xl font-semibold text-lightCorbin mb-2 sm:mb-3 text-left">
            {date}
          </h2>
          <div className="flex flex-col sm:flex-row justify-around items-center gap-3 sm:gap-4">
            <div className="flex flex-col text-center items-center">
              <Image
                  src={imgError ? "/default-weather-icon.png" : iconUrl}
                  alt={`Weather: ${description}`}
                  width={60}
                  height={60}
                  className="sm:w-[70px] sm:h-[70px]"
                  priority={isPriority}
                  onError={() => setImgError(true)}
              />
              <p className="text-base font-normal text-lightCorbin mt-1">
                {description}
              </p>
              <p className="text-xl sm:text-2xl font-normal text-lightCorbin">
                {temp}°F
              </p>
            </div>
            <div className="flex flex-col justify-center text-left">
              <p className="text-base font-normal text-lightCorbin">
                Feels Like: {feelsLike}°F
              </p>
              <p className="text-base font-normal text-lightCorbin">
                Humidity: {humidity}%
              </p>
              <p className="text-base font-normal text-lightCorbin">
                Wind Speed: {windSpeed} mph
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const API_BASE_URL = 'https://weather-api-43md.onrender.com';

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    setWeather(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/weather/corbin`);
      if (!response.ok) {
        throw new Error(`Failed to fetch weather: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchWeather().then(r => r);
  }, [fetchWeather]);

  const formatDate = (daysToAdd: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
        <div className="bg-background min-h-screen flex flex-col">
          <div className="w-full"><Navbar /></div>
          <main className="flex-grow flex items-center justify-center">
            <LoadingSpinner />
          </main>
        </div>
    );
  }

  if (error || !weather || !weather.list || weather.list.length === 0) {
    return (
        <div className="bg-background min-h-screen flex flex-col">
          <div className="w-full"><Navbar /></div>
          <ErrorDisplay onRetry={fetchWeather} />
        </div>
    );
  }

  const dailyForecasts = weather.list.filter((_, index) => index % 8 === 0).slice(0, 5);

  if (dailyForecasts.length === 0) {
    return (
        <div className="bg-background min-h-screen flex flex-col">
          <div className="w-full"><Navbar /></div>
          <ErrorDisplay onRetry={fetchWeather} />
        </div>
    );
  }

  return (
      <div className="bg-background min-h-screen flex flex-col">
        <div className="w-full">
          <Navbar />
        </div>
        <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-corbinRed">
                5-Day Weather Forecast
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-corbinBlue mt-2 sm:mt-3">
                Plan your week in Corbin, KY
              </p>
              <p className="text-sm sm:text-base font-medium text-corbinBlue mt-1 sm:mt-2">
                Corbin typically enjoys a temperate climate with four distinct seasons.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {dailyForecasts.map((forecastItem, index) => (
                <WeatherCard
                    key={forecastItem.dt}
                    weatherItem={forecastItem}
                    date={formatDate(index)}
                    isPriority={index < 2}
                />
            ))}
          </div>
        </main>
      </div>
  );
}

export default Weather;