/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

(function ($) {
    var url = 'https://raw.githubusercontent.com/Opal-Paula/test/master/ajax/db.json/comments';

    //add event to the submit button of the form
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
//        console.log(typeof commentValuesAdded, commentValuesAdded, $.isPlainObject(commentValuesAdded));

        //submit the form data 
        $.ajax({
            url: url,
            method: 'POST',
            data: commentValuesAdded,
            success: msg,
            error: msgError
        });

        /**
         * Reset the form after submission and show the Comment submitted by the user
         * @param {type} data
         * @param {type} status
         * @param {type} xhr
         * @returns {undefined}
         */
        function msg(data, status, xhr) {
//            console.log(data, status, xhr);
            $('form').trigger("reset");
            displayComments();
        }
        return false;
    }

    /**
     * Create the dom elements and show the comments
     * @returns {undefined}
     */
    function displayComments() {
        //remove comment so it doesn't duplicate
        $('.comment').remove();

        //show the comments that were submitted
        $.ajax({
            url: url,
            method: 'GET',
            success: msg,
            error: msgError
        });

        /** 
         * Build the html for the comments
         * @param {type} data
         * @param {type} status
         * @param {type} xhr
         * @returns {undefined}
         */
        function msg(data, status, xhr) {
//            console.log('gets ', data, status, xhr);
            if (data.length <= 0) {
                $('.comments').text('No comments added.');
            } else {
                $('.comments').text('');
            }
            //build foreach comment a container with content
            var fragment = document.createDocumentFragment();
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
            //append to html
            $('.comments').append(fragment);
        }
    }
    displayComments();

    //trigger events for: edit, edit submission, delete of the comments
    $('.comments')
            .on('click', '.edit-comment-btn', editComment)
            .on('click', '.submit-edit-btn', editCommentSubmit)
            .on('click', '.delete-comment-btn', deleteComment);

    /**
     * Delete the comments submited by user
     * @returns {undefined}
     */
    function deleteComment() {
        var dataId = $(this).data("id-delete");
//        console.log(dataId);
        $.ajax({
            url: url + '/' + dataId,
            method: 'DELETE',
            success: msg,
            error: msgError
        });

        /**
         * Removal of the comment was successful
         * @param {type} data
         * @param {type} status
         * @param {type} xhr
         * @returns {undefined}
         */
        function msg(data, status, xhr) {
//            console.log(data, status, xhr);
            console.log(status + 'ful delete of comment nr.' + dataId);
            displayComments();
        }
    }

    /**
     * Activate the editable fields of the comments submited by user: mail and text
     * Include an informative edit message
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
     * Submit the edited comment(s)
     * Deactivate the editable fields of the comments submited by user: mail and text
     * @returns {undefined}
     */
    function editCommentSubmit() {
//        console.log('------------------------------------------');
        $(this).addClass('hide')
                .siblings('.edit-comment-btn').removeClass('hide')
                .siblings('.edit').removeAttr('contenteditable').removeClass('edit')
                .siblings('.edit-msg').remove();

        //data for ajax
        var dataId = $(this).data("id-edit");
//        console.log(dataId);
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
            data: editedComments,
            success: msg,
            error: msgErrorSubmit
        });

        /**
         * Successful message of the edit submision
         * @param {type} data
         * @param {type} status
         * @param {type} xhr
         * @returns {undefined}
         */
        function msg(data, status, xhr) {
//            console.log(data, status, xhr);
            console.log(status + 'ful edit of comment nr. ' + dataId);
        }
        /**
         * Error message of the edit submision
         * @param {type} xhr
         * @param {type} status
         * @param {type} error
         * @returns {undefined}
         */
        function msgErrorSubmit(xhr, status, error) {
//            console.log(xhr, status, error);
            console.log(xhr.status + ' ' + xhr.statusText);
        }
    }
    /**
     * Error message 
     * @param {type} xhr
     * @param {type} status
     * @param {type} error
     * @returns {undefined}
     */
    function msgError(xhr, status, error) {
//        console.log(xhr, status, error);
        var errorMsg = $('body').text('We apologize for the inconvenience. Something went wrong. ');
        console.log(xhr.status + ' ' + xhr.statusText);
    }

})(jQuery);