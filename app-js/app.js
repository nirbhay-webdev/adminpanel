
var app=angular.module('nol',['ngRoute','nol-services','nol-run-config']);

//Controller section
app.controller('loginController',['$scope','userAuthenticationService','appRoutingService',function($scope,userAuthenticationService,appRoutingService){
    
    $scope.init = function (){
        $scope.user = {userName:null,password:null};
    }

    $scope.login = function(){

        userAuthenticationService.authMethod($scope.user,function(){appRoutingService.baseRouter('/dashboard')},function(){console.log('invalid data ')});
    }

    
}]);

app.controller('dashboardController',['$scope','$rootScope','userAuthenticationService','appRoutingService','dataService',function($scope,$rootScope,userAuthenticationService,appRoutingService,dataService){
    //User Session End Method
    $scope.logout = function() {
        userAuthenticationService.endSession(function(){ 
                                                            appRoutingService.baseRouter('/');
                                                        },function(){
                                                            console.log('there were some issues');
                                                         });
    }


    $scope.currentDataSet = { venue: 'Hauz Khas Social', date: '23-Jul-2016', timeStamp: '7:00PM', people: 120, females: 60, music: 'EDM', musicSrc: 'Speakers', vibe: 'upbeat', imgUrl: '', Latitude: 22.02, Longitude: 43.04, sender: 'Ashwani Kumar Singh'  };
    
    //Last User Session Details Method
    $scope.lastUserLoggedIn = userAuthenticationService.lastSession();

    $scope.tab="dashboard";

    

    $scope.menuDetails = [{key: 'venue', value: ['Hauz Khas Social','Raasta']},{key: 'people',value: {}},{key: 'females',value: {}},{key: 'music',value: ['EDM', 'Rock', 'Bollywood','Pop/Commercial']},{key:'musicsource',value: ['Speakers','House DJ','Special DJ','Live Band']}, {key: 'vibe',value: ['chill','medium','high']},{key: 'fullness',value: [25,50,75,100]},{key:'time',value: {}},{key:'date',value: {}}];

    $scope.Filter= function(String){
            $scope.searchText=String;
    }
    

    $scope.init=function() {
        // $scope.data = dataService.getVenueStates().then(function(response) { console.log('returning response',response); return response; },function(response){console.log('error happened'+response);});
        dataService.getVenueStates().then(function(response){ 
            $scope.data = response; console.log(response);
        },function(){
            console.log('error occured');
        });
        
        $scope.list=list;  
        $scope.searchText = '';
        $scope.tab='dashboard';
        $scope.dataView='list';
    }
}]);






