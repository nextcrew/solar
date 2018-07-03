'use strict';

function UserprofileCtrl($scope , $firebaseArray , Logs, $stateParams) {
    var vm = this;
    vm.loaded = true;
    vm.profile = $stateParams.profile;
    vm.getUserReservation = getUserReservation;

    if (vm.profile === null){
        vm.loaded = false;
    }




    vm.reservationRef = firebase.database().ref().child("Reservations");
    vm.reservations = $firebaseArray(vm.reservationRef );



    vm.settingsRef = firebase.database().ref().child("Settings");
    vm.settings = $firebaseArray(vm.settingsRef);
    vm.newSetting = {};


    function getUserReservation(customer){
        return _.slice(_.filter(vm.reservations, {'customer':customer.$id}),0,3);
    }




}

UserprofileCtrl.$inject = ['$scope', '$firebaseArray' , 'Logs', '$stateParams'];
module.exports = UserprofileCtrl;