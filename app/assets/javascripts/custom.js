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


//Turns navigation on and off

$( document ).ready(function() {
var NavigationStatus = function() {
  var navStatus = JSON.parse(localStorage.getItem('Navigation-Status'));
   console.log(navStatus)
    if (navStatus == "on") {
      $( "#navigation-primary" ).removeClass( "rj-dont-display" );
  } else {
  $( "#navigation-primary" ).addClass( "rj-dont-display" );

  }
};
NavigationStatus();

});