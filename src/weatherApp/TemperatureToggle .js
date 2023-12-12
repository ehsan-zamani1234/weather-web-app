import React from "react";

const TemperatureToggle = ({
  isCelsius,
  setIsCelsius,
  data,
  error,
  isLoading,
}) => {
  //   const [isCelsius, setIsCelsius] = useState(true);
  //   const [temperature, setTemperature] = useState(25);

  const handleToggle = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="temperature">
      <h2>Convert Temperature</h2>
      {data?.main?.temp && !error && !isLoading && (
        <button className="change-temp-btn" onClick={handleToggle}>
          Toggle between Celsius and Fahrenheit
        </button>
      )}
    </div>
  );
};

export default TemperatureToggle;
