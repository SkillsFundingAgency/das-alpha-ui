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
    var $address = $usrLoc.replace(/%20/g, " ");;
    //var $usrLoc = $usrLoc;
    var $appCat = 17;

    // randomly shorten the provider result by using the fake category filter
    $appCat = Math.round(Math.random() * 20) + 1;;
    var $proOutput = "";





    // This adds/removes apprenticeships
    $(".shortlist").click(function (e) {
        e.preventDefault();

        console.log("shortlist button clicked: " + proCount);
        //proCount++;

        if ($("i", this).hasClass("fa-star-o")) {
            console.log("isnt shortlisted");
            proCount++;
            console.log(proCount);
            Cookies.set("proCount", proCount);
            $("i", this).removeClass("fa-star-o").addClass("fa-star");
            $("span", this).text("Remove");
            $("#bannerSignedIn span").text(Number(proCount) + Number(appCount));

        } else {
            console.log("is shortlisted");
            $("i", this).removeClass("fa-star").addClass("fa-star-o");
            $("span", this).text("Shortlist");
            proCount--;
            Cookies.set("proCount", proCount);
            console.log(proCount);
            $("#bannerSignedIn span").text(Number(proCount) + Number(appCount));
        }

        //.toggleClass(".fa-star-o").toggleClass(".fa-star");

    })


    $(".postCode").text($address);

    $("#search-button").click(function (e) {
        e.preventDefault();
        $usrLoc = $("#location").val();
        location.replace("proResults.html?usrLoc=" + $usrLoc);
    });




    //
    // Pagination
    //

    //$(".page-navigation__btn.previous").css("visibility","hidden");
    //$("ol li").hide();
    //$("ol#standard-results li:lt(" + paginateCount + ")").show();
    //$("ol#framework-results li:lt(" + paginateCount + ")").show();
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

        location.replace("proDetails.html");
    })


});