
$(document).ready(function () {


    var logoutlink = $('.logout');

    logoutlink.click(function () {
        logout();
    });

    function logout() {
        sessionStorage.removeItem("user");
        window.location.href = "login.html";
        return false;
    }
});