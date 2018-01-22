var loginctrl = app.controller("loginctrl", function ($scope,$rootScope, getDataService, $state,$filter) {
    $scope.adminDetails = { "username": "admin", "password": "123"};
    $scope.status = true;

    //Import data into controller from Service and storing it in users array
    getDataService.getallusers().then(function (resp) {
        $scope.users = resp.data;
        $scope.usercount = $scope.users.length;
    });

    //User Validation
    $scope.onSubmit = function (username, password) {
        $rootScope.user = username;
        $rootScope.passw = password;

        if (username.toLowerCase() == "admin")
        {
            if (password.toLowerCase() == "123") {
                $scope.status = "true";
                $state.go("User");
            }
            else
                $scope.status = false; return;
        } else
        {
            for (i = 0; i < $scope.usercount; i++) {
                if (username != undefined && password != undefined) {
                    if ($scope.users[i].name.toLowerCase() == username.toLowerCase() && $scope.users[i].password == password) {
                        $scope.status = true;
                        $scope.adminuser = false;
                        $state.go("User");
                    } else $scope.status = false; return;
                }
                else
                    $scope.status = false; return;
                break;
            } $scope.status = false; return;
        }        
        
    };

    //Filtering based on CheckBoxes
    $scope.heightarray = [{ height: "145cms", on: false }, { height: "150cms", on: false }, { height: "155cms", on: false }, { height: "160cms", on: false }, { height: "165cms", on: false }];
    $scope.agearray = [{ age: "18", on: false }, { age: "25", on: false }, { age: "60", on: false }, { age: "35", on: false }, { age: "50", on: false }];
    $scope.countryarray = [{ country: "India", on: false }, { country: "Australia", on: false }, { country: "China", on: false }, { country: "Russia", on: false }, { country: "Canada", on: false }];

    $scope.showAll = true;
    $scope.checkHeight = function()
    {
            for(t in $scope.heightarray){
                if ($scope.heightarray[t].on) {
                $scope.showAll = false;
                return;
            }
        }
        $scope.showAll = true;
    };
//filtering data based on height
    $scope.height = function (a) {
        if($scope.showAll){ return true; }
        var sel = false;
        for (h in $scope.heightarray)
        {
            var t = $scope.heightarray[h];
            if (t.on)
            {
                if (a.height.indexOf(t.height) == -1)
                {
                    return false;
                }
                else
                {
                sel = true;
                }
            }
        }
        return sel;
    };
    $scope.showAgeAll = true;
    $scope.checkAge = function () {
        for (t in $scope.agearray) {
            if ($scope.agearray[t].on) {
                $scope.showAgeAll = false;
                return;
            }
        }
        $scope.showAgeAll = true;
    };
    $scope.age = function (a) {
        if ($scope.showAgeAll) { return true; }
        var sel = false;
        for (h in $scope.agearray) {
            var t = $scope.agearray[h];
            if (t.on) {
                if (a.age.indexOf(t.age) == -1) {
                    return false;
                }
                else {
                    sel = true;
                }
            }
        }
        return sel;
    };
    $scope.showCountryAll = true;
    $scope.checkCountry = function () {
        for (t in $scope.countryarray) {
            if ($scope.countryarray[t].on) {
                $scope.showCountryAll = false;
                return;
            }
        }
        $scope.showCountryAll = true;
    };
    $scope.country = function (a) {
        if ($scope.showCountryAll) { return true; }
        var sel = false;
        for (h in $scope.countryarray) {
            var t = $scope.countryarray[h];
            if (t.on) {
                if (a.country.indexOf(t.country) == -1) {
                    return false;
                }
                else {
                    sel = true;
                }
            }
        }
        return sel;
    };

   // Add new User

    $scope.addNew = function (users) {
        //$scope.users.push({
        //    'fname': "",
        //    'lname': "",
        //    'email': "",
        //});
        var newuser = {
            name: $scope.addname,
            age: $scope.addage,
            gender: $scope.addgender,
            height: $scope.addheight,
            country: $scope.addcountry         
        }; $scope.users.push(newuser);
    };

    $scope.remove = function () {
        debugger;
        var newDataList = [];
        $scope.selectedAll = false;
        angular.forEach($scope.users, function (selected) {
            if (!selected.selected) {
                newDataList.push(selected);
            }
        });
        $scope.users = newDataList;
    };
    //$scope.edit = function (index) {
    //    //console.log("edit index" + index);
    //    $scope.enabledEdit[index] = true;
    //};
    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.users, function (user) {
            user.selected = $scope.selectedAll;
        });
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



    