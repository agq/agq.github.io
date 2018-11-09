$(document).ready(function () {
    "use strict";
    var url = '/ws';
    var destination = "/app/storage.message";
    var stompClient = Stomp.over(new SockJS(url));

    stompClient.connect({}, function(frame) {
    	stompClient.subscribe("/topic/storage.message", function(message) {
    		console.log(JSON.parse(message.body));
        });
	}, function(error) {
		console.log('fail');
    });
});
