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

    getWeatherData(data) {
        let forecast, result = [];
        forecast = data.forecast.simpleforecast.forecastday;
        for (let i in forecast) {
            let
                    fDetails,
                    f = forecast[i],
                    d = f.date;
            fDetails = {
                day: d.weekday,
                time: d.hour + ':' + d.min + ' ' + d.ampm,
                date: d.day + ' ' + d.monthname + ' ' + d.year,
                conditions: f.conditions,
                icon: f.icon_url,
                lowTC: f.low.celsius,
                lowTF: f.low.fahrenheit,
                humidity: f.avehumidity + ' %',
                wind: f.avewind.kph + ' km/h'
            };
            result.push(fDetails);
        }
        return result;
    }

    getWeatherDataDetails(data) {
        let forecast, result = [];
        forecast = data.forecast.txt_forecast.forecastday;
        for (let i in forecast) {
            let fDetails, f = forecast[i];
            fDetails = {
                day: f.title,
                conditions: f.fcttext,
                conditionsM: f.fcttext_metric,
                icon: f.icon_url
            };
            result.push(fDetails);
        }
        return result;
    }
}

class Controller {
    constructor() {
        this.weatherModel = new Model();
        this.weatherDatas = this.weatherModel.getWeatherForecast();
        document.querySelector('.next-pg').addEventListener('click', this.historySt.bind(this, '#details'));
        document.querySelector('.back-pg').addEventListener('click', this.historySt.bind(this, 'index.html'));
        this.showWeather();
    }

    showWeather() {
        this.weatherDatas
                .then(this.weatherModel.getWeatherData)
                .then(this.htmlWeather)
                .then(this.setCookieWeatherDegrees)
                .then(this.getCookieWeatherDegrees)
                .then(this.handlerTemperatureChangeOnClick);
    }

    htmlWeather(data) {
        let container, row;
        row = $('<div>').addClass('weather row');
        for (let i in data) {
            let cels, fahr, d, btnD, tempContainer;
            cels = 'cels-' + i;
            fahr = 'fahr-' + i;
            d = data[i];
            btnD = $('<div>').addClass('js-btn-degrees');
            btnD.append(
                    $('<label>').attr('for', cels).text('C').addClass('btn active'),
                    $('<input>')
                    .addClass('weather-btn')
                    .attr({
                        id: cels,
                        value: 'Celsius',
                        type: 'radio',
                        name: 'degrees-' + d.day
                    })
                    .prop('checked', true),
                    $('<label>').attr('for', fahr).text('F').addClass('btn'),
                    $('<input>')
                    .addClass('weather-btn')
                    .attr({
                        id: fahr,
                        value: 'Fahrenheit',
                        type: 'radio',
                        name: 'degrees-' + d.day
                    })
                    );

            tempContainer = $('<div>').addClass('temperatures');
            tempContainer.append(
                    $('<h2>').text('Temperatures').addClass('title'),
                    $('<p>').text(d.lowTC).attr({'data-deg': cels}).addClass('metric ' + cels),
                    $('<p>').text(d.lowTF).attr({'data-deg': fahr}).addClass('metric ' + fahr).hide(),
                    btnD
                    );
            container = $('<div>').addClass('weather-day col').append(
                    $('<p>').text(d.day + ', ' + d.time),
                    $('<p>').text(d.date),
                    $('<p>').text(d.conditions),
                    $('<img>').addClass('img').attr('src', d.icon),
                    tempContainer,
                    $('<p>').text('Humidity:').addClass('extra').append($('<span>').addClass('datas').text(d.humidity)),
                    $('<p>').text('Wind:').addClass('extra').append($('<span>').addClass('datas').text(d.wind))
                    );
            row.append(container);
        }
        $('.main').html(row);
    }

