"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/navbar";
import LoadingSpinner from "../components/loading";

interface WeatherData {
  list: {
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
  }[];
}

function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const API_BASE_URL = 'https://weather-api-43md.onrender.com';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/weather/corbin`);
        if (!response.ok) {
          throw new Error(`Failed to fetch weather: ${response.status}`);
        }
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const formatDate = (daysToAdd: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const capitalizeFirst = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const WeatherCard = ({
                         dayIndex,
                         date,
                       }: {
    dayIndex: number;
    date: string;
  }) => {
    if (!weather?.list || !weather.list[dayIndex * 8]) {
      return <div className="rounded-2xl bg-corbinGreen shadow-lg p-4">No data available</div>;
    }

    const index = dayIndex * 8; // Each day is 8 entries apart in the API
    const weatherIcon = weather.list[index].weather[0]?.icon || "01d";
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    const description = capitalizeFirst(
        weather.list[index].weather[0]?.description || "Unknown"
    );
    const temp = Math.round(weather.list[index].main.temp);
    const feelsLike = Math.round(weather.list[index].main.feels_like);
    const humidity = weather.list[index].main.humidity;
    const windSpeed = weather.list[index].wind.speed;

    return (
        <div className="rounded-2xl bg-corbinGreen shadow-lg p-4 hover:scale-105 transition duration-200">
          <div className="rounded-2xl bg-corbinGray/50 shadow-lg p-4 h-full">
            <h2 className="text-xl font-semibold text-lightCorbin mb-3">
              {date}
            </h2>
            <div className="flex flex-col sm:flex-row justify-around items-center">
              <div className="flex flex-col text-center items-center mb-3 sm:mb-0">
                <Image
                    src={iconUrl}
                    alt={`Weather: ${description}`}
                    width={60}
                    height={60}
                    priority
                />
                <p className="text-base font-normal text-lightCorbin">
                  {description}
                </p>
                <p className="text-2xl font-normal text-lightCorbin">{temp}°F</p>
              </div>
              <div className="flex flex-col justify-center">
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

  if (loading) {
    return (
        <div className="bg-background min-h-screen">
          <div className="flex gap-2 p-4 sm:flex-row sm:items-center sm:gap-6 sm:py-4">
            <Navbar />
          </div>
          <main className="flex items-center justify-center h-[70vh]">
            <LoadingSpinner />
          </main>
        </div>
    );
  }

  if (error || !weather) {
    return (
        <div className="bg-background min-h-screen">
          <div className="flex gap-2 p-4 sm:flex-row sm:items-center sm:gap-6 sm:py-4">
            <Navbar />
          </div>
          <main className="flex items-center justify-center h-[70vh] px-4">
            <div className="rounded-2xl bg-corbinGreen shadow-lg p-4 w-full max-w-md hover:scale-105 transition duration-200">
              <div className="rounded-2xl bg-corbinGray/50 shadow-lg p-4 h-full">
                <div className="flex flex-col items-center justify-center">
                  <h2 className="mb-2 text-2xl font-bold text-corbinRed">
                    Unable to load weather data
                  </h2>
                  <p className="text-base text-center text-corbinBlue">
                    We&apos;re having trouble connecting to our weather service.
                    Please try again later or check your internet connection.
                  </p>
                  <button
                      onClick={() => window.location.reload()}
                      className="mt-4 px-4 py-2 bg-corbinBlue text-white rounded-full hover:bg-corbinBlueLight transition duration-200"
                      aria-label="Refresh weather data"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
    );
  }

  return (
      <div className="bg-background min-h-screen">
        <div className="flex gap-2 p-4 sm:flex-row sm:items-center sm:gap-6 sm:py-4">
          <Navbar />
        </div>
        <div className="flex flex-row justify-center mb-8">
          <div className="flex flex-col text-center max-w-2xl px-4">
            <h1 className="text-4xl font-semibold text-corbinRed">
              5-Day Weather Forecast
            </h1>
            <p className="text-xl font-semibold text-corbinBlue mt-2">
              What is the weather like?
            </p>
            <p className="text-base font-medium text-corbinBlue mt-1">
              Did you know Corbin has a temperate climate with four distinct
              seasons?
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 pb-8">
          {[0, 1, 2, 3, 4].map((day) => (
              <WeatherCard key={day} dayIndex={day} date={formatDate(day + 1)} />
          ))}
        </div>
      </div>
  );
}

export default Weather;