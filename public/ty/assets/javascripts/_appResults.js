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

    });


    $("#facets h3 a").click(function (e) {
            e.preventDefault();
            $("#facets .related-subsection").toggleClass("hide-mob");
            $("#facets h3 i").toggleClass("fa-chevron-right").toggleClass("fa-chevron-down");
        })
        // This adds/removes apprenticeships


});



