(function () {
    window.addEventListener('load', function () {

        var $replys = $('.comment-list .comment-reply-link');
        var selectedReplay = null;
        $replys.each(function (index) {
            $(this).on('click', function () {
                $comment_id = $(this).closest('.comment-body').find('.comment_id').text().trim();
                if (selectedReplay == null) {
                    selectedReplay = $(this).closest('.comment-body').find('.comment-meta');
                    selectedReplay.addClass('border-primary-rounded');
                } else if (selectedReplay[0] == $(this).closest('.comment-body').find('.comment-meta')[0]) {
                    selectedReplay.removeClass('border-primary-rounded');
                    selectedReplay = null;
                } else {
                    selectedReplay.removeClass('border-primary-rounded');
                    selectedReplay = $(this).closest('.comment-body').find('.comment-meta');
                    selectedReplay.addClass('border-primary-rounded');
                }
                if (selectedReplay != null) {
                    $('#commentform .comment_id').val($comment_id);
                } else {
                    $('#commentform .comment_id').val('');
                }
            });
        });

        var $buttonMores = $('.btn-more-comments');
        $buttonMores.each(function (index) {
            $(this).on('click', function () {
                var $but = $(this);
                var comment_id = $(this).closest('.comment-body').find('.comment_id').text().trim();
                //console.log(comment_id);
                $.ajax({
                    url: '/ajax/getcomments',
                    data: {'comment_id': comment_id}
                }).done(function (response) {
                    if (response.length > 4) {
                        var comments = JSON.parse(response);
                        $but.closest('.comment-body').after(getSubCommentsBlock(comments));
                    }
                    $but.remove();
                });
            });
        });

        var getSubCommentsBlock = function (data) {
            var content = '<ol class="children">';
            for (var i = 0; i < data.length; i++) {
                content +=
                    '<li class="comment byuser odd alt depth-2 parent">' +
                    '<article class="comment-body">' +
                    '<footer class="comment-meta">' +
                    '<div class="comment-author vcard">' +
                    '<a class="author_url" rel="external nofollow" href="mailto:' + data[i].email + '">' + data[i].login + '</a>' +
                    '</div>' +
                    '<div class="comment-metadata"> ' +
                    '<span>' + data[i].date + '</span>' +
                    '</div>' +
                    '</footer>' +
                    '<div class="comment-content">' +
                    '<p>' + data[i].comment + '</p>' +
                    '</div>' +
                    '</article>' +
                    '</li>'
            }
            content += '</ol>';

            return content;
        }

        var $sendMessageForm = $('#commentform');
        var $sendMessageButton = $('#commentform #submit');
        $sendMessageButton.on('click', function () {
            var message = {
                author: '',
                email: '',
                comment: '',
                comment_id: '',
                post_id: ''
            }
            //валидация!!!!!
            message.author = $sendMessageForm.find('#author').val();
            message.email = $sendMessageForm.find('#email').val();
            message.comment = $sendMessageForm.find('#comment').val();
            message.comment_id = $sendMessageForm.find('#comment_id').val();
            message.post_id = $sendMessageForm.find('#post_id').val();
            // console.dir(message);


            // my code

            // var errorMessage = "";
            // var isOK = /^[A-z0-9]{5,15}$/.test(message.author);//name
            // if(!isOK){
            //     $header = $('.comment-form-author');
            //     errorMessage = "Логин должен быть от 5 до 15 символов и содержать только буквы и цифры";
            //     $header.append(showReportDialog(errorMessage, 'alert-danger'));
            //     return;
            // }
            //
            //
            // // alert( "A\nB".match(/A.B/s) );
            // isOK = /^.{2,100}$/s.test(message.comment);//comment
            // if(!isOK){
            //     $header = $('.comment-form-comment');
            //     errorMessage = "comment must be less than 100 and more 1";
            //     $header.append(showReportDialog(errorMessage, 'alert-danger'));
            //     return;
            // }




            // if(message.author.length > 20){
            //     $header = $('.comment-form-author');
            //     var errorMessage = "Login must be less than 20 ";
            //     $header.append(showReportDialog(errorMessage, 'alert-danger'));
            // }
            // end my code



            $.ajax({
                url: '/ajax/savecomment',
                data: message,
                method: "POST"
            }).done(function (response) {
                $header = $('.comment-reply-title');
                var contentMessage = '';
                console.log(response);

                if (response.includes("ADDED")) {
                    contentMessage = "All perfectly";
                    $header.append(showReportDialog(contentMessage, 'alert-success'));
                }
                if (response.includes("ERROR")) {
                    contentMessage = "Извините, произошла ошибка";
                    $header.append(showReportDialog(contentMessage));
                }
                $sendMessageForm.trigger("reset");
            });
        });

        var showReportDialog = function (message, classMode = 'alert-danger') {
            //alert-danger
            //alert-success
            return '<div class="alert ' + classMode + ' alert-dismissible show" role="alert">\n' +
                '  <strong>' + message + '!</strong>' +
                '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
                '    <span aria-hidden="true">&times;</span>\n' +
                '  </button>\n' +
                '</div>';
        }
    })
})()