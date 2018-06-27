'use strict';

function UserprofileCtrl($scope , $firebaseArray , Logs, $stateParams) {
    var vm = this;
    vm.loaded = true;
    vm.profile = $stateParams.profile;

    if (vm.profile === null){
        vm.loaded = false;
    }

    console.log(vm.profile);


    vm.reservationRef = firebase.database().ref().child("Reservations");
    vm.reservations = $firebaseArray(vm.reservationRef );




    vm.customerReservations = _.find(vm.reservations, {'customer':vm.profile.$id});


    vm.settingsRef = firebase.database().ref().child("Settings");
    vm.settings = $firebaseArray(vm.settingsRef);
    vm.newSetting = {};



}

UserprofileCtrl.$inject = ['$scope', '$firebaseArray' , 'Logs', '$stateParams'];
module.exports = UserprofileCtrl;