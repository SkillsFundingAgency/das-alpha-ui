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



var CompanyName = function() {
 var navStatus = JSON.parse(localStorage.getItem('company-name-header'));
 console.log(navStatus);
    if (navStatus == null) {
      navStatus = "Acme Ltd Coventry";
      localStorage.setItem("company-name-header", JSON.stringify(navStatus));
  } else {
  }
};
CompanyName();

//This sets the value of the company field on the prototype admin page - shouldn't do anything else.

$( document ).ready(function() {
var bla = JSON.parse(localStorage.getItem('company-name-header'));
$('#company-name-field').val(bla);
});

