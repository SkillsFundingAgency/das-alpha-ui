$("#create-account-btn").click(function (e) {
    e.preventDefault();
    Cookies.set("dash", "empty");
    Cookies.set("auth", "pass");
    location.replace("dashboard.html");

})