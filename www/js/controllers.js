angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$resource) {
    $scope.city='';
    $scope.days=3;
    
      $scope.weatherApi=$resource("http://api.openweathermap.org/data/2.5/forecast/daily",{
        callback:"JSON_CALLBACK"},{get:{method: "JSONP"}});
   
    $scope.convertToFarenheit=function(degK){
            return Math.round((1.8*(degK -273))+32);
        }
	$scope.convertToDate=function(date){
            return new Date(date*1000);
        }
    $scope.submit = function(){
        $scope.weatherResult='';
        var city=this.city;
          $scope.weatherResult=$scope.weatherApi.get({q: city,cnt: $scope.days,              appid:"6bafeec1eebcba400640c1535049f4ad"});
    }
})

.controller('ChatsCtrl', function($scope) {
    var initialLocation;
    var siberia = new google.maps.LatLng(60, 105);
    var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
    var browserSupportFlag = new Boolean();
    function initialize() {
      var myOptions = {
          zoom: 6,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"), myOptions);

      // Try W3C Geolocation (Preferred)
      if (navigator.geolocation) {
          browserSupportFlag = true;
          navigator.geolocation.getCurrentPosition(function(position) {
              initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              map.setCenter(initialLocation);
          }, function() {
              handleNoGeolocation(browserSupportFlag);
          });
      }
      // Browser doesn't support Geolocation
      else {
          browserSupportFlag = false;
          handleNoGeolocation(browserSupportFlag);
      }

      function handleNoGeolocation(errorFlag) {
          if (errorFlag == true) {
              alert("Geolocation service failed.");
              initialLocation = newyork;
          } else {
              alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
              initialLocation = siberia;
          }
          map.setCenter(initialLocation);
      }
  }
console.log(document.getElementById("map"));
    console.log(map);
    console.log(browserSupportFlag);
      google.maps.event.addDomListener(window, 'load', initialize);

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
