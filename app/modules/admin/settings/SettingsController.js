'use strict';

function SettingsCtrl($scope , $firebaseArray , Logs) {
    var vm = this;
    vm.loaded = true;
    vm.settingsRef = firebase.database().ref().child("Settings");
    vm.settings = $firebaseArray(vm.settingsRef);
    vm.newSetting = {};
    /////
    vm.addEquipment = addEquipment;
    vm.removeEquipment = removeEquipment;





    ////

    function addEquipment(){

        $('.ui.addSetting.modal').modal({
            closable  : false,
            onApprove : function() {
                vm.settings.$add(vm.newSetting);
                vm.newSetting = {};
                Logs.addLog('Dodawanie', 'Dodano nowe ustawienie do systemu');
            }
        }).modal('show');
    }

    function removeEquipment(eq){
        vm.settings.$remove(eq);
        Logs.addLog('Usuwanie', 'Usunięto ustawienie z systemu');
    }






}

SettingsCtrl.$inject = ['$scope', '$firebaseArray' , 'Logs'];
module.exports = SettingsCtrl;