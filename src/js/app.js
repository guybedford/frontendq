/* @flow */
'use strict';

import angular from 'angular';
import 'js/map/map-controller';
import 'angular-ui-router';


var maps = angular.module('mapApp', ['ui.router', 'mapControllerModule']);

maps.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');

  $urlRouterProvider.otherwise('/notmaps');

  $stateProvider
    .state('leaflet', {
      url: '/leaflet',
      templateUrl: 'partials/leaflet.html',
      controller: 'LeafletController',
      resolve: {
        leaflet: function () {
          return Promise.all([
            System.import('jspm_packages/npm/leaflet@0.7.3/dist/leaflet.css!'),
            System.import('leaflet')
              .then(function(leaflet) {
                leaflet.Icon.Default.imagePath = '/jspm_packages/npm/leaflet@0.7.3/dist/images';
                return leaflet;
              })
          ]).then(function (results) {
            return results[1];
          });
        }
      }
    })
    .state('mapbox', {
      url: '/mapbox',
      templateUrl: 'partials/mapbox.html',
      controller: 'MapboxController',
      resolve: {
        mapbox: function ($q) {
          return "foo";
        }
      }

    })
    .state('notmaps', {
      url: '/notmaps',
      templateUrl: 'partials/notmaps.html'
    });

});
