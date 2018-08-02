$(document).ready(function () {

    //GLOBAL VAR
    var XMLSource = $('#data').attr('xmlData');
    var keyword = '';
    var catType = '';
    var stn = '';
    var frm = '';
    var i = 0;
    var msgPlural = 'are';

    var paginateCount = 5;

    $("#submit-keywords").click(function (e) {
        e.preventDefault();


        $("#search").hide();
        $("#results,#resultsHeader").removeClass("hidden");
        //console.log("hello world");

    });


    $("#facets h3 a").click(function (e) {
            e.preventDefault();
            $("#facets .related-subsection").toggleClass("hide-mob");
            $("#facets h3 i").toggleClass("fa-chevron-right").toggleClass("fa-chevron-down");
        })
        // This adds/removes apprenticeships
    $(".shortlist.app").click(function (e) {
        e.preventDefault();

        var scrollTop = $(window).scrollTop();
        var headerHeight = $("header").height();

        if (scrollTop > headerHeight) {
            $(".fixed-container").addClass("fixed");
            setTimeout(function () {
                $(".fixed-container").slideUp("slow", function () {
                    $(this).show().removeClass("fixed");
                })
            }, 3000);
        }

        console.log("shortlist button clicked: " + appCount);
        //appCount++;

        if ($("i", this).hasClass("fa-star-o")) {
            console.log("isnt shortlisted");
            appCount++;
            console.log(appCount);
            Cookies.set("appCount", appCount);
            $("i", this).removeClass("fa-star-o").addClass("fa-star");
            $("span", this).text("Remove");
            $("#savedapplications-link span").text(Number(proCount) + Number(appCount));

        } else {
            console.log("is shortlisted");
            $("i", this).removeClass("fa-star").addClass("fa-star-o");
            $("span", this).text("Shortlist");
            appCount--;
            Cookies.set("appCount", appCount);
            console.log(appCount);
            $("#savedapplications-link span").text(Number(proCount) + Number(appCount));
        }

        //.toggleClass(".fa-star-o").toggleClass(".fa-star");

    })



});