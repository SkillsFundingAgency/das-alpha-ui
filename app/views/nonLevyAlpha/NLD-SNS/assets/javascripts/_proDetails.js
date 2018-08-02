//GLOBAL VAR
var XMLSource = $('#data').attr('xmlData');
var keyword = $proId;
var pub = '';

var i = 0;
searchThis();

function searchThis() {
    $.ajax({
        type: "GET",
        url: XMLSource,
        dataType: "xml",
        success: function (xml) {
            loadPublication(xml)
        },
        error: function (request, error) {
            console.log(arguments);
            alert(" Can't do because: " + error);
        }
    });
}

function loadPublication(xmlData) {
    $(xmlData).find('pro[proId=' + $proId + ']').each(function () {

        var PROVIDER_ID = $(this).find('PROVIDER_ID').text;
        var UKPRN = $(this).find('UKPRN').text();
        var PROVIDER_TYPE_ID = $(this).find('PROVIDER_TYPE_ID').text();
        var EMAIL = $(this).find('EMAIL').text();
        var WEBSITE = $(this).find('WEBSITE').text();
        var PHONE = $(this).find('PHONE').text();
        var FAX = $(this).find('FAX').text();
        var Name = $(this).find('Name').text();
        var Address = $(this).find('Address').text();
        var appCat = $(this).find('appCat').text();
        var LearnerScore = ($(this).find('LearnerScore').text()) * 10;
        var EmployerScore = ($(this).find('EmployerScore').text()) * 10;
        var proMarketing = $(this).find('proMarketing').text();
        var proCourseInfo = $(this).find('proCourseInfo').text();

        $("h1").text(Name);
        $(".website").text(WEBSITE)
        $(".website").attr("href", WEBSITE)
        $(".email").text(EMAIL)
        $(".phone").text(PHONE)
        $("address").text(Address)

        $(".proMarketing").html(marked(proMarketing));
        $(".proCourseInfo").html(marked(proCourseInfo));
        $(".proCourse ul").addClass("list list-bullet");
        $(".proCourse h5").addClass("heading-small");




        $('h1').each(function () {
            var text = this.innerText;
            var words = text.split(" ");
            var spans = [];
            var _this = $(this);
            this.innerHTML = "";
            words.forEach(function (word, index) {
                _this.append($('<span>', {
                    text: word
                }));
            });

        });


        var distance = Cookies.get('distance');

        if (distance < 1) {
            $(".distance").text("Training takes place at employer's location");
            $(".milesFrom, .yourLocation").hide();
        } else {
            $(".distance").text(distance);
        }




        $(".yourLocation").text(Cookies.get('usrLoc'));

        $(".appName").text(Cookies.get('appName'));
        $(".appLevel").text(Cookies.get('appLevel'));

        $("#passRate2 span").text(LearnerScore + "%");
        $("#employerSatisfaction2 span").text(EmployerScore + "%");


        if (Cookies.get('appType') == "standard") {

        } else {
            $(".frmPathway").removeClass("hidden").text(Cookies.get('frmPathway'));

        }

    })

};



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
        $("span", this).text("Remove this training provider");
        $("#bannerSignedIn span").text(Number(proCount) + Number(appCount));

    } else {
        console.log("is shortlisted");
        $("i", this).removeClass("fa-star").addClass("fa-star-o");
        $("span", this).text("Shortlist this training provider");
        proCount--;
        Cookies.set("proCount", proCount);
        console.log(proCount);
        $("#bannerSignedIn span").text(Number(proCount) + Number(appCount));
    }

    //.toggleClass(".fa-star-o").toggleClass(".fa-star");

})