'use strict';

angular.module('credditApp')
	.factory('Post', function ($firebaseArray, $firebaseObject, FIREBASE_URL){
		var ref = new Firebase(FIREBASE_URL);
		var posts = $firebaseArray(ref.child('posts'));

		var Post = {
			all: posts,
			create: function (post){
				return posts.$add(post).then(function(postRef){
					$firebaseArray(ref.child('_userposts').child(post.creatorUID))
								.$add(postRef.key());
					return postRef;
				});
			},
			get: function(postId){
				return $firebaseObject((ref.child('posts')).child(postId));
			},
			delete: function (post){
				return posts.$remove(post);
			},
			comments: function(postId){
				return $firebaseArray((ref.child('comments')).child(postId));
			}
		
		};

		return Post;
	});
