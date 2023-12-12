import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { Search } from "./Search";
import Loader from "./Loader";
import MessageError from "./MessageError";
import TemperatureToggle from "./TemperatureToggle ";

const BASE_USL = "https://api.openweathermap.org/data/2.5";

const API_KEY = "5e4971375e6ec66b3c2ab9b6d5dbd6b7";

const Main = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [temp, setTemp] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  const convertTemperature = (Temperature) => {
    if (isCelsius) {
      return Temperature;
    } else {
      // Convert Celsius to Fahrenheit
      return (Temperature * 9) / 5 + 32;
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        setTemp(null);
        setError("");
        const response = await fetch(
          `${BASE_USL}/weather?q=${query}&appid=${API_KEY}&utits=metric`,
          { signal }
        ); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Error: Unable to fetch the city");
        }
        const data = await response.json();
        console.log("data omaddddd", data);
        setData(data);
        setTemp(Math.round(data?.main?.temp));
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      }
      setIsLoading(false);
    };

    if (query.length < 3) {
      setData([]);
      setError("");
      setTemp(null);
      return;
    }

    fetchData();

    return () => {
      abortController.abort(); // Cancel the request on cleanup
    };
  }, [query]);
  console.log(temp);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
      </NavBar>

      <MainBody>
        <HoldUpWeathers>
          {isLoading && <Loader />}
          {error && <MessageError message={error} />}
          {!isLoading && !error && (
            <ShowWeather
              temp={temp}
              data={data}
              convertTemperature={convertTemperature}
              isCelsius={isCelsius}
            />
          )}
        </HoldUpWeathers>
        <HoldUpWeathers>
          <TemperatureToggle
            isCelsius={isCelsius}
            setIsCelsius={setIsCelsius}
            data={data}
            error={error}
            isLoading={isLoading}
          />
        </HoldUpWeathers>
      </MainBody>
    </>
  );
};

const HoldUpWeathers = ({ children }) => {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
};

const MainBody = ({ children }) => {
  return <main className="main">{children}</main>;
};

const ShowWeather = ({ data, temp, convertTemperature, isCelsius }) => {
  return (
    <div className="holdUp-theWeaher">
      <h1>
        {data?.name} {data?.sys?.country}
      </h1>
      <div className="holdUp-theWeaher">
        {data?.name && (
          <>
            <img
              alt="weather icon"
              src={`https://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`}
            />
            <span className="weather-detail">{data?.weather[0]?.main}</span>
            <p className="weather-detail">
              Current Temperature: {convertTemperature(temp)}{" "}
              {isCelsius ? "°C" : "°F"}
            </p>
            <p className="weather-detail">
              humidity: <span>{data?.main?.humidity} %</span>
            </p>
            <p className="weather-detail">
              humidity: <span>{data?.wind?.speed} m/s</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
