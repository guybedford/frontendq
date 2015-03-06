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
            System.import('leaflet/dist/leaflet.css!'),
            System.import('leaflet')
              .then(function(leaflet) {
                return System.normalize('leaflet/dist/images')
                  .then(function(normalized) {
                    return System.locate({name: normalized, metadata: {}});
                  })
                  .then(function(address) {
                    // address => "http://localhost:3000/jspm_packages/npm/leaflet@0.7.3/dist/images.js
                    // 1) The host bit must go
                    // 2) The .js bit must go
                    // QUESTION: Considering that this is the answer you've given I assume there's currently no better
                    //           or easier way to locate resources within a required dependency and also do so extension
                    //           independent (i.e. don't assume a .js extension)

                    // This is from various StackOverflow posts...
                    var parser = document.createElement('a');
                    parser.href = address;
                    leaflet.Icon.Default.imagePath = parser.pathname.replace('.js', '');
                    return leaflet;
                  });
              })
          ]).then(function(results) {
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
        mapbox: function () {
          return System.import('mapbox');
        }
      }

    })
    .state('notmaps', {
      url: '/notmaps',
      templateUrl: 'partials/notmaps.html'
    });

});
