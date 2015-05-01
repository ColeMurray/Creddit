'use strict';

angular.module('credditApp')
	.factory('Auth', function($firebaseAuth, $firebase, $firebaseObject, FIREBASE_URL){
		var ref = new Firebase(FIREBASE_URL);
		var auth = $firebaseAuth(ref);

		var Auth = {
			register: function(user){
				return auth.$createUser(user);
			},
			createProfile: function(user){
				var profile = {
					username: user.username,
				};

				var profileRef = ref.child('profile/' + user.uid);
				return profileRef.set(profile);
			},
			login: function(user){
				var authr = auth.$authWithPassword(user);
				return authr;
			},
			logout: function(){
				auth.$unauth();
			
			},
			resolveUser: function(){
				return auth.$getAuth();
			},
			signedIn: function(){
				return !!auth.$getAuth();
			},
			user:{}
		};
		return Auth;
	});