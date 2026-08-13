import React, { useState, useEffect } from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  Snowflake,
  CloudRain,
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  MapPin,
  Sparkles,
  Bot,
  RefreshCw,
  Info,
  ShieldAlert,
  Shirt
} from 'lucide-react';

interface WeatherLocation {
  name: string;
  key: string;
  description: string;
  altitude: string;
  temp: number;
  tempMax: number;
  tempMin: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  weatherCode: number;
  lastUpdated: string;
}

interface SeasonAdvisory {
  season: string;
  packing: string;
  roadStatus: string;
}

interface WeatherSectionProps {
  onOpenAiAssistant?: (initialQuery?: string) => void;
}

export const WeatherSection: React.FC<WeatherSectionProps> = ({ onOpenAiAssistant }) => {
  const [locations, setLocations] = useState<WeatherLocation[]>([]);
  const [seasonAdvisory, setSeasonAdvisory] = useState<SeasonAdvisory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLocation, setSelectedLocation] = useState<string>('srinagar');
  const [error, setError] = useState<boolean>(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/weather');
      if (!res.ok) throw new Error('Failed to load weather');
      const data = await res.json();
      if (data.locations && data.locations.length > 0) {
        setLocations(data.locations);
        setSeasonAdvisory(data.seasonAdvisory);
      }
    } catch (err) {
      console.error(err);
      setError(true);
      // Fallback data
      setLocations([
        {
          name: 'Srinagar',
          key: 'srinagar',
          description: 'Summer Capital & Dal Lake',
          altitude: '1,585m',
          temp: 22,
          tempMax: 26,
          tempMin: 14,
          humidity: 58,
          windSpeed: 8,
          condition: 'Sunny & Pleasant',
          weatherCode: 0,
          lastUpdated: new Date().toISOString(),
        },
        {
          name: 'Gulmarg',
          key: 'gulmarg',
          description: 'Snow Meadow & Gondola',
          altitude: '2,650m',
          temp: 14,
          tempMax: 18,
          tempMin: 8,
          humidity: 65,
          windSpeed: 12,
          condition: 'Cool Mountain Breeze',
          weatherCode: 1,
          lastUpdated: new Date().toISOString(),
        },
        {
          name: 'Pahalgam',
          key: 'pahalgam',
          description: 'Valley of Shepherds & Lidder',
          altitude: '2,130m',
          temp: 18,
          tempMax: 22,
          tempMin: 10,
          humidity: 60,
          windSpeed: 9,
          condition: 'Partly Cloudy',
          weatherCode: 2,
          lastUpdated: new Date().toISOString(),
        },
        {
          name: 'Sonamarg',
          key: 'sonamarg',
          description: 'Meadow of Gold & Glacier',
          altitude: '2,740m',
          temp: 15,
          tempMax: 19,
          tempMin: 7,
          humidity: 62,
          windSpeed: 11,
          condition: 'Clear Sky',
          weatherCode: 0,
          lastUpdated: new Date().toISOString(),
        },
        {
          name: 'Gurez Valley',
          key: 'gurez',
          description: 'Offbeat Border & Habba Khatoon',
          altitude: '2,400m',
          temp: 16,
          tempMax: 20,
          tempMin: 6,
          humidity: 55,
          windSpeed: 14,
          condition: 'Crisp Alpine Weather',
          weatherCode: 0,
          lastUpdated: new Date().toISOString(),
        },
      ]);
      setSeasonAdvisory({
        season: 'Current Season Guidelines',
        packing: 'Light layers for day excursions, jacket/sweater for evening temperatures.',
        roadStatus: 'Srinagar-Gulmarg, Pahalgam, and Sonamarg highways fully operational.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (code: number, size = 'w-8 h-8') => {
    if (code === 0) return <Sun className={`${size} text-amber-400`} />;
    if (code === 1 || code === 2) return <CloudSun className={`${size} text-amber-300`} />;
    if (code === 3) return <Cloud className={`${size} text-stone-300`} />;
    if (code === 45 || code === 48) return <CloudFog className={`${size} text-stone-300`} />;
    if (code >= 51 && code <= 67) return <CloudDrizzle className={`${size} text-cyan-300`} />;
    if (code >= 71 && code <= 77) return <Snowflake className={`${size} text-sky-200 animate-pulse`} />;
    if (code >= 80 && code <= 82) return <CloudRain className={`${size} text-blue-300`} />;
    if (code >= 85 && code <= 86) return <Snowflake className={`${size} text-sky-300`} />;
    if (code >= 95) return <CloudLightning className={`${size} text-amber-400`} />;
    return <Sun className={`${size} text-amber-400`} />;
  };

  const currentLoc = locations.find((l) => l.key === selectedLocation) || locations[0];

  return (
    <section id="kashmir-weather" className="py-12 sm:py-16 bg-stone-900 text-white border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Thermometer className="w-4 h-4 text-emerald-400" />
              <span>Live Kashmir Weather Forecast</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Real-Time Weather Across Valleys
            </h2>
            <p className="text-stone-300 text-sm sm:text-base max-w-2xl">
              Stay updated on live temperature readings, high/low ranges, and mountain road conditions across Srinagar, Gulmarg, Pahalgam, Sonamarg, and Gurez.
            </p>
          </div>

          {/* AI Helper Trigger & Refresh */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={fetchWeather}
              disabled={loading}
              className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors flex items-center justify-center border border-stone-700"
              title="Refresh Weather Data"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-amber-400' : ''}`} />
            </button>

            {onOpenAiAssistant && (
              <button
                onClick={() => onOpenAiAssistant("What clothing and thermals should I pack for Kashmir weather this month?")}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-transform transform hover:scale-[1.02] active:scale-95"
              >
                <Bot className="w-4 h-4 fill-stone-950" />
                <span>Ask AI Assistant What To Pack</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Location Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-800">
          {locations.map((loc) => {
            const isActive = selectedLocation === loc.key;
            return (
              <button
                key={loc.key}
                onClick={() => setSelectedLocation(loc.key)}
                className={`px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer border ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg font-bold'
                    : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300 border-stone-700'
                }`}
              >
                <MapPin className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-stone-400'}`} />
                <span>{loc.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-emerald-800 text-amber-200' : 'bg-stone-900 text-stone-400'}`}>
                  {loc.temp}°C
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Weather Highlight Card */}
        {currentLoc && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gradient-to-br from-stone-950 via-stone-900 to-emerald-950/40 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-2xl">
            
            {/* Left Column: Big Temp & Conditions */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-800 pb-6 lg:pb-0 lg:pr-8">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 text-xs uppercase tracking-wider font-bold bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                    Altitude: {currentLoc.altitude}
                  </span>
                  <span className="text-stone-400 text-[11px]">
                    Live Status
                  </span>
                </div>
                <h3 className="text-3xl font-serif font-bold text-white mt-3">
                  {currentLoc.name}
                </h3>
                <p className="text-stone-400 text-xs">
                  {currentLoc.description}
                </p>
              </div>

              <div className="flex items-center gap-6 my-2">
                <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/50 shadow-inner">
                  {getWeatherIcon(currentLoc.weatherCode, 'w-16 h-16')}
                </div>
                <div>
                  <div className="text-5xl sm:text-6xl font-serif font-bold text-white tracking-tight">
                    {currentLoc.temp}°<span className="text-2xl text-amber-300 font-sans">C</span>
                  </div>
                  <div className="text-amber-300 font-semibold text-sm sm:text-base mt-1">
                    {currentLoc.condition}
                  </div>
                </div>
              </div>

              {/* High / Low Range Pill */}
              <div className="flex items-center justify-between bg-stone-900/90 rounded-xl p-3 border border-stone-800 text-xs text-stone-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  Day High: <strong className="text-white">{currentLoc.tempMax}°C</strong>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  Night Low: <strong className="text-white">{currentLoc.tempMin}°C</strong>
                </span>
              </div>
            </div>

            {/* Middle Column: Weather Stats */}
            <div className="lg:col-span-4 space-y-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-800 pb-6 lg:pb-0 lg:px-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Atmospheric Metrics
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800 space-y-1">
                  <div className="flex items-center gap-2 text-stone-400 text-xs font-semibold">
                    <Droplets className="w-4 h-4 text-cyan-400" />
                    <span>Humidity</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {currentLoc.humidity}%
                  </div>
                  <span className="text-[10px] text-stone-500 block">Relative Air Moisture</span>
                </div>

                <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800 space-y-1">
                  <div className="flex items-center gap-2 text-stone-400 text-xs font-semibold">
                    <Wind className="w-4 h-4 text-emerald-400" />
                    <span>Wind Speed</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {currentLoc.windSpeed} <span className="text-xs font-normal text-stone-400">km/h</span>
                  </div>
                  <span className="text-[10px] text-stone-500 block">Alpine Breeze</span>
                </div>
              </div>

              {/* Recommended Activities Pill */}
              <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/20 text-xs text-stone-200 space-y-1">
                <strong className="text-emerald-300 font-semibold block">Best Activity Right Now:</strong>
                <p>
                  {currentLoc.key === 'srinagar' && 'Sunset Shikara ride on Dal Lake & Mughal Garden photography.'}
                  {currentLoc.key === 'gulmarg' && 'Gondola Phase 1 & 2 cable car ride up to Apharwat snow peak.'}
                  {currentLoc.key === 'pahalgam' && 'Pony ride to Baisaran Valley (Mini Switzerland) & Lidder Riverwalk.'}
                  {currentLoc.key === 'sonamarg' && 'Pony trek up to Thajiwas Glacier & Sind River viewpoints.'}
                  {currentLoc.key === 'gurez' && 'Habba Khatoon spring view & Kishenganga riverfront campfire.'}
                </p>
              </div>
            </div>

            {/* Right Column: Seasonal Packing & Advisory */}
            <div className="lg:col-span-3 space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 mb-2">
                  <Shirt className="w-4 h-4 text-amber-400" />
                  <span>Packing & Advisory</span>
                </h4>
                {seasonAdvisory && (
                  <div className="space-y-3 text-xs text-stone-300">
                    <div className="bg-stone-900/90 p-3 rounded-xl border border-stone-800">
                      <strong className="text-amber-200 block text-[11px] mb-1">
                        {seasonAdvisory.season}
                      </strong>
                      <p className="text-stone-300 leading-relaxed text-[11px]">
                        {seasonAdvisory.packing}
                      </p>
                    </div>

                    <div className="bg-stone-900/90 p-3 rounded-xl border border-stone-800">
                      <strong className="text-emerald-300 block text-[11px] mb-1 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                        Road Status
                      </strong>
                      <p className="text-stone-300 leading-relaxed text-[11px]">
                        {seasonAdvisory.roadStatus}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {onOpenAiAssistant && (
                <button
                  onClick={() => onOpenAiAssistant(`Is ${currentLoc.name} weather good for sightseeing and what clothes should I pack?`)}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-amber-200 text-xs font-bold border border-emerald-600/50 flex items-center justify-center gap-2 transition-colors"
                >
                  <Bot className="w-4 h-4" />
                  <span>Ask AI Assistant About {currentLoc.name}</span>
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
