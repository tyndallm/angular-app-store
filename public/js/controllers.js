'use strict';

/* Controllers */



function AppListCtrl($scope, $location, $http) {

	//$scope.apps = $resource('../api/apps',{callback:'JSON_CALLBACK'},{get:{method:'JSONP'}});
	$scope.fetch = function() {
		$http({method: 'GET', url: '../api/apps'}).
		  success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.appList = data;
		    console.log($scope.appList);
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log("problemo...");
		});
	};

	$scope.fetch();
	

}

function MyModalCtrl($scope, $location, $http) {

	$scope.addApp = function(appName, appClient, appDescription, appPlatform) {
		console.log("adding App");
	    $http({ url: '../api/app',
				method: 'POST',
				data: { "client": appClient,
						"name": appName,
						"description": appDescription,
						"icon_url": appIcon,
						"platform": appPlatform }
		}).success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.data = data;
		    console.log($scope.data);
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    $scope.status = status;
		    console.log($scope.status);
		});
  	};

}

function AppDetailCtrl($scope, $location, $http, $routeParams) {
	$scope.appId = $routeParams.app;
	console.log("$scope.appId: ", $scope.appId);

	$scope.fetchApp = function(id) {
		$http({ url: '../api/app/' + id,
				method: 'GET',
		}).success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.app = data[0];
		    console.log($scope.app);
		    $scope.setFields($scope.app);
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    $scope.status = status;
		    console.log("Error: ", $scope.status);
		});
	};

	$scope.setFields = function(app){
		$scope.appName = app.name;
		$scope.appClient = app.client;
		$scope.appDescription = app.description;
		$scope.appPlatform = app.platform;
		$scope.appIcon = app.icon_url;
	};

	$scope.updateApp = function(appName, appClient, appDescription, appIcon, appPlatform) {
		console.log("updateApp: appId: ", $scope.appId);
		$http({ url: '../api/app/' + $scope.appId,
				method: 'PUT',
				data: { "client": appClient,
						"name": appName,
						"description": appDescription,
						"icon_url": appIcon,
						"platform": appPlatform }
		}).success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.data = data;
		    console.log($scope.data);
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    $scope.status = status;
		    console.log($scope.status);
		});

	}

	$scope.fetchApp($scope.appId);
}

function AppStoreCtrl($scope, $location, $http) {

	$scope.fetch = function() {
		$http({method: 'GET', url: '../api/apps'}).
		  success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.appList = data;
		    console.log($scope.appList);
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log("problemo...");
		});
	};

	$scope.fetch();

}

function NavbarController($scope, $location) {

  $scope.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

};

