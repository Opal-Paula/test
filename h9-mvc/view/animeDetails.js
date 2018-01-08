/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function ($) {
    var url = 'http://api.jikan.me/';

    //util function, will return the url param for the provided key
    function getUrlParam(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results === null) {
            return null;
        } else {
            return results [ 1 ] || 0;
        }
    }
//    console.log(getUrlParam("id"));
    var animeId = [getUrlParam("id")];

    var animeL = new AnimeList(url, animeId);
//console.log(animeL);
    animeL.getData(function (data) {
//        console.log('je', data);
        var container = $('<article>').addClass('anime');
        var fragment = document.createDocumentFragment();
        var animeInfos = {
            title: $('<h2>').text(data.title),
            poster: $('<img>').addClass('poster').attr('src', data.image_url),
            synopsis: $('<p>').addClass('txt').text(data.synopsis).prepend('<em class="em">Synopsis:</em>'),
            status: $('<p>').addClass('txt').text(data.status).prepend('<em class="em">Status:</em>'),
            score: $('<p>').addClass('txt').text(data.score).prepend('<em class="em">Score:</em>'),
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
                genres += data.genre[index].name + ' / ';
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
                license += data.licensor[index].name + ' / ';
            }
            var licenses = $('<p>').addClass('txt').text(license).prepend('<em class="em">Licensor:</em>');
            return licenses;
        }

        //append elements to fragment;
        $.each(animeInfos, function (i, prop) {
            prop.appendTo(fragment);
        });
        container.append(fragment);
        //structure added to html
        $('.anime-container').append(container);
    });
})(jQuery);
