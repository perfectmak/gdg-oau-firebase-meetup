// Initialize Firebase
var firebaseConfig = {
	apiKey: "AIzaSyCs7AsKd9jIbNIMeYRIkv17_tyw94zWgLI",
	authDomain: "gdg-meetup-31859.firebaseapp.com",
	databaseURL: "https://gdg-meetup-31859.firebaseio.com",
	storageBucket: "",
};
firebase.initializeApp(firebaseConfig);


(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = 'left';
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };

    $(function () {
        var getMessageText, message_side, showMessage;
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };

        showMessage = function (text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message = new Message({
                text: text,
            });
            
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 150);
        };
        $('.send_message').click(function (e) {
            return showMessage(getMessageText());
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                return showMessage(getMessageText());
            }
        });
        
    });
}.call(this));