     $(document).ready(function () {


         $(".label-danger").click(function (e) {
             e.preventDefault();
             $(this).parentsUntil(".table").next().css({
                 "color": "red"
             }).hide();
             $(this).parentsUntil(".table-section").hide();
         })

         $(".remove-provider").click(function (e) {
             $(this).parentsUntil("tbody").hide();
         })



         //   $("#dashboard").text(Cookies.getJSON("appArray"));
         //     $("#dashboard2").text(Cookies.getJSON("proArray"));


         $(".toggleProviders").click(function (e) {
             e.preventDefault();

             //   if ($(".provider-item.hidden").length) {
             if ($(this).parent().parent().parent().next().hasClass("hidden")) {
                 $("span", this).text("Hide training providers");
                 //$(".provider-item").removeClass("hidden");
                 $(this).parent().parent().parent().next().removeClass("hidden");

                 $("i", this).removeClass("fa-eye").addClass("fa-eye-slash")
             } else {
                 $("span", this).text("Show training providers");
                 $(".provider-item").addClass("hidden");
                 //$(this).parents().css("color", "green");

                 $("i", this).removeClass("fa-eye-slash").addClass("fa-eye")
             }
         });


         console.log("_app: " + appCount + " _pro: " + proCount);


         // #4 is the incomplete shortlist-item
         // #5 is the notice

         if (appCount == 1 && proCount == 0) {
             //if there is 1 app and 0 pros
             console.log("if 2: a1 p0");
             $("#4").show();
             $("#1,#2,#3,#5").hide();
         } else if (proCount == 1 && appCount == 1) {
             // if there is 1 app and 1 pro (assume its nested)
             console.log("if 3: a1 p1");
             $("#2,#3,#4,#5").hide();
             $("#1").show();
         } else if (proCount == 1 && appCount == 2) {
             // if theres two apps and 1 pro
             $("#2,#3,#5").hide();
             console.log("if 4: a2 p1");
         } else if (proCount == 2 && appCount == 2) {
             // show two complete shortlisted items
             $("#5,#4,#3").hide();
             console.log("if 5: a2 p2");

         } else if (proCount == 0 && appCount == 2) {
             // show two complete shortlisted items
             $("#5,#4,#3").hide();
             console.log("if 5: a2 p0");

         } else if (proCount == 0 && appCount == 3) {
             // show two complete shortlisted items
             $("#5,#4").hide();
             console.log("if 5: a3 p0");

         } else if (proCount == 2 && appCount == 3) {
             // show 2 complete and 1 incomplete
             $("#5,#3").hide();
             console.log("if 6: a3 p2");
         } else if (proCount == 3 && appCount == 3) {
             // show 3 complete apprenticeships
             console.log("if 7: a3 p3");
             $("#5,#4").hide();
         } else if (proCount == 1 && appCount == 0) {
             $("#2,#3,#4,#5").hide();
             console.log("if 8: a0 p1");
         } else if (proCount == 2 && appCount == 0) {
             $("#3,#4,#5").hide();
         }
         if (proCount == 3 && appCount == 0) {
             console.log("if 9: a0 p2");
             $("#4,#5").hide();
         } else if (proCount == 0 && appCount == 0) {
             //if there is nothing shortlisted show the notice
             $("#1,#2,#3,#4").hide();
             console.log("if 1 : a0 p0");
             $("#5").show();
         } else {
             $("#5").hide();
         }


         $("body").on("keydown", function (event) {

             if (event.which == 49) {
                 //1
                 $("#1").toggle();
             } else if (event.which == 50) {
                 //2
                 $("#2").toggle()
             } else if (event.which == 51) {
                 //3
                 $("#3").toggle()
             } else if (event.which == 52) {
                 //4
                 $("#4").toggle()
             } else if (event.which == 53) {
                 //5
                 $("#5").toggle()
             } else if (event.which == 54) {
                 //6
                 $("#6").toggle()
             }
         });


         //$("#appproName").text(Cookies.get("appName"));

         $("a.delete").click(function (e) {
             $(this).parents("tr").remove();


         })

         $(".delete a").click(function (e) {
             $(this).parents(".app").remove();
         })

         $("#4 .delete").click(function (e) {
             $("#4").addClass("hidden");
         })

     });