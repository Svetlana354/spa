import React, {Component} from "react";
import Form from "./Form";
import Info from "./Info";
import WeatherController from "./WeatherController";

// выполняем асинхронный запрос по Url через функцию fetch

const API_KEY = '328e5940a2ea9347a90205cc2a279935';

class WeatherMain extends Component {
    state = {
        iconUrl: null,
        alt: null,
        wind: null,
        main: null,
        temp: null,
        city: null,
        country: null,
        sunrise: null,
        sunset: null,
        error: null,
    }

    // Promise - объект, представляющий окончательное завершение или сбой асинхронного запроса.
    // Promise возвращает объект, к которому прикрепляется коллбэк.

    gettingWeather = async (event) => {
        event.preventDefault(); // отменяем обновление формы

        const city = event.target.elements.city.value; // получаем значение, введенное в поле формы city
        const country = event.target.elements.country.value;

        const apiUrl = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=${API_KEY}`);
        //  console.log(apiUrl);
        const data = await apiUrl.json(); // считываем данные
        console.log(data);
        // console.log(data.city.name);

        try {
            let sunrise = data.city.sunrise;
            let sunset = data.city.sunset;
            let timezone = data.city.timezone; // 25200 секунд = 7 часов

            let date = new Date();
            date.setTime(sunrise * 1000 - timezone);
            let sunriseDate = date.toLocaleTimeString();

            date.setTime(sunset * 1000 - timezone);
            let sunsetDate = date.toLocaleTimeString();

            let icon = data.list[0].weather[0].icon;

            // setState позволяет установить новые значения в state и как только это произойдет наш компонент будет перерисован с новыми данными
            this.setState({
                main: data.list[0].weather[0].main,
                iconUrl: `http://openweathermap.org/img/wn/${icon}.png`,
                alt: data.list[0].weather[0].description.main,
                temp: (data.list[0].main.temp - 273.15).toFixed(2),
                wind: data.list[0].wind.speed,
                city: data.city.name,
                country: data.city.country,
                sunrise: sunriseDate,
                sunset: sunsetDate,
            });

        } catch (error) {
            alert('Нет такого города');
            console.log(error);
        }


    }

    render() {
        return (
            <div>
                <Info/>
                <Form weatherMethod={this.gettingWeather}/>
                <WeatherController
                    main={this.state.main}
                    iconUrl={this.state.iconUrl}
                    wind={this.state.wind}
                    temp={this.state.temp}
                    city={this.state.city}
                    country={this.state.country}
                    alt={this.state.alt}
                    sunrise={this.state.sunrise}
                    sunset={this.state.sunset}
                />
            </div>
        );
    }
}

export default WeatherMain;