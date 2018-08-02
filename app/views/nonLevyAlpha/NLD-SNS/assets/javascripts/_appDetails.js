//GLOBAL VAR
var XMLSource = $('#data').attr('xmlData');
//var keyword = $trainingId;
var keyword = "build";
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

    $(xmlData).find('app[appId=' + $trainingId + ']').each(function () {

        var appName = $(this).find('appName').text();
        var appId = $trainingId;
        var appType = $(this).find('appType').text();
        var appFrom = $(this).find('appFrom').text();
        var appTo = $(this).find('appTo').text();
        var appLevel = $(this).find('appLevel').text();
        var appProviders = $(this).find('appProviders').text();
        var appSector = $(this).find('appSector').text();
        var appNAS = $(this).find('appNAS').text();
        var stnOverview = $(this).find('stnOverview').text();
        var stnEntry = $(this).find('stnEntry').text();
        var stnLearn = $(this).find('stnLearn').text();
        var stnQual = $(this).find('stnQual').text();
        var stnReg = $(this).find('stnReg').text();
        var frmPathway = $(this).find('frmPathway').text();


        Cookies.set("appName", appName);
        Cookies.set("appId", appId);
        Cookies.set("appType", appType);
        Cookies.set("appFrom", appFrom);
        Cookies.set("appTo", appTo);
        Cookies.set("appLevel", appLevel);
        Cookies.set("appProviders", appProviders);
        Cookies.set("appSector", appSector);
        Cookies.set("appNAS", appNAS);
        Cookies.set("stnOverview", stnOverview);
        Cookies.set("stnEntry", stnEntry);
        Cookies.set("stnLearn", stnLearn);
        Cookies.set("stnQual", stnQual);
        Cookies.set("stnReg", stnReg);
        Cookies.set("frmPathway", frmPathway);


        // Create the text for appLevel equivalents

        switch (appLevel) {
        case "1":
            appLevel = "1 (equivalent to GCSEs at grades D to G)";
            break;
        case "2":
            appLevel = "2 (equivalent to GCSEs at grades A* to C)";
            break;
        case "3":
            appLevel = "3 (equivalent to A levels at grades A to E)";
            break;
        case "4":
            appLevel = "4 (equivalent to certificate of higher education)";
            break;
        case "5":
            appLevel = "5 (equivalent to foundation degree)";
            break;
        case "6":
            appLevel = "6 (equivalent to bachelor's degree)";
            break;
        case "7":
            appLevel = "7 (equivalent to master’s degree)";
            break;
        case "8":
            appLevel = "8 (equivalent to doctorate)";
            break;
        default:
            appLevel = "unknown level";
            break;
        }

        // render the result
        $(".frmPathway").text(frmPathway);
        $(".stnName").text(appName);
        $(".frmName").text(appName);

        if (appType == "standard") {
            //$(".stnOverview").html(marked(stnOverview || Cookies.get("stnOverview")));
            $(".stnOverview").html(marked(Cookies.get("stnOverview") || stnOverview));
            $(".stnEntry").html(marked(stnEntry));
            $(".stnLearn").html(marked(stnLearn));
            $(".stnQual").html(marked(stnQual));
            $(".stnReg").html(marked(stnReg));
            $(".stnLevel").text(appLevel);
        }

        //$(".minLength").text(appLength);
        //$(".frmLevel").text(appLevel);
        // $(".appFrom").text(appFrom);
        //$(".appTo").text(appTo);


        if (appTo == "") {
            $(".ifRange").hide();
            $(".appTo").hide();
        }

        $(".searchTerm").text(Cookies.get('keyword'));

        $("form").submit(function (e) {
            var searchInput = $(".search-box input").val();

            if (searchInput == "") {
                console.log("blank");
                e.preventDefault()
                $(".search-box .form-group").addClass("error");
                $(".error-message").show();

            } else {
                e.preventDefault()
                console.log("not blank");
                location.replace("proResults.html?usrLoc=" + searchInput);
                Cookies.set("appType", appType);
                Cookies.set("appName", appName);
                Cookies.set("appLevel", appLevel);
                Cookies.set("pathway", pathway);
                Cookies.set("searchInput", searchInput);
            }
        });

    });
};


$(".shortlist.app").click(function (e) {
    e.preventDefault();
    console.log("shortlist button clicked: " + appCount);
    //appCount++;

    if ($(".shortlist.app i").hasClass("fa-star-o")) {
        console.log("isnt shortlisted");
        appCount++;
        console.log(appCount);
        Cookies.set("appCount", appCount);
        $(".shortlist.app i").removeClass("fa-star-o").addClass("fa-star");
        $(".shortlist.app span").text("Remove from shortlist");
        $("#bannerSignedIn span").text(Number(proCount) + Number(appCount));

    } else {
        console.log("is shortlisted");
        $(".shortlist.app i").removeClass("fa-star").addClass("fa-star-o");
        $(".shortlist.app span").text("Shortlist this apprenticeship");
        appCount--;
        Cookies.set("appCount", appCount);
        console.log(appCount);
        $("#bannerSignedIn span").text(Number(proCount) + Number(appCount));
    }

    //.toggleClass(".fa-star-o").toggleClass(".fa-star");

})


$(".stnQual a").click(function (e) {
    e.preventDefault();
    $("#subList").toggleClass("hidden");
    $(this).remove();
})


// hides pathway if its the same as the framework name
if ($("#frmName .frmName").val() == $("#frmName .frmPathway").val()) {
    $("#frmName .frmPathway").hide();
}