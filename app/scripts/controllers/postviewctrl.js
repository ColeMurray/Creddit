'use strict';

angular.module('credditApp')
	.controller('PostViewCtrl', function ($scope,$routeParams, Post){
		$scope.post = Post.get($routeParams.postId);
	});