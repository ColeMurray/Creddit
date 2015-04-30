'use strict';

angular.module('credditApp')
	.controller('PostCtrl', function ($scope, Post, $location){
		$scope.posts = Post.all;

		$scope.post = { url : 'http://', 'title' : ''};

		$scope.submitPost = function(){
			Post.create($scope.post).then(function(ref){
				$location.path('/posts/' + ref.name());

			});
		};

		$scope.deletePost = function(post){
			Post.delete(post);
		};
	});