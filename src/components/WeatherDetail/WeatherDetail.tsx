import { Weather } from "../../hooks/useWeather";

type WeatherDetailProps = {
  weather: Weather
};

export default function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <>
      <div>
        <p>Ciudad: {weather.name}</p>
        <p>Temperatura actual: {weather.main.temp}</p>
      </div>
    </>
  );
}
