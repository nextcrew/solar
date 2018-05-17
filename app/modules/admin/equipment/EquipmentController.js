'use strict';

function EquipmentCtrl($scope , $firebaseArray , Logs) {
    var vm = this;
    vm.loaded = true;
    vm.equipmentRef = firebase.database().ref().child("Equipment");
    vm.equipment = $firebaseArray(vm.equipmentRef);
    vm.newEquipment = {};
    vm.editedEquipment;

    /////
    vm.addEquipment = addEquipment;
    vm.removeEquipment = removeEquipment;
    vm.editEquipment = editEquipment






    ////

    function addEquipment(){

        $('.ui.addEquipment.modal').modal({
            closable  : false,
            onApprove : function() {
                vm.equipment.$add(vm.newEquipment);
                vm.newEquipment = {};
                Logs.addLog('Dodawanie', 'Dodano nowy sprzęt do systemu');
            }
        }).modal('show');

        $('.ui.dropdown')
            .dropdown({
                onChange: function(value, text, $selectedItem) {
                    vm.newEquipment.typ = value;
                }
            });
    }

    function removeEquipment(eq){
        vm.equipment.$remove(eq);
        Logs.addLog('Usuwanie', 'Usunięto sprzęt z systemu');
    }

    function editEquipment(eq){
        vm.editedEquipment = eq;

        $('.ui.dropdown.edited')
            .dropdown({
                onChange: function(value, text, $selectedItem) {
                    vm.editedEquipment.typ = value;
                }
            });

        $('.ui.editEquipment.modal').modal({
            closable  : false,
            onApprove : function() {
                vm.equipment.$save(vm.editedEquipment);
                vm.editedEquipment = {};
                Logs.addLog('Aktualizacja', 'Zaktualizowano informacje o sprzęcie');
            }
        }).modal('show');
    }






}

EquipmentCtrl.$inject = ['$scope', '$firebaseArray' , 'Logs'];
module.exports = EquipmentCtrl;