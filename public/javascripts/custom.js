var EventUtil = {

    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    
    getButton: function(event){
        if (document.implementation.hasFeature("MouseEvents", "2.0")){
            return event.button;
        } else {
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4: return 1;
            }
        }
    },
    
    getCharCode: function(event){
        if (typeof event.charCode == "number"){
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },
    
    getClipboardText: function(event){
        var clipboardData =  (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },
    
    getEvent: function(event){
        return event ? event : window.event;
    },
    
    getRelatedTarget: function(event){
        if (event.relatedTarget){
            return event.relatedTarget;
        } else if (event.toElement){
            return event.toElement;
        } else if (event.fromElement){
            return event.fromElement;
        } else {
            return null;
        }
    
    },
    
    getTarget: function(event){
        if (event.target){
            return event.target;
        } else {
            return event.srcElement;
        }
    },
    
    getWheelDelta: function(event){
        if (event.wheelDelta){
            return (client.opera && client.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    },
    
    preventDefault: function(event){
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    
    setClipboardText: function(event, value){
        if (event.clipboardData){
            event.clipboardData.setData("text/plain", value);
        } else if (window.clipboardData){
            window.clipboardData.setData("text", value);
        }
    },
    
    stopPropagation: function(event){
        if (event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
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
      sprintNow = "sprintbeta1";
      localStorage.setItem("sprint-number", JSON.stringify(sprintNow));
  } else {
  }
};
defaultSprint();


// This removes the breadcrumbs from sprint 10 (the navigation version). The breadcrumb on earlier versions is broken
var breadyCrumb = function() {
          var whatSprint = JSON.parse(localStorage.getItem('sprint-number'));
           console.log('what sprint is ' + whatSprint);
          if (whatSprint == "sprint10") {
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

// This has moved to javascripts/das/commitment-1.0.js

// $( document ).ready(function() {
// var whereNow = function() {
//   var hasAppAdded = JSON.parse(localStorage.getItem('apprenticeship-added'));
//
//     if (hasAppAdded == "yes") {
//       $( "#no-apprenticeships" ).addClass( "rj-dont-display" );
//       var  isAddedApp = 'no';
//       localStorage.setItem("apprenticeship-added", JSON.stringify(isAddedApp));
//
//
//   } else {
//   $( "#apprenticeships" ).addClass( "rj-dont-display" );
//
//   }
// };
// whereNow();
//
// });
//
// $( document ).ready(function() {
// var bulkUpload = function() {
//   var hasBulkUpload = JSON.parse(localStorage.getItem('apprenticeship-added.bulk-upload'));
//     if (hasBulkUpload == "yes") {
//       $( "#no-apprenticeships" ).addClass( "rj-dont-display" );
//       $( "#no-apprenticeships" ).addClass( "rj-dont-display" );
//       $( "#apprenticeships-bulk" ).removeClass( "rj-dont-display" );
//       var  hasBulkUpload = 'no';
//       localStorage.setItem("apprenticeship-added.bulk-upload", JSON.stringify(hasBulkUpload));
//   } else {
//   $( "#apprenticeships-bulk" ).addClass( "rj-dont-display" );
//
//   }
// };
// bulkUpload();
//
// });

/* To determine whether the commitments in progress page should show the confirmation or not (i.e. have you just completed something) - this breaks because of the URl change below if it is in the page...it should live in /contracts/provider-in-progress? */

$( document ).ready(function() {
var showDoneAlert = function() {
  var isAlertShowing = JSON.parse(localStorage.getItem('commitments.providerAlert'));

    if (isAlertShowing == "yes") {
      $( "#showDoneAlert" ).removeClass( "rj-dont-display" );
      var  isAlertShowing = 'no';
      localStorage.setItem("commitments.providerAlert", JSON.stringify(isAlertShowing));


  } else {
  // $( "#showDoneAlert" ).addClass( "rj-dont-display" );

  }
};
showDoneAlert();

});


//This swaps out the URL to the sprint chosen in the admin tool. The phrase it is searching for and replacing is in includes/sprint-link.html
// Want this to run last as it was breaking other things...

$(document).ready(function() {
      var urlToBeChanged = JSON.parse(localStorage.getItem('sprint-number'));
      $("body").html($("body").html().replace(/change-me-url/g, urlToBeChanged));
  });



