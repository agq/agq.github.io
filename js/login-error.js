$(document).ready(function() {
	//show error message for fail to login
	var url=window.location.href;  
	var failure = url.indexOf('error')>0;  
    if(failure){
    	showErrorMsg();
    }

	function showErrorMsg() {
		var errorMessage = $('#errorMessage');
		errorMessage.show();
		setTimeout(function() {
			errorMessage.hide();
		}, 2500);
	}
});