    handlerTemperatureChangeOnClick() {
        $('.js-btn-degrees').click(function (e) {
            let input = $(e.target);
            if (input.hasClass('weather-btn')) {
                let inputId, label, tempContainer, tempContainerMetric;
                inputId = input.attr('id');
                label = $("label[for='" + inputId + "']");
                tempContainer = $(this).parent();
                tempContainerMetric = tempContainer.children('.metric');
                //add style to btn
                if (input.is(':checked')) {
                    label.siblings().removeClass('active');
                    label.addClass('active');
                }
                //display degrees
                if (inputId === tempContainerMetric.data('deg')) {
                    tempContainerMetric.hide();
                    tempContainer.children('.metric[data-deg="' + inputId + '"]').show();
                } else {
                    tempContainerMetric.hide();
                    tempContainer.children('.metric[data-deg="' + inputId + '"]').show();
                }
            }
        });
    }

    setCookieWeatherDegrees() {
        const allCookies = document.cookie;
        const activeDegreesDefault = 'active';
        let arrAllCookies;
        //set default cookies
        if (!allCookies) {
            $('.weather-btn').each(function () {
                if ($(this).is(':checked')) {
                    let nr, id;
                    id = $(this).attr('id');
                    nr = id.split('-');
                    document.cookie = $(this).attr('name') + '=' + $(this).val();
                    document.cookie = activeDegreesDefault + '-' + nr[1] + '=' + id;
                }
            });
        } else {
            //split cookies received and add style
            arrAllCookies = allCookies.split(/\s*;\s*/);
            let cookieNames = [];
            for (let cookie of arrAllCookies) {
                let cookieArr = cookie.split('=');
                $('.weather-btn').each(function () {
                    //make checked&active input/letter C/F
                    let id = $(this).attr('id');
                    if ($(this).attr('name') === cookieArr[0]) {
                        if ($(this).is(':checked') && ($(this).val() !== cookieArr[1])) {
                            $(this).prop('checked', false);
                            $(this).siblings().prop('checked', true);
                        }
                        let label = $("label[for='" + id + "']");
                        if ($(this).is(':checked')) {
                            label.siblings().removeClass('active');
                            label.addClass('active');
                        }
                    }
                    //show degrees C/F
                    if ($(this).attr('id') === cookieArr[1]) {
                        $('.' + id).siblings('.metric').hide();
                        $('.' + id).show();
                    }
                });
                cookieNames.push(cookieArr[0]);
            }
            return cookieNames;
        }
        return allCookies;
    }

    getCookieWeatherDegrees(cookieNames) {
        if (!cookieNames) {
            return null;
        }
        const activeDegreesDefault = 'active';
        //get cookie when changing options
        $('.weather-btn').change(function (e) {
            let input, inputId, nr, inputName;
            input = $(e.target);
            inputId = input.attr('id');
            nr = inputId.split('-');
            inputName = input.attr('name');
            for (let name of cookieNames) {
                if (inputName === name) {
                    document.cookie = inputName + '=' + input.val();
                }
                if (inputId !== name) {
                    document.cookie = activeDegreesDefault + '-' + nr[1] + '=' + inputId;
                }
            }

        });
    }

    changePageContent(data) {
        let container, row;
        row = $('<div>').addClass('weather row');
        for (let i in data) {
//            console.log(data[i]);
            let d = data[i];
            container = $('<div>').addClass('weather-day col').append(
                    $('<h2>').text(d.day).addClass('title'),
                    $('<p>').text(d.conditions),
                    $('<p>').text(d.conditionsM),
                    $('<img>').addClass('img').attr('src', d.icon)
                    );
            row.append(container);
        }
        $('.main').html(row);
    }

    historySt(param) {
        history.pushState(null, null, param);
        if (param === 'index.html') {
            this.showWeather();
            if ($('.next-pg').is(':disabled')) {
                $('.next-pg').prop('disabled', false);
                $('.back-pg').prop('disabled', true);
            }
        } else {
            this.weatherDatas
                    .then(this.weatherModel.getWeatherDataDetails)
                    .then(this.changePageContent);
            if ($('.back-pg').is(':disabled')) {
                $('.back-pg').prop('disabled', false);
                $('.next-pg').prop('disabled', true);
            }
        }
    }
}

const b = new Controller();