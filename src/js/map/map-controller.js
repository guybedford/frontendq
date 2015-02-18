/* @flow */
'use strict';

import 'angular';

var mapController = angular.module('mapControllerModule', []);

mapController.controller('LeafletController', function ($scope, leaflet) {

  // create a map in the "map" div, set the view to a given place and zoom
  var map = leaflet
    .map('map')
    .setView([51.505, -0.09], 13);

  leaflet.tileLayer('http://{s}.tiles.mapbox.com/v3/examples.map-i875mjb7/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
  }).addTo(map);

  // add a marker in the given location, attach some popup content to it and open the popup
  leaflet
    .marker([51.5, -0.09])
    .addTo(map)
    .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
    .openPopup();
});


mapController.controller('MapboxController', function ($scope, mapbox) {
  mapboxgl.accessToken = 'pk.eyJ1IjoidGltcm9iZXJ0c29uMTAwIiwiYSI6IlRxTFEzOUkifQ.UlS8frv1bZZPdUfDp-zolQ';
  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v6.json', //stylesheet location
    center: [40, -74.50], // starting position
    zoom: 9 // starting zoom
  });
});
