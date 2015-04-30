'use strict';

angular.module('credditApp')
	.factory('Auth', function($firebaseAuth, $firebase, $firebaseObject, FIREBASE_URL, $rootScope){
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
				authr.then(function(userData){
					$rootScope.$broadcast('$firebaseAuth:authWithPassword',userData);
				});
				return authr;
				

			},
			logout: function(){
				auth.$unauth();
				$rootScope.$broadcast('$firebaseAuth:unauth');
			
			},
			resolveUser: function(){
				return auth.$getAuth();
			},
			signedIn: function(){
				return !!auth.$getAuth();
			},
			user:{}
		};

		$rootScope.$on('$firebaseAuth:authWithPassword', function(e,user) {
    		console.log('logged in meeeooow');
   			angular.copy(user, Auth.user);
   			Auth.user.profile = $firebaseObject(ref.child('profile').child(Auth.user.uid));
   			console.log(Auth.user);
   			console.log(Auth.user.profile);
  		});
  		$rootScope.$on('$firebaseAuth:unauth', function() {
    		console.log('logged out');
    		if (Auth.user && Auth.user.profile){
    			Auth.user.profile.$destroy();
    		}
    		angular.copy({}, Auth.user);
  		});


		return Auth;
	});