import {derived, readable, writable} from 'svelte/store';


/**
 * Applies 'Access-Control-Allow-Origin: *' on all requests
 * @type {string}
 */
const proxy = 'https://cors-anywhere.herokuapp.com/';

const _fetch = async (url) => {
    const response = await fetch(proxy + url);
    return await response.json();
};


export const closestCity = readable({}, set => {
    const getSearchApi = (lat, long) => {
        return `https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`;
    };

    const searchClosestCity = async (lat, long) => {
        const data = await _fetch(getSearchApi(lat, long));

        if (Array.isArray(data) && data.length) {
            return data[0];
        }
    };

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            searchClosestCity(position.coords.latitude, position.coords.longitude)
                .then(set)
        });
    } else {
        console.info('Geolocation API is disabled or isn\'t supported. No weather then. :(');
    }
});


export const closestCityWeatherData = derived(closestCity, (() => {
    const getLatestWeatherDataByWoeidApi = (woeid) => {
        const date = new Date;
        return `https://www.metaweather.com/api/location/${woeid}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`
    };

    const getLatestWeatherDataByWoeid = async (woeid) => {
        const data = await _fetch(getLatestWeatherDataByWoeidApi(woeid));

        if (Array.isArray(data) && data.length) {
            return data[0];
        }
    };

    return ($closestCity, set) => {
        if ($closestCity.hasOwnProperty('woeid')) {
            getLatestWeatherDataByWoeid($closestCity.woeid)
                .then(set)
        }
    }
})());


export const temperatureUnit = writable(0);

const temperatureUnitCalculator = derived(temperatureUnit, (() => {
    const def = {
        callback: temperature => temperature,
        unit: 'C'
    };

    return ($temperatureUnit, set) => {
        if ($temperatureUnit) {
            switch ($temperatureUnit) {
                case 1:
                    set({
                        callback: temperature => temperature * 1.8 + 32,
                        unit: 'F'
                    });
                    break;
            }
        } else {
            set(def);
        }
    }
})());


export const temperature = derived([closestCityWeatherData, temperatureUnitCalculator], (() => {
    const data = {
        payload: 0.0,
        unit: 'C',
        loaded: false
    }

    return ([$closestCityWeatherData, $temperatureUnitCalculator], set) => {
        if ($closestCityWeatherData && $closestCityWeatherData.hasOwnProperty('the_temp')) {
            data.payload = Math.round($closestCityWeatherData.the_temp);
            data.loaded = true;
        }

        if ($temperatureUnitCalculator) {
            data.payload = $temperatureUnitCalculator.callback(data.payload);
            data.unit = $temperatureUnitCalculator.unit;
        }

        set(data)
    }
})());


export const state = derived(closestCityWeatherData, (() => {
    const data = {
        image: '',
        alt: '',
        loaded: false
    };

    const getStateImageUrl = (state) => {
        return `https://www.metaweather.com/static/img/weather/${state}.svg`;
    };

    return ($closestCityWeatherData, set) => {
        if ($closestCityWeatherData) {
            if ($closestCityWeatherData.hasOwnProperty('weather_state_abbr')) {
                data.image = getStateImageUrl($closestCityWeatherData.weather_state_abbr);
                data.loaded = true;
            }

            if ($closestCityWeatherData.hasOwnProperty('weather_state_name')) {
                data.alt = $closestCityWeatherData.weather_state_name;
            }
        }

        set(data);
    }
})());


export const visible = readable(false, set => {
    let temperatureHasLoaded = false;
    let imageHasLoaded = false;

    const check = () => temperatureHasLoaded && imageHasLoaded && set(true);

    temperature.subscribe(data => {
        temperatureHasLoaded = data.loaded;
        check();
    });

    state.subscribe(data => {
        imageHasLoaded = data.loaded;
        check();
    });
});
