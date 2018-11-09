var loginUser =sessionStorage.getItem("user");
if(loginUser==null){
    window.location.href = "login.html";
}
