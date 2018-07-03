'use strict';

function PassesCtrl($scope , $firebaseArray , Logs) {
    var vm = this;
    vm.loaded = true;
    vm.addPass = addPass;
    vm.editPass = editPass;
    vm.removeCustomer = removeCustomer;
    vm.dateFormat = dateFormat;
    vm.calculateRemain = calculateRemain;
    vm.removePass = removePass;
    vm.customerref = firebase.database().ref().child("customers");
    vm.customers = $firebaseArray(vm.customerref);
    vm.error = false;
    vm.nowyKarnet = {};

    ///Settings

    vm.settingsRef = firebase.database().ref().child("Settings");
    vm.settings = $firebaseArray(vm.settingsRef);

    ////

    vm.searchConfig = {
        searchFields:[
            'name','surname'
        ],
        fields: {
            title : 'name',
            description: 'surname',
            price:'address'
        },
        onSelect:function(result, response){
            vm.error = result.ma_karnet;
            vm.userid = result.$id;
            return true;
        }
    };



    function calculateRemain(customer){
        if (customer.ma_karnet){
            return _.find(vm.settings, { 'name':customer.karnet.typ}).minuty - customer.karnet.wykorzystane;
        }
        return '';
    }

    function addPass(){

        $('.ui.addpass.modal').modal({
            closable  : false,
            onApprove : function() {
                vm.nowyKarnet = vm.customers.$getRecord(vm.userid);
                vm.nowyKarnet.ma_karnet = true;
                vm.nowyKarnet.karnet = {
                    'data_zalozenia': new Date().getTime(),
                    'wykorzystane':0,
                    'typ':vm.typ
                };
                vm.customers.$save(vm.nowyKarnet);
                Logs.addLog('Dodawanie', 'Dodano nowy karnet do systemu dla klienta ' +vm.nowyKarnet.name+' '+vm.nowyKarnet.surname);
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

    function editPass(customer){
        vm.editedCustomer = customer;
        $('.ui.editpass.modal').modal({
            closable  : false,
            onApprove : function() {
                vm.editedCustomer.karnet.data_zalozenia = new Date().getTime();
                vm.editedCustomer.karnet.wykorzystane = 0;
                vm.customers.$save(vm.editedCustomer);
                Logs.addLog('Edycja', 'Edytowano karnet dla klienta ' +vm.editedCustomer.name+' '+vm.editedCustomer.surname);
                vm.editedCustomer = {};

            }
        }).modal('show');
    }

    function removePass(customer){
        delete customer.karnet;
        delete customer.ma_karnet;
        vm.customers.$save(customer);
    }

    function removeCustomer(customer){
        Logs.addLog('Usuniecie', 'Usunięto karnet dla klienta ' +customer.name+' '+customer.surname);
        vm.customers.$remove(customer);

    }

    function dateFormat(date){
        return moment(parseInt(date)).format('DD/MM/YYYY');
    }
}

PassesCtrl.$inject = ['$scope', '$firebaseArray' , 'Logs'];
module.exports = PassesCtrl;