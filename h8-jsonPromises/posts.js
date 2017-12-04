/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

(function ($) {
    var url = 'http://localhost:3000/comments';

    //add event to the submit button
    $('.add-comment-btn').on('click', addComment);
    /**
     * Add comments
     * @param {object} e event
     * @returns {Boolean} stop the refresh/navigation on submit
     */
    function addComment(e) {
//        e.preventDefault;

        var idUser, email, image, comment, commentValuesAdded;
        //define fields      
        var commentValuesAdded = {
            email: $('.email').val(),
            image: $('.image').val(),
            comm: $('.comm').val()
        };

        //check for empty values and replace them with the placeholder value
        //*only for test & exercice purpose    
        $.each(commentValuesAdded, function (prop, val) {
//            console.log(prop, val, this);
            var nameOfProperty = prop;
            if (val === '') {
                commentValuesAdded[prop] = $('.' + prop).attr('placeholder');
//                console.log('here ', prop, val, commentValuesAdded);
            }
        });

        //submit the form data 
        $.ajax({
            url: url,
            method: 'POST',
            data: commentValuesAdded
        })
                .then(resetForm)
                .then(getComments)
                .catch(msgError);

        function resetForm(data, status, xhr) {
//            console.log(data, status, xhr);
            $('form').trigger("reset");
        }

        return false;
    }

    /**
     * Create the dom elements and show the comments
     * @returns {undefined}
     */
    function getComments() {
//        console.log('display ', comments);
        //remove comment so it doesn't duplicate
        $('.comment').remove();

        //show the comments submitted
        $.ajax({
            url: url,
            method: 'GET'
        })
                .then(displayComments)
                .then(fragmentShow)
                .catch(msgError);
    }
    //show existing comments
    getComments();

    /**
     * Show comments on html
     * @param {type} data
     * @param {type} status
     * @param {type} xhr
     * @returns {DocumentFragment} used for delete&edit
     */
    function displayComments(data, status, xhr) {
//            console.log('gets ', data, status, xhr);
        if (data.length <= 0) {
            $('.comments').text('No comments added.');
        } else {
            $('.comments').text('');
        }
        var fragment = document.createDocumentFragment();
        //build foreach comment a container with content
        $.each(data, function (index, prop) {
//                console.log('datas', index, prop.email);
            var commentContainer = $('<div class="comment clearfix"></div>');
            var commentImg = $('<img class="user-image" src="' + prop.image + '" alt="image" width="100" height="100" />');
            var commentEmail = $('<span class="user-email">' + prop.email + '</span>');
            var commentTxt = $('<p class="user-text">' + prop.comm + '</p>');
            var commentDeleteBtn = $('<a data-id-delete=' + prop.id + ' class="delete-comment-btn bkg" href="#">x</a>');
            var commentEditBtn = $('<a data-id-edit=' + prop.id + ' class="edit-comment-btn bkg" href="#">v</a>');
            commentImg.appendTo(commentContainer);
            commentEmail.appendTo(commentContainer);
            commentTxt.appendTo(commentContainer);
            commentEditBtn.appendTo(commentContainer);
            commentDeleteBtn.appendTo(commentContainer);
            commentContainer.appendTo(fragment);
        });
        $('.comments').append(fragment);
        return fragment;
    }

    /**
     * Edit or delete comments events
     * @param {object} fragment
     * @returns {undefined}
     */
    function fragmentShow(fragment) {
        $('.edit-comment-btn').on('click', editComment);
        $('.delete-comment-btn').on('click', deleteComment);
    }

    /**
     * Delete the comments submited by user
     * @returns {undefined}
     */
    function deleteComment() {
        var dataId = $(this).data("id-delete");
//        console.log(dataId);
        $.ajax({
            url: url + '/' + dataId,
            method: 'DELETE'
        })
                .then(getComments)
                .catch(msgError);
    }

    /**
     * Make available the Edit for the comments submited by user
     * @returns {undefined}
     */
    function editComment() {
        //remove classes from similar elements that are not this or part of the same block
        $('.submit-edit').removeClass('submit-edit');
        $('.user-email, .user-text').removeClass('edit');
        $('.edit-msg').remove();
        $(this).toggleClass('submit-edit');

        //add/remove option to edit text
        $(this).siblings('.user-email').toggleClass('edit').removeAttr('contenteditable');
        $(this).siblings('.user-text').toggleClass('edit').removeAttr('contenteditable');
        $('.edit').attr('contenteditable', 'true');

        //check if edit was clicked
        if ($(this).hasClass('submit-edit')) {
            $(this).on('click', editCommentSubmit);
            var msgCanEdit = $('<p>').text('You can edit your email and text.').addClass('edit-msg');
            msgCanEdit.appendTo($(this).parent());
        }
    }

    /**
     * After the shown comment is edited, submit
     * @returns {undefined}
     */
    function editCommentSubmit() {
//        console.log('------------------------------------------');
        var dataId = $(this).data("id-edit");
        var editedComments = {
            email: $(this).siblings('.user-email').text(),
            image: $(this).siblings('.user-image').attr('src'),
            comm: $(this).siblings('.user-text').text()
        };
//        console.log(editedComments);

        //comments edited submission
        $.ajax({
            url: url + '/' + dataId,
            method: 'PUT',
            data: editedComments

        })
                .then(getComments)
                .catch(msgError);
    }

    /**
     * Show that an error occured
     * @param {type} xhr
     * @param {type} status
     * @param {type} error
     * @returns {undefined}
     */
    function msgError(xhr, status, error) {
        console.log(xhr, status, error);
        var errorMsg = $('body').text('We apologize for the inconvenience. Something went wrong.');
    }

})(jQuery);