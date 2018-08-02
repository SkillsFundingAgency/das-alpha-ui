    //pulls url variables    
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    }
    // defines url variables as global vars 
    var $distance = Number(getQueryVariable("WithinDistance"));
    var $resultsToDisplay = Number(getQueryVariable("resultsToDisplay"));
    var $location = getQueryVariable("Location");
    var $keywords = getQueryVariable("Keywords");
    var $trainingId = getQueryVariable("trainingId");
    var $proId = getQueryVariable("proId");
    var $address = getQueryVariable("address");
    var $appType = getQueryVariable("appType");
    var $appCat = parseInt(getQueryVariable("appCat"));
    var $usrLoc = getQueryVariable("usrLoc");
    var $catId = getQueryVariable("catId");
    var $ignoreRadius = getQueryVariable("ignoreRadius");

    if (Cookies.get("proCount") == null) {
        Cookies.set("proCount", 0)
        console.log("pro count created: " + Cookies.get("proCount"));
    }
    var proCount = Number(Cookies.get("proCount"));


    if (Cookies.get("appCount") == null) {
        Cookies.set("appCount", 0)
        console.log("app count created: " + Cookies.get("appCount"));
    }
    var appCount = Number(Cookies.get("appCount"));


    $(document).ready(function () {

        // Shortlist globals

        var dashState = "empty"




        $("#bannerSignedIn a span").text(Number(proCount) + Number(appCount));




        $(".link-back").click(function (e) {
            e.preventDefault();
            window.history.back();
        })



        function goBack() {
            window.history.back();
        }


        $("body").on("keydown", function (event) {

            if (event.which == 17) {
                Cookies.remove("appCount");
                Cookies.remove("proCount");
                console.log("cookies removed");

            }
        });

    });




    if (Cookies.get("auth") == "pass") {
        $("#bannerSignedIn").addClass("hidden");
        $("#bannerSignedOut").removeClass("hidden");
    } else {
        $("#bannerSignedOut").addClass("hidden");
        $("#bannerSignedIn").removeClass("hidden");
    }

    $("#signout-link").click(function (e) {
        e.preventDefault();
        Cookies.set("auth", "fail");
    })


    $("#bannerSignedOut a").click(function (e) {
        e.preventDefault();
        Cookies.set("auth", "fail");
        window.location.reload();
    })

    /*
    var shortlistObject = {
        "shortlist": [
            {
                "apprenticeship": {
                    "id": "0002",
                    "providers": [345, 354, 22, 566]
                }
            },
            {
                "apprenticeship": {
                    "id": "0005",
                    "providers": [435, 35345, 353453, 3534]
                }
            }
        ]
    };


    Cookies.set('shortlist', '{"shortlist": [{"apprenticeship": {"id": "1","providers": [345, 354, 22, 566]}},{"apprenticeship": {"id": "2","providers": [435, 35345, 353453, 3534]}}]}');
    */