var window1 = $(window).height();
var global_header = $(".global-header").height();
var phase_banner = $(".phase-banner").height();

$(document).ready(function () {
    $("#google_ads_frame1").height(window1);
    console.log($(window).height())
})