'use strict';

function EquipmentCtrl($scope , $firebaseArray , Logs , ModalService, CONSTANTS) {
    var vm = this;
    vm.loaded = true;
    vm.equipmentRef = firebase.database().ref().child("Equipment");
    vm.equipment = $firebaseArray(vm.equipmentRef);
    vm.newEquipment = {};
    vm.editedEquipment;

    /////
    vm.addEquipment = addEquipment;
    vm.removeEquipment = removeEquipment;
    vm.editEquipment = editEquipment;
    vm.removeModal = removeModal;






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

    function removeModal(data){
        ModalService.showModal({
            appendElement:  $('.ui .dimmer .modals'),
            template: CONSTANTS.modalTemplates.remove,
            controller: function ($scope, close) {
                $scope.dismissModal = function (result) {
                    close(result, 200);
                };
            }
        }).then(function (modal) {
            $(modal.element).modal({closable:false}).modal('show');
            modal.close.then(function(result) {
                if (result){
                    removeEquipment(data);
                }
            });
        });
    }






}

EquipmentCtrl.$inject = ['$scope', '$firebaseArray' , 'Logs', 'ModalService', 'CONSTANTS'];
module.exports = EquipmentCtrl;