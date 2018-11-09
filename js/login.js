$(document).ready(function() {
	var loginSubmit = $('#loginSubmit');

	$('#password').keypress(function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			login();
		}
	});

	loginSubmit.click(function() {
		login();
	});

	function login() {
		var name = $('#name').val();
		var password = $('#password').val();
		if (auth(name, password)) {
			window.location.href = "dashboard.html";
		} else {
			showErrorMsg();
		}
		return false;
	}

	function showErrorMsg() {
		var errorMessage = $('#errorMessage');
		errorMessage.show();
		setTimeout(function() {
			errorMessage.hide();
		}, 2500);
	}
	
	function auth(user, password) {
		if (user === 'rens' && password === '2017') {
			sessionStorage.setItem("user", "rens");
			return true;
		}
		return false;
	}


});