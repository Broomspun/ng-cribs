'use strict';

// Declare app level module which depends on views, and components
angular.module('cribsApp', [
    'ngRoute',
    // 'cribsApp.view1',
    // 'cribsApp.view2',
    'cribsApp.version',
    'ui.bootstrap'
])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        // $locationProvider.hashPrefix('');
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        // $routeProvider.otherwise({redirectTo: '/view1'});
    }])
    .factory('cribsFactory', function ($http) {
        function getCribs() {
            return $http.get('data/cribs.json')
        }

        return {
            getCribs: getCribs
        }
    })
    .controller('cribsController', function ($http, $scope, cribsFactory) {
        $scope.cribs;

        $scope.newListing = {};

        $scope.priceInfo = {
            min: 0,
            max: 1000000
        }

        $scope.addCrib = function(newListing) {
            if(newListing) {
                newListing.image = "default-crib";
                $scope.cribs.push(newListing);
                $scope.newListing = {};
            }
        }

        $scope.editCrib = function(crib) {
            $scope.editListing = true;
            $scope.existingListing = crib;
        }

        $scope.saveCribEdit = function(listing) {
            $scope.existingListing = {};
            $scope.editListing = false;
        }

        $scope.deleteCrib = function(existingListing) {
            var index = $scope.cribs.indexOf(existingListing);
            $scope.cribs.splice(index, 1);
            $scope.existingListing = {};
            $scope.editListing = false;
        }

        cribsFactory.getCribs().success(function (data) {
            $scope.cribs = data
            console.log('json='+data)
        })
            .error(function (error) {
                console.log(error)
            })
    })
    .filter('cribsFilter', function() {

        return function(listings, priceInfo) {

            var filtered = [];

            var min = priceInfo.min;
            var max = priceInfo.max;

            angular.forEach(listings, function(listing) {

                var price = parseInt(listing.price);

                if(price >= min && price <= max) {
                    filtered.push(listing);
                }

            });

            return filtered;
        }

    });
