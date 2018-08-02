$(document).ready(function () {

    //GLOBAL VAR
    var XMLSource = $('#data').attr('xmlData');
    var keyword = '';
    var catType = '';
    var stn = '';
    var frm = '';

    var i = 0;
    var msgPlural = 'are';

    var paginateCount = 10;

    var lat1 = "";
    var lon1 = "";
    var lat2 = "";
    var lon2 = "";
    //var $address = $usrLoc.replace(/%20/g, " ");;
    //var $usrLoc = $usrLoc;
    var $appCat = 17;

    // randomly shorten the provider result by using the fake category filter
    $appCat = Math.round(Math.random() * 20) + 1;;
    var $proOutput = "";





    

// ROB REMOVED THIS ON 9 AUG

    // $(".postCode").text($address);

    // $("#search-button").click(function (e) {
   //     e.preventDefault();
    //    $usrLoc = $("#location").val();
   //     location.replace("proResults.html?usrLoc=" + $usrLoc);
    // });




    //
    // Pagination
    //


    $("#pagedat").jPages({
        containerID: "provider-results",
        perPage: 10,
        animation: "none",
        first: false,
        previous: "a.previous",
        next: "a.next",
        last: false,
        midRange: 0,
        callback: function (pages, items) {
            $(".totalPage").html(pages.count);
            $(".prevPage").html((pages.current) - 1);
            $(".nextPage").html((pages.current) + 1);
        }
    });

    $("a.proName").click(function (e) {
        e.preventDefault();

        location.replace("proDetails");
    })


});