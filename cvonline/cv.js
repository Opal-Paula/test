/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

(function () {
    let id = window.location.hash;
    
    if (id) {
        //show container
        if ($(id).hasClass('disabled')) {
            $(id).siblings('.container').removeClass('active').addClass('disabled');
            $(id).addClass('active').removeClass('disabled');
        }
        //activate link menu
        if (!$('.link-a[href="' + id + '"]').parent().hasClass('active-btn')) {
            $('.link-a[href="' + id + '"]').parent().siblings('.active-btn').removeClass('active-btn');
            $('.link-a[href="' + id + '"]').parent().addClass('active-btn');
        }
    }

    $('.main-menu .link').click(function (e) {
//        console.log(e, e.target);
        let id = $(e.target).attr('href') ? $(e.target).attr('href') : $(e.target).parent('a').attr('href');
        //activate link menu
        if ($(this).hasClass('active-btn')) {
            $(this).siblings('.active-btn').removeClass('active-btn');
        } else {
            $(this).siblings('.active-btn').removeClass('active-btn');
            $(this).addClass('active-btn');
        }
        //show container
        if ($(id).hasClass('disabled')) {
            $(id).siblings('.container').removeClass('active').addClass('disabled');
            $(id).addClass('active').removeClass('disabled');
        }
    });
})();