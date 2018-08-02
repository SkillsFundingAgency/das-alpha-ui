$("#sign-in-button").click(function (e) {
    e.preventDefault();
    Cookies.set('auth', 'pass')
    Cookies.set('dash', 'populated')
    location.replace("dashboard.html");
})