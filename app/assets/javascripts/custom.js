//event handlers for buttons
var EventUtil = {

            addHandler: function(element, type, handler) {
              if (element.addEventListener) {
                element.addEventListener(type, handler, false);
              } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
              } else {
                element["on" + type] =handler;
              }
            }
            };

//back button
function goBack() {
    window.history.back();
}

// yes, this does what you think it does!
$( document ).ready(function() {
  window.setInterval(function(){
  $('.blink').toggle();
}, 550);
  });


// this sets the default sprint number if its not changed on the admin page.
var defaultSprint = function() {
 var sprintNow = JSON.parse(localStorage.getItem('sprint-number'));
 console.log(sprintNow);
    if (sprintNow == null) {
      sprintNow = "sprintbeta0";
      localStorage.setItem("sprint-number", JSON.stringify(sprintNow));
  } else {
  }
};
defaultSprint();


// This removes the breadcrumbs from sprints below 10
var breadyCrumb = function() {
          var whatSprint = JSON.parse(localStorage.getItem('sprint-number'));
           console.log('what sprint is ' + whatSprint);
          if (whatSprint != "sprint11") {
            $('<style>.breadcrumbs ol li a { display:none;}</style>').appendTo('head');
          } else {}
}; 
breadyCrumb();

// This sets a default company name if its not been set on the proto admin page
var CompanyName = function() {
 var compName = JSON.parse(localStorage.getItem('company-name-header'));
 console.log(compName);
    if (compName == null) {
      compName = "Acme Ltd Coventry";
      localStorage.setItem("company-name-header", JSON.stringify(compName));
  } else {
  }
};
CompanyName();

/* To determine if the to do list has been done - only dates works for now - this breaks because of the URl change below if it is in the page...it should live in /sprint11/contracts/new-contract/provider-interface/add-apprenticeship */

$( document ).ready(function() {
var addedOrNor = function() {
  var hasDatesAdded = JSON.parse(localStorage.getItem('apprenticeship-dates-added'));
   console.log(hasDatesAdded)
    if (hasDatesAdded == "yes") {
       $( ".datesComplete" ).removeClass( "rj-dont-display" );
      $( ".datesToDo" ).addClass( "rj-dont-display" );
      var  hasDatesAdded = 'no';
      localStorage.setItem("apprenticeship-dates-added", JSON.stringify(hasDatesAdded));
  } else {
  $( ".datesComplete" ).addClass( "rj-dont-display" );

  }
};
addedOrNor();

});

/* To determine if an apprenticeship has been added to the contract - this breaks because of the URl change below if it is in the page...it should live in /sprint11/contracts/new-contract/provider-interface/individual-contract */

$( document ).ready(function() {
var whereNow = function() {
  var hasAppAdded = JSON.parse(localStorage.getItem('apprenticeship-added'));
   console.log(hasAppAdded)
    if (hasAppAdded == "yes") {
      $( "#no-apprenticeships" ).addClass( "rj-dont-display" );
      var  isAddedApp = 'no';
      localStorage.setItem("apprenticeship-added", JSON.stringify(isAddedApp));
 

  } else {
  $( "#apprenticeships" ).addClass( "rj-dont-display" );

  }
};
whereNow();

});


//This swaps out the URL to the sprint chosen in the admin tool. The phrase it is searching for and replacing is in includes/sprint-link.html
// Want this to run last as it was breaking other things...

$(document).ready(function() {
      var urlToBeChanged = JSON.parse(localStorage.getItem('sprint-number'));
      $("body").html($("body").html().replace(/change-me-url/g, urlToBeChanged));
  });






