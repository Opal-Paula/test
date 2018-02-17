/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
class Model {
    constructor() {
        this.url = 'http://api.wunderground.com/api/5e9d7427a9b8dcfc/forecast/q/RO/Brasov.json';
    }
    getWeatherForecast() {
        return fetch(this.url, {method: 'GET'}).then(response => response.json());
    }
}

class Controller {
    constructor() {
        this.weatherModel = new Model();
        this.showWeather();
    }

    showWeather() {
        let weatherDatas = this.weatherModel.getWeatherForecast();
        weatherDatas
                .then(this.getWeatherData)
                .then(this.htmlWeather);
    }

    getWeatherData(data) {
//    console.log(data);
        let forecast = data.forecast.simpleforecast.forecastday;
        let fDetails, result = [];
        for (let i in forecast) {
//            console.log(forecast[i]);
            let f, d;
            f = forecast[i];
            d = f.date;
            fDetails = {
                day: $('<p>').text(d.weekday),
                time: $('<p>').text(d.hour + ':' + d.min + ' ' + d.ampm),
                date: $('<p>').text(d.day + ' ' + d.monthname + ' ' + d.year),
                conditions: $('<p>').text(f.conditions),
                icon: $('<img>').attr('src', f.icon_url),
                humidity: $('<p>').text('Humidity:').append($('<span>').text(f.avehumidity + ' %')),
                wind: $('<p>').text('Wind:').append($('<span>').text(f.avewind.kph + ' km/h'))
            };
//            console.log(fDetails);
            result.push(fDetails);
        }
//console.log(fDetails);
        return result;
    }
    htmlWeather(fDetails) {
        console.log(fDetails);
        let fragment = $(document.createDocumentFragment());
        var container = $('<div>').addClass('weather-day');
        for (let i in fDetails) {
            for (let prop in fDetails[i]) {
//                console.log(prop);
                container.append(fDetails[i][prop]);
            }
        }

        fragment.append(container);
//        console.log(fragment);

        //fragment vine ca [object Object]
        $('.main').append(fragment);

        //container il pune cu toate datele
//        $('.main').append(container);
    }
}

var b = new Controller();


