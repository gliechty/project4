angular.module('fishrApp', ['ngRoute']);

function initAutocomplete() {

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 39.739, lng: -104.990},
      zoom: 13,
      mapTypeId: 'terrain'
    });
    console.log("initAuto");

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });
    map.addListener('click', function(event) {
      addMarker(event.latLng);
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      // markers.forEach(function(marker) {
      //   marker.setMap(null);
      // });
      // markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      map.fitBounds(bounds);
    });

    function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP
    });

    markers.push(marker);
    console.log(markers);

  }
}

// Removes the markers from the map, but keeps them in the array.
      // function clearMarkers() {
      //   setMapOnAll(null);
      // }

      // Shows any markers currently in the array.
      // function showMarkers() {
      //   setMapOnAll(map);
      // }