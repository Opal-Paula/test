/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//https://jikan.me/docs && https://myanimelist.net/
'use strict';

function AnimeList(url, animeIds) {
//    console.log(url, animeIds);
    this.url = url;
    this.animeIds = animeIds;
}
AnimeList.prototype = {
    constructor: AnimeList,
    getData: function (callback) {
        var self = this, urlStr;
        this.animeIds.forEach(function (prop) {
//            console.log(prop);
            urlStr = self.url + '/anime/' + prop;
            fetch(urlStr, {
                method: 'GET',
                cache: true
            })
                    .then(response)
                    .then(success)
                    .catch(msgError);
        });
        function response(response) {
//        console.log(response);
            if (response.statusText === 'OK') {
                return response.json();
            }
        }
        function success(data) {
//            console.log(data);
            callback(data);
//            return data;
        }

        function msgError(xhr, status, error) {
//            console.log('here', xhr, status, error);
            var errorMsg = xhr;

            if (xhr.status === 400) {
                errorMsg = 'Bad Request - You\'ve made an invalid request or to an invalid endpoint ' + xhr.status + ' ' + error;
            }
            if (xhr.status === 404) {
//                console.log('herae', xhr.status + ' ' + error);
                errorMsg = 'Not Found: The ID you requested doesn\'t exist' + xhr.status + ' ' + error;
            }
            if (xhr.status === 405) {
                errorMsg = 'Method Not Allowed - requested method is not supported for resource ' + xhr.status + ' ' + error;
            }
            if (xhr.status === 429) {
                errorMsg = 'Too Many Requests - You\'ve either hit your daily limit, concurrent limit or Jikan has hit the rate limit from MyAnimeList' + xhr.status + ' ' + error;
            }
        }
    }
};
