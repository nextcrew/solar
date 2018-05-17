'use strict';

function CustomerCtrl($scope , $firebaseArray , Logs) {
    var vm = this;
    vm.loaded = true;
    vm.addCustomer = addCustomer;
    vm.editCustomer = editCustomer;
    vm.removeCustomer = removeCustomer;
    var date = new Date().getTime();
    vm.dummyKarnet = {
        typ:'Mini',
        wykorzystane:0,
        data_zalozenia:date
    };
    vm.customerref = firebase.database().ref().child("customers");
    vm.customers = $firebaseArray(vm.customerref);
    vm.newCustomer = {};



    ///Settings

    vm.settingsRef = firebase.database().ref().child("Settings");
    vm.settings = $firebaseArray(vm.settingsRef);





    ////

    function addCustomer(){

        $('.ui.addcustomer.modal').modal({
            closable  : false,
            onApprove : function() {
                vm.newCustomer.birthday = vm.newCustomer.birthday.format('DD-MM-YYYY');
                if(vm.newCustomer.ma_karnet){
                    vm.newCustomer.karnet = vm.dummyKarnet;
                }
                vm.customers.$add(vm.newCustomer);
                vm.newCustomer = {};
                Logs.addLog('Dodawanie', 'Dodano użytkownika do systemu');
            }
        }).modal('show');



        $('.ui.dropdown.karnet')
            .dropdown({
                onChange: function(value, text, $selectedItem) {
                    vm.dummyKarnet.typ = value;
                }
            });
    }

    function editCustomer(customer){
        vm.editedCustomer = customer;

        $('.ui.editcustomer.modal').modal({
            closable  : false,
            onApprove : function() {
                vm.customers.$save(vm.editedCustomer);
                vm.editedCustomer = {};
            }
        }).modal('show');


        $('#date-time-edit-customer').calendar({
            type: 'date',
            onChange: function (date, text, mode) {
                vm.editedCustomer.birthday = text;
            }
        });
    }

    function removeCustomer(customer){
        vm.customers.$remove(customer);
    }
}

CustomerCtrl.$inject = ['$scope', '$firebaseArray' , 'Logs'];
module.exports = CustomerCtrl;