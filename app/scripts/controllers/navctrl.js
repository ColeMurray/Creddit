'use strict';

angular.module('credditApp')
	.controller('NavCtrl', function($scope,Post, Profile,$location,Auth){
		$scope.signedIn = Auth.signedIn;
		$scope.logout = Auth.logout;
		$scope.user = Auth.resolveUser();
		$scope.user.profile = Profile.get($scope.user.uid);

		$scope.post = {url : 'http://', title: ''};

		$scope.submitPost = function(post){
			console.log($scope.user);
			$scope.post.creator = $scope.user.profile.username;
			$scope.post.creatorUID = $scope.user.uid;
			Post.create(post).then( function(ref){
				$location.path('/posts/' + ref.name());
				$scope.post = {url: 'http://', title:''};
			});
		};
	});