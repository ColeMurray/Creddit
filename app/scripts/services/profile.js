'use strict';

angular.module('credditApp')
	.factory('Profile', function ($firebaseArray, $firebaseObject,FIREBASE_URL, Post, $q){
		var ref = new Firebase(FIREBASE_URL);

		var Profile = {
			get: function(userId){
				return $firebaseObject(ref.child('profile').child(userId));
			},
			getPosts: function(userId){
				var defer = $q.defer();

				$firebaseArray(ref.child('_userposts').child(userId)).$loaded().then(function(data){
					var posts = {};
					for (var i = 0; i< data.length; i++){
						var value = data[i].$value;
						var post = Post.get(value);
						posts[value] = post;
						
						
					}
					defer.resolve(posts);

				});
				return defer.promise;
			}
		};
		return Profile;
	});