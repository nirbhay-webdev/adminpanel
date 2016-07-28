var app=angular.module('nol-services',[]);

//Services section
app.service('userAuthenticationService',function(){

    //Authentication Method
    this.authMethod =function(userObject,resolve,reject) {
        
                    if (userObject.userName == null || userObject.password==null)
                    {
                        reject();
                    }

                    else if (userObject.userName == 'nirbhay' && userObject.password == 'noladmin123')
                    {
                        resolve();
                        localStorage.loggedIn='yes';
                    }

            }

    //Logging Out Method
    this.endSession = function(resolve,reject){ 
                    localStorage.loggedIn = 'no';
                    resolve();

    }
    //Get Last Session Details
    this.lastSession = function() {
                    return {
                        userName:'nirbhaygp',
                        firstName:'Nirbhay', 
                        lastName: 'Gupta', 
                        sessionPeriod:'', 
                        loginTime: '1Hr'
                    }
    }
});



app.service('appRoutingService',['$location',function($location){
    this.baseRouter = function(urlString){
        $location.path(urlString);
        console.log('path was set to',urlString);

    }
}])

app.service('dataService', ['$http','$q',function($http,$q){


       
        
        this.getVenueStates = function () {
           var result =[];

         
                    
           
           return $q(function(resolve,reject){ 
                var result =[];

                 $http({
                        method: 'GET',
                        url: 'http://api.nightoutloud.com/api/v1/venue_states/',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Token 58c9a5dbe2d373e10d5818494b9eaac695283311',
                            // 'Origin':'http://localhost:8888'
                        }
                        }).then(function(response){ 
                                                // console.log('Logging response',response.data); 
                                                var newData = Mapper(response.data);
                                                // console.log(newData);
                                                resolve(newData) },function(){ console.log('error occured') });
                });

        }
        
        //Package of function required for additional functionality

      

        function stampSplitter(timeString) {
                    var splits = timeString.split('T');
                    var temp = splits[1].split('Z');
                    splits[1]=temp[0];
                    
                    return {time: splits[1], date: splits[0]};  
                };

        function locationSplitter(locationString) {
                    
                    var splits = locationString.split(';');
                    splits = splits[1].split('(');
                    splits = splits[1].split(' ')
                    var temp = splits[1].split(')'); 
                    splits[1]=temp[0];
                    
                    return {Latitude: splits[0], Longitude: splits[1]};  
                };
        
         function Mapper (response) {

              musicType =['Bollywood','Electronic','Rock','Pop/Commercial'];
              musicSource=['speakers','House DJ','Special DJ','Karaoke','Live Band'];
              placeVibe = ['chill','medium','high'];
              
              var data = [];
              restarauntDisplayNamers={};

              for (var i=0;i<list.length;i++)
            {
                restarauntDisplayNamers[list[i].id]=list[i].display_name;
               
            }

            var length = response.length;

            for (var i=0;i<length;i++){
                data[i] =new Object();
                data[i].venue = response[i].venue;
                data[i].venueName = restarauntDisplayNamers[response[i].venue];
                data[i].people = response[i].count_total;
                data[i].females = response[i].count_females;
                data[i].music = musicType[response[i].music_type];
                data[i].musicsource= musicSource[response[i].music_source];
                data[i].vibe = placeVibe[response[i].vibe];
                var newTimeVal = stampSplitter(response[i].timestamp);
                data[i].time = newTimeVal.time;
                data[i].date = newTimeVal.date;
                var newLocVal = locationSplitter(response[i].location);
                data[i].Latitude = newLocVal.Latitude;
                data[i].Longitude = newLocVal.Longitude;
            }           

            return data;

        }
}]);