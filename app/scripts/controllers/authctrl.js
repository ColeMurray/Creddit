'use strict';

angular.module('credditApp')
	.controller('AuthCtrl', function($scope, $location, Auth, user){
		if (user){
			$location.path('/');
		}

		$scope.register = function(){
			Auth.register($scope.user).then(function(user){
				console.log('Successful register');
				return Auth.login($scope.user).then(function(){
					user.username = $scope.user.username;
					return Auth.createProfile(user);
				}).then(function(){
					$location.path('/');
				});
			}, function(error){
				$scope.error= error.toString();
			});
		};

		$scope.login = function(){
			Auth.login($scope.user).then(function(userData){
				console.log(userData.uid);
				$location.path('/');
			}, function(error){
				$scope.error = error.toString();
			});
		};
	});