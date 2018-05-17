'use strict';
// Controller naming conventions should start with an uppercase letter
function LoginCtrl($scope , $firebaseAuth, $state , Notifications) {
    var vm = this;
    vm.auth = $firebaseAuth();
    vm.username = '';
    vm.password = '';
    vm.login = login;


    /////
    function login(){
        vm.auth.$signInWithEmailAndPassword(vm.username,vm.password).then(function(firebaseUser) {
            console.log(firebaseUser);
            $state.go("admin.dashboard");
        }).catch(function(error) {
            Notifications.error(error);
        });
    }



}

// $inject is necessary for minification. See http://bit.ly/1lNICde for explanation.
LoginCtrl.$inject = ['$scope','$firebaseAuth','$state','Notifications'];
module.exports = LoginCtrl;