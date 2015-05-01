'use strict';

angular.module('credditApp')
	.controller('PostCtrl', function ($scope, Post, $location, Auth){
		$scope.posts = Post.all;
		$scope.user = Auth.user;

		$scope.post = { url : 'http://', 'title' : ''};

		$scope.submitPost = function(){
			Post.create($scope.post).then(function(ref){
				$location.path('/posts/' + ref.key());

			});
		};

		$scope.deletePost = function(post){
			Post.delete(post);
		};
	});