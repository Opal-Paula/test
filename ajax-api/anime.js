/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

(function ($) {
    //https://jikan.me/docs
    var url = 'https://jikan.me/api/';
    var animeIds = ['5114', '30276', '22319', '3588', '25777', '16498'];

    //show all the animes you want from https://myanimelist.net/
    $.each(animeIds, function (i, prop) {
//        console.log(i, prop);
        $.ajax({
            url: url + '/anime/' + prop,
            method: 'GET',
            cache: true,
            success: msg,
            error: msgError
        });
    });

    /**
     * Success data shown in html
     * Get all the data to display about anime and show it
     * @param {type} data
     * @param {type} status
     * @param {type} xhr
     * @returns {undefined}
     */
    function msg(data, status, xhr) {
//        console.log(data, status, xhr);
        var container = $('<article>').addClass('anime');
        var fragment = document.createDocumentFragment();
        var animeInfos = {
            title: $('<h2>').text(data.title),
            poster: $('<img>').attr('src', data.image),
            synopsis: $('<p>').addClass('txt').text(data.synopsis).prepend('<em class="em">Synopsis:</em>'),
            status: $('<p>').addClass('txt').text(data.status).prepend('<em class="em">Status:</em>'),
            score: $('<p>').addClass('txt').text(data.score[0]).prepend('<em class="em">Score:</em>'),
            genres: genre(),
            licensor: licensor(),
            premiered: $('<p>').addClass('txt').text(data.premiered).prepend('<em class="em">Premiered:</em>')
        };
//        console.log(animeInfos);

        /**
         * Parse through the array of genre
         * @type type
         * @returns {object} create the element that will show the genre 
         */
        function genre() {
            var genres = '';
            for (var index in data.genre) {
                genres += data.genre[index][1] + ' / ';
            }
            var genre = $('<p>').addClass('txt').text(genres).prepend('<em class="em">Genre:</em>');
            return genre;
        }
        /**
         * Parse through the array of license
         * @type type
         * @returns {object} create the element that will show the licensor 
         */
        function licensor() {
            var license = '';
            for (var index in data.licensor) {
                license += data.licensor[index] + ' / ';
            }
            var licenses = $('<p>').addClass('txt').text(license).prepend('<em class="em">Licensor:</em>');
            return licenses;
        }

//shortcut doesn't work properly, when no class is predefined; 
//the last element created does not get the classes/why
//        $('em').addClass('em');
//        $('p').addClass('txt');

        //append elements to fragment;
        $.each(animeInfos, function (i, prop) {
            prop.appendTo(fragment);
        });
        container.append(fragment);
        //structure added to html
        $('.anime-container').append(container);
    }
    /**
     * Show error message
     * @param {type} xhr
     * @param {type} status
     * @param {type} error
     * @returns {undefined}
     */
    function msgError(xhr, status, error) {
        console.log(xhr, status, error);
        var errorMsg = $('body').text('We apologize for the inconvenience. Something went wrong.');
        //error 500 server : same id is sent, cannot replace it
    }

    //scroll back to top after getting bored scrolling way down to the bottom
    $('.scroll-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        });
    });

})(jQuery);

