// Initialize Firebase
var config = {
	apiKey: "AIzaSyCs7AsKd9jIbNIMeYRIkv17_tyw94zWgLI",
	authDomain: "gdg-meetup-31859.firebaseapp.com",
	databaseURL: "https://gdg-meetup-31859.firebaseio.com",
	storageBucket: "",
};

firebase.initializeApp(config);

function saveMessage(text) {
    firebase.database().ref('posts').push({
    	name: email,
    	message: text,
    	time: (new Date()).toString()
    });
}

function loadMessage() {
	firebase.database().ref('posts').on('value', function(snapshot) {
		console.log(snapshot.val());
	});
}

function signIn() {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
		console.log(result.user);
	}).catch(function(error) {
		alert('Error: ' + error.message + '[' + error.code + ']');
	});
}

//Uncomment below to enable sign in of users
// firebase.auth().onAuthStateChanged(function(user) {
// 	if(user) {
// 		console.log(user.email);
// 	} else {
// 		signIn();
// 	}
// });

(function () {
    var Message;
    loadMessage();
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
            saveMessage(text);
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