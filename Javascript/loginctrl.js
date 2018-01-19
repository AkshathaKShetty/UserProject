var loginctrl = app.controller("loginctrl",function($scope,getDataService,$state){
 
//Import data into controller from Service and storing it in users array
    getDataService.getallusers().then(function (resp) {
        $scope.users = resp.data;
        $scope.usercount = $scope.users.length;
    });  
    
//User Validation
     $scope.onSubmit = function(username,password){
         
         for(i=0;i<$scope.usercount;i++)
         {
             if(username!=undefined && password!=undefined)
             {
                if($scope.users[i].name==username && $scope.users[i].password==password)
                {
                   $scope.status ="True";
                   $state.go("User")
                }
            }
            else
                $scope.status ="False";
            break;
         }
        $scope.status ="False";
     };

//Filtering based on CheckBoxes
$scope.heightarray =[{height:"145cms",on:false},{height:"150cms",on:false},{height:"155cms",on:false},{height:"160cms",on:false},{height:"165cms",on:false}];
$scope.agearray =[{age:"145cms",on:false},{age:"150cms",on:false},{age:"155cms",on:false},{age:"160cms",on:false},{age:"165cms",on:false}];
$scope.heightarray =[{height:"145cms",on:false},{height:"150cms",on:false},{height:"155cms",on:false},{height:"160cms",on:false},{height:"165cms",on:false}];

    $scope.showAll = true;
    $scope.checkChange = function()
    {
            for(t in $scope.users){
            if($scope.users[t].on){
                $scope.showAll = false;
                return;
            }
        }
        $scope.showAll = true;
    };
    
    $scope.myFunc = function(a) {     
      
       if($scope.showAll){ return true; }
       var sel = false;
       for(data in $scope.users){
            var t = $scope.users[data];
            console.log(t);
            console.log(a);
            if(t.on){
                if(a.indexOf(t.height) == -1){
                    return false;
                }else{
                    sel = true;
                }
            }           
        }
       return sel;
    }; 
});


//Service to get Data from JSON file
app.service('getDataService', function ($http) {
    this.getallusers = function () {
        return $http.get('../UserDetails.json');
    };
});

//Unique filter for labels of filter

app.filter('unique', function() {
    return function(collection, keyname) {
    var output = [], 
    keys = [];
    angular.forEach(collection, function(item) {
    var key = item[keyname];
    if(keys.indexOf(key) === -1) {
    keys.push(key); 
    output.push(item);
          }
      });
      return output;
   };
});



    