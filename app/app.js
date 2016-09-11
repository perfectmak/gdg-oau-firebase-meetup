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
    	message: text,
    	time: (new Date()).toString()
    });
}

function loadInitialMessages(viewUpdateFunction) {
	firebase.database().ref('posts').on('value', function(snapshot) {
        var data = snapshot.val();
        for(var i in data) {
            viewUpdateFunction(data[i].message);
        }

        //turn off listening to this message
        firebase.database().ref('posts').off('value');
	});
}

function listenToMessageUpdate(vieWUpdateFunction) {
    firebase.database().ref('posts').on('child_added', function(snapshot) {
        var childData = snapshot.val();
        vieWUpdateFunction(childData.message);
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
//but ensure you are serving this page from a server and not a static file
// firebase.auth().onAuthStateChanged(function(user) {
// 	if(user) {
// 		console.log(user.email);
// 	} else {
// 		signIn();
// 	}
// });

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
            saveMessage(getMessageText());
            return showMessage(getMessageText());
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                saveMessage(getMessageText());
                return showMessage(getMessageText());
            }
        });

        loadInitialMessages(showMessage);
        listenToMessageUpdate(showMessage);
        
    });
}.call(this));