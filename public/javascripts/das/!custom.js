//I don't this this script is called. There is another one in the root of Javascripts.

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
      sprintNow = "sprint10";
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
            $('<style>.breadcrumbs ol li a { display:none;}</style>').appendTo('body');
          }; else {}
}; 
breadyCrumb();



// This sets a default company name if its not been set on the proto admin page
var CompanyName = function() {
 var compName = JSON.parse(localStorage.getItem('company-name-header'));
    if (compName == null) {
      compName = "Acme Ltd";
      localStorage.setItem("company-name-header", JSON.stringify(compName));
  } else {
  }
};
CompanyName();


//This swaps out the URL to the sprint chosen in the admin tool. The phrase it is searching for and replacing is in includes/sprint-link.html

$( document ).ready(function() {
  var urlToBeChanged = JSON.parse(localStorage.getItem('sprint-number'));
$("body").html($("body").html().replace(/change-me-url/g, urlToBeChanged));
});

