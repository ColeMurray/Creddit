'use strict';

angular.module('credditApp')
	.filter('uidfilter', function(){
		return function(str){
			if (!str){
				return str;
			}
			var split = str.split(':');
			return split[1];
		};
	});