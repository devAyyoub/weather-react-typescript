import axios from "axios";
// import { object, number, string, InferOutput, parse } from "valibot";
import { SearchType } from "../types";
import { z } from "zod";
import { useState } from "react";

// const isWeatherResponse = (weather: unknown) : weather is Weather => {
//   return (
//     Boolean(weather) &&
//     typeof weather === "object" &&
//     typeof (weather as Weather).name === "string" &&
//     typeof (weather as Weather).main.temp === 'number' &&
//     typeof (weather as Weather).main.temp_max === 'number' &&
//     typeof (weather as Weather).main.temp_min === 'number'
//   );
// };

// Zod

const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});
export type Weather = z.infer<typeof Weather>;

// Valibot
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_max: number(),
//     temp_min: number(),
//   }),
// });

// type Weather = InferOutput<typeof WeatherSchema>;

export default function useWeather() {
  const [weather, setWeather] = useState<Weather>({
    name: "",
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
  });
  const fetchWeather = async (search: SearchType) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`;

      const { data } = await axios.get(geoUrl);
      const lat = data[0].lat;
      const lon = data[0].lon;
      console.log(lat);
      console.log(lon);

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      //   const { data: weatherResult } = await axios.get(weatherUrl);
      //   const result = isWeatherResponse(weatherResult);
      //   if (result) {
      //     weatherResult.
      //   }

      // Zod
      const { data: weatherResult } = await axios.get(weatherUrl);
      const result = Weather.safeParse(weatherResult);
      if (result.success) {
        setWeather(result.data);
      } else {
        console.log("Respuesta mal formada...");
      }

      // Valibot
      //   const { data: weatherResult } = await axios.get(weatherUrl);
      //   const result = parse(WeatherSchema, weatherResult);
      //   if(result) {
      //     console.log(result.name)
      //   } else {
      //     console.log("Respuesta mal formada...")
      //   }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    weather,
    fetchWeather
  };
}
