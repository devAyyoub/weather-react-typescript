import axios from "axios";
import { SearchType } from "../types";

export default function useWeather() {
  const fetchWeather = async (search : SearchType) => {
    try {
        const apiKey = "9117dfd2d06047516ae5c7df98a160f9"
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`;

      const data = await axios.get(geoUrl)
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };
  return {
    fetchWeather,
  };
}
