(function ( $ ) {

    $.fn.distancecalculator = function( options ) {

        var directionsService = new google.maps.DirectionsService();
        var this_element = this;

        // Define default options
        var settings = $.extend({
            start_address: "",
            end_address: "",
            waypoints: "",
            result_container_type: "container",
            units: "mile",
            travel_mode: "DRIVING",
        }, options );

        //Create waypoints array & fill it with all locations entered by user
        var waypts = new Array();
        if(settings.waypoints!=""){
            $.each(settings.waypoints, function(index, value) {
                waypts.push({
                    location : value,
                    stopover : true
                });
            });
        }

        // Define travel mode
        var travel_mode = "";
        if(settings.travel_mode=='DRIVING')
            travel_mode = google.maps.DirectionsTravelMode.DRIVING
        else
        if(settings.travel_mode=='BICYCLING')
            travel_mode = google.maps.DirectionsTravelMode.BICYCLING
        else
        if(settings.travel_mode=='TRANSIT')
            travel_mode = google.maps.DirectionsTravelMode.TRANSIT
        else
        if(settings.travel_mode=='WALKING')
            travel_mode = google.maps.DirectionsTravelMode.WALKING

        // Create a Direction Request variable
        var request = {
            origin: settings.start_address,
            destination: settings.end_address,
            waypoints: waypts,
            optimizeWaypoints: true,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            travelMode: travel_mode
        };

        // Execute the Route Method to get Distance
        directionsService.route(request, function(response, status) {

            if (status == google.maps.DirectionsStatus.OK) {
                var route = response.routes[0];

                // calculate total distance and duration
                var distance = 0;
                var time = 0;

                for (var i=0; i<route.legs.length; i++) {
                    var theLeg = route.legs[i];
                    distance += theLeg.distance.value;
                    time += theLeg.duration.value;
                }
                var final_distance = convertDistance(distance, settings.units);
                if(settings.result_container_type=='container')
                    return this_element.html(final_distance);
                else
                    return this_element.val(final_distance);
            }
            else {
                var statusText = getDirectionStatusText(status);
                if(settings.result_container_type=='container')
                    return this_element.html(statusText);
                else
                    return this_element.val(statusText);
            }
        });

        // Show distance in different measurements
        function convertDistance(distance, units) {
            if(units=='mile'){
                return (((distance*0.621371192)/100) / 10);
            }
            else if(units=='kilometer'){
                return ((((distance*0.621371192)/100) / 10) * 1.609344);
            }
            else{
                return distance;
            }
        }

        // Get the Map direction status message
        function getDirectionStatusText(status){
            switch(status){
                case google.maps.DirectionsStatus.INVALID_REQUEST :
                    return "Invalid request";
                case google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED :
                    return "Maximum waypoints exceeded";
                case google.maps.DirectionsStatus.NOT_FOUND :
                    return "Not found";
                case google.maps.DirectionsStatus.OVER_QUERY_LIMIT :
                    return "Over query limit";
                case google.maps.DirectionsStatus.REQUEST_DENIED :
                    return "Request denied";
                case google.maps.DirectionsStatus.UNKNOWN_ERROR :
                    return "Unknown error";
                case google.maps.DirectionsStatus.ZERO_RESULTS :
                    return "Zero results";
                default:
                    return status;
            }
        }
    };

}( jQuery ));