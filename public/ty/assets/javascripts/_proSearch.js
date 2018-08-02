$(document).ready(function () {


    function postcode_validate(postcode) {

        var regPostcode = /^([a-zA-Z]){1}([0-9][0-9]|[0-9]|[a-zA-Z][0-9][a-zA-Z]|[a-zA-Z][0-9][0-9]|[a-zA-Z][0-9]){1}([ ])([0-9][a-zA-z][a-zA-z]){1}$/;

        if (regPostcode.test(postcode) == false) {

            //alert("Postcode is not yet valid.");
            $(".ask_location").addClass("form-group error")
            $("<span class='error-message'>Postcode not recognised, please enter another</span>").insertBefore(".ask_location input");

        } else {
            //alert("You have entered a valid postcode!");
            window.location.replace("proResults.html?usrLoc=" + postcode);


        }
    }

    // $("#location").val($usrLoc);

    $("#search-button").click(function (e) {
        e.preventDefault();



        var postcode = $("#postcode").val();


        if ($("#postcode").val() != "") {
            postcode_validate(postcode)
        } else {
            //alert("emptty");
            $(".ask_location").addClass("form-group error")
            $("<span class='error-message'>You must enter a full postcode</span>").insertBefore(".ask_location input");

        }


    });

    $(".appName").text(Cookies.get("appName"));


});