var app= angular.module('nol-run-config',['ngRoute','nol-services'])

app.run(['$location','dataService','$rootScope',function($location,dataService,$rootScope){
        var requestedRoute = $location.path();
    var loginStatus = localStorage.loggedIn;

    if (loginStatus == 'yes') {
        $location.path('/dashboard');
        // var temp_data =dataService.getVenueStates().then(function(response){return response.data;},function(response){console.log(response);});
        // $rootScope.runData =temp_data;
    }
    else if (loginStatus != 'yes' ) $location.path('/');

    
}])

app.config(['$locationProvider','$routeProvider',function($locationProvier,$routeProvider){
    $routeProvider
    .when('/',{
            templateUrl:'app-templates/login.html',
    })
    .when('/dashboard',{templateUrl:'app-templates/dashboard.html'})
    .otherwise('/');
}]);
