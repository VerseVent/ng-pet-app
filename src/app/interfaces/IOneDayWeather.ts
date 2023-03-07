export interface IOneDayWeather {
  clouds: ICloud;
  dt: number;
  id: number;
  main: IMainWeather;
  sys: ISystem;
  weather: ICurrentWeather[];
  wind: IWind;
}

export interface IFiveDayWeather {
  list: IFiveDayWeatherUnit[];
}

export interface IFiveDayWeatherUnit {
  clouds: ICloud;
  dt: number;
  dt_txt: string;
  main: IMainFiveWeather;
  pop: number;
  snow: ISnow | undefined;
  sys: { pod: string };
  visibility: number;
  weather: ICurrentWeather;
  wind: IWind;
}

interface ISnow {
  '3h': number;
}

interface ICloud {
  all: number;
}

interface IWind {
  speed: number;
  deg: number;
  gust: number | undefined;
}

interface ICurrentWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface IMainWeather {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}
interface IMainFiveWeather {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
}

interface ISystem {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}
