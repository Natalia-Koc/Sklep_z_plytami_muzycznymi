var app = angular.module('main', ["ngRoute"])

app.config(function($routeProvider) {
    $routeProvider.when('/home', {
        resolve: {
            check: function($location, user) {
                if(!user.isUserLoggedIn()) {
                    $location.path('/');
                }
            }
        },
        templateUrl: './components/home.html',
        controller: 'homeController'
    }).when('/', {
        templateUrl:'./components/login.html',
        controller: 'loginController'
    }).when('/register', {
        templateUrl:'./components/register.html',
        controller: 'registerController'
    }).when('/saved', {
        templateUrl:'./components/saved.html',
        controller: 'savedController'
    }).when('/details', {
        resolve: {
            check: function($location, user) {
                if(!user.isUserLoggedIn()) {
                    $location.path('/');
                }
            }
        },
        templateUrl:'./components/details.html',
        controller: 'detailsController'
    }).when('/addNew', {
        resolve: {
            check: function($location, user) {
                if(!user.isUserLoggedIn()) {
                    $location.path('/');
                }
            }
        },
        templateUrl:'./components/addNew.html',
        controller: 'addNewController'
    }).otherwise({
        template:'404'
    })
});

app.service('user', function() {
    var username;
    var loggedin = false;
    var id;
    var idP;

    this.setName = function(name) {
        username = name;
    };
    this.getName = function() {
        return username;
    };

    this.setID = function(userID) {
        id = userID;
    };
    this.getID = function() {
        return id;
    };

    this.setIDP = function(productID) {
        idP = productID;
    };
    this.getIDP = function() {
        return idP;
    };

    this.isUserLoggedIn = function() {
        return loggedin;
    };
    this.userLoggedIn = function() {
        loggedin = true;
    };
})


app.controller('homeController', function($scope, user, $location) {
    $scope.user = user.getName();
    $scope.goToLogin = function() {
        $location.path('/');
    };
    $scope.addNew = function() {
        $location.path('/addNew');
    };
    $scope.start = function() {
        $location.path('/home');
    };
})

app.controller('crudController', function($scope, user, $location) {
    $scope.user = user.getName();
    $scope.goToLogin = function() {
        $location.path('/');
    };
    $scope.addNew = function() {
        $location.path('/addNew');
    };
    $scope.start = function() {
        $location.path('/home');
    };
})

app.controller('loginController', function($scope, $http, $location, user) {
    $scope.login = function() {
        var username = $scope.username;
        var password = $scope.password;
        $http({
            url: 'http://localhost/PROJEKT/server/login.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'username='+username+'&password='+password
        }).then(function(response) {
            if(response.data.status == 'loggedin') {
                user.userLoggedIn();
                user.setName(response.data.user);
                $location.path('/home');
            } else {
                alert('invalid login');
            }
        })
    }
    $scope.goToRegister = function() {
        $location.path('/register');
    }
});

app.controller('registerController', function($scope, $http, $location) {
    $scope.register = function() {
        var username = $scope.username;
        var password = $scope.password;
        $http({
            url: 'http://localhost/PROJEKT/server/register.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'username='+username+'&password='+password
        }).then(function(response) {
            if(response.data.status == 'registered') {
                $location.path('/');
                alert('Registered!');
            } else {
                alert('invalid register');
            }
        })
    }
    
    $scope.login = function() {
        $location.path('/');
    };
});

app.controller('addNewController', function($scope, $http, $location) {
    $scope.save = function() {
        var title = $scope.title;
        var artist = $scope.artist;
        var releaseDate = $scope.releaseDate;
        var price = $scope.price;
        var quantity = $scope.quantity;
        $http({
            url: 'http://localhost/PROJEKT/server/addNew.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'title='+title
                +'&artist='+artist
                +'&releaseDate='+releaseDate
                +'&price='+price
                +'&quantity='+quantity
        }).then(function(response) {
            if(response.data.status == 'saved') {
                $location.path('/saved');
            } else {
                alert('invalid saved');
                console.log(response);
            }
        })
    }
    
    $scope.back = function() {
        $location.path('/home');
    };
});

app.controller('savedController', function($scope, $http, $location) {
    $scope.goToLogin = function() {
        $location.path('/');
    };
    $scope.addNew = function() {
        $location.path('/addNew');
    };
    $scope.start = function() {
        $location.path('/home');
    };
});

app.controller('customersCtrl', function($scope, user, $http, $location) {
    console.log("jestem w kontrolerze");
    $http.get("server/fetch_data.php").then(function (response) {
        $scope.names = response.data.records;
        console.log($scope.names);
    });
    $scope.delete = function(id) {
        $http({
            url: 'http://localhost/PROJEKT/server/delete.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'id='+id
        }).then(function(response) {
            if(response.data.status == 'deleted') {
                $http.get("server/fetch_data.php").then(function (response) {
                    $scope.names = response.data.records;
                    console.log($scope.names);
                });
                $location.path('/home');
                console.log(response);
            } else {
                console.log(response);
                alert('invalid deleted');
            }
            console.log(id);
        })
    };
    $scope.details = function(id) {
        user.setIDP(id);
        $location.path('/details');
    }
 });
 
app.controller('detailsController', function($scope, user, $http, $location) {
    $http({
        url: 'http://localhost/PROJEKT/server/details.php',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'id='+user.getIDP()
    }).then(function (response) {
        console.log(response.data.record);
        console.log(response.data.dane);
        $scope.record = response.data.record;
    })
});