'use strict';

function PassesCtrl($scope , $firebaseArray , Logs) {
    var vm = this;
    vm.loaded = true;
    vm.addPass = addPass;
    vm.editCustomer = editCustomer;
    vm.removeCustomer = removeCustomer;
    vm.dateFormat = dateFormat;
    vm.customerref = firebase.database().ref().child("customers");
    vm.customers = $firebaseArray(vm.customerref);

    vm.passes = _.each(vm.customers , function(customer){
        if (customer.ma_karnet){
            return customer;
        }
    });




    ///Settings

    vm.settingsRef = firebase.database().ref().child("Settings");
    vm.settings = $firebaseArray(vm.settingsRef);





    ////

    function addPass(){

        $('.ui.addpass.modal').modal({
            closable  : false,
            onApprove : function() {
                if(vm.newCustomer.ma_karnet){
                    vm.newCustomer.karnet = vm.dummyKarnet;
                    vm.newCustomer.test = [{
                        test:'test'
                    }];
                }
                vm.customers.$add(vm.newCustomer);
                vm.newCustomer = {};
                Logs.addLog('Dodawanie', 'Dodano użytkownika do systemu');
            }
        }).modal('show');


        $('#date-time-new-customer').calendar({
            type: 'date',
            onChange: function (date, text, mode) {
                vm.newCustomer.birthday = text;
            }
        });


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

    function dateFormat(date){
        return moment(parseInt(date)).format('DD/MM/YYYY');
    }
}

PassesCtrl.$inject = ['$scope', '$firebaseArray' , 'Logs'];
module.exports = PassesCtrl;