/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function ($) {
    var url = 'https://api.jikan.me/';
    var animeIds = ['5114', '30276', '22319', '3588', '25777', '16498'];
    var animeL = new AnimeList(url, animeIds);
//    console.log(animeL);
    animeL.getData(function (data) {
//        console.log('je', data, typeof data);
        if (typeof data === 'undefined') {
            var errorMsg = $('<div>').text('We apologize for the inconvenience. Something went wrong.').addClass('error-pg');
            $('.anime-container').append(errorMsg);
        } else {
            var container = $('<article>').addClass('anime');
            var fragment = document.createDocumentFragment();
            var sliceStr = data.synopsis.slice(0, 500) + '.....';
            var animeInfos = {
                title: $('<h2>').addClass('anime-title js-anime-title').attr('data-id', data.mal_id).text(data.title),
                poster: $('<img>').addClass('poster').attr('src', data.image_url),
                synopsis: $('<p>').addClass('txt').text(sliceStr).prepend('<em class="em">Synopsis:</em>')
            };
//        console.log(animeInfos);

            //append elements to fragment;
            $.each(animeInfos, function (i, prop) {
                prop.appendTo(fragment);
            });
            container.append(fragment);
            //structure added to html
            $('.anime-container').append(container);
        }
    });

    $('.anime-container').on('click', '.js-anime-title', showAnimePage);
    function showAnimePage() {
//            console.log('you clicked', $(this).data('id'));
        var animeId = $(this).data('id');
        window.location.href = '../templates/animeDetailPage.html?id=' + animeId;
    }

    $('.scroll-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        });
    });
})(jQuery);
