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
     * @returns {Boolean} stop the refresh/navigation on submit
     */
    function addComment() {
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
//                console.log('datas', index, prop);
            var commentContainer = $('<div class="comment clearfix"></div>');
            var formValues = {
                commentImg: $('<img class="user-image" src="' + prop.image + '" alt="image" width="100" height="100" />'),
                commentEmail: $('<span class="user-email">' + prop.email + '</span>'),
                commentTxt: $('<p class="user-text">' + prop.comm + '</p>'),
                commentDeleteBtn: $('<a data-id-delete=' + prop.id + ' class="delete-comment-btn bkg" href="#">x</a>'),
                commentEditBtn: $('<a class="edit-comment-btn bkg" href="#">v</a>'),
                commentSubmitEditBtn: $('<a data-id-edit=' + prop.id + ' class="submit-edit-btn bkg hide" href="#">v</a>')
            };
//                console.log('formValues', formValues);
            $.each(formValues, function (index, prop) {
//                    console.log('formValues', index, prop);
                prop.appendTo(commentContainer);
            });
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
        $('.submit-edit-btn').on('click', editCommentSubmit);
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
        $(this)
                .addClass('hide')
                .siblings('.submit-edit-btn').removeClass('hide')
                .siblings('.user-email').addClass('edit')
                .siblings('.user-text').addClass('edit');
        $('.edit').attr('contenteditable', 'true');
        var msgCanEdit = $('<p>').text('You can edit your email and text.').addClass('edit-msg');
        msgCanEdit.appendTo($(this).parent());
    }

    /**
     * After the shown comment is edited, submit
     * @returns {undefined}
     */
    function editCommentSubmit() {
//        console.log('------------------------------------------');
        $(this)
                .addClass('hide')
                .siblings('.edit-comment-btn').removeClass('hide')
                .siblings('.edit').removeAttr('contenteditable').removeClass('edit')
                .siblings('.edit-msg').remove();

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
//        console.log(xhr, status, error);
        var errorMsg = $('body').text('We apologize for the inconvenience. Something went wrong.');
        console.log(xhr.status + ' ' + xhr.statusText);
    }

})(jQuery);