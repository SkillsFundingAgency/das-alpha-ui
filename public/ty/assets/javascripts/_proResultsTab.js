$("#tab1").click(function (e) {
    e.preventDefault();
    //alert("tab clicked");
    $(".tabbed-tab").removeClass("active");
    $(this).addClass("active")
    $("#onsite").removeClass("hidden");
    $("#dayrelease, #blockrelease").addClass("hidden");
})

$("#tab2").click(function (e) {
    e.preventDefault();
    //alert("tab clicked");
    $(".tabbed-tab").removeClass("active");
    $(this).addClass("active")
    $("#dayrelease").removeClass("hidden");
    $("#onsite, #blockrelease").addClass("hidden");
})

$("#tab3").click(function (e) {
    e.preventDefault();
    //alert("tab clicked");
    $(".tabbed-tab").removeClass("active");
    $(this).addClass("active")
    $("#blockrelease").removeClass("hidden");
    $("#dayrelease, #onsite").addClass("hidden");
})