'use strict';
// Controller naming conventions should start with an uppercase letter
function HomeCtrl($scope, $firebaseObject, Auth) {
    var vm = this;
    vm.user = Auth.$getAuth();


}

// $inject is necessary for minification. See http://bit.ly/1lNICde for explanation.
HomeCtrl.$inject = ['$scope','$firebaseObject' ,'Auth'];
module.exports = HomeCtrl;