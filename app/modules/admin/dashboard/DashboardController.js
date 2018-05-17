'use strict';

function DashboardCtrl($scope, Logs , $firebaseArray , Notifications) {

    var vm = this;
    vm.fromNow = fromNow;
    vm.init = init;
    vm.bumpStep = bumpStep;
    vm.openCheck = openCheck;
    vm.cancel = cancel;
    vm.accept = accept;
    vm.logs = Logs.getLog().reverse();
    vm.startDate = moment().format('HH:mm');
    vm.endDate = false;
    vm.confirmation = {};
    vm.config = {
        gotowka:'gotowka',
        karnet:'karnet'
    };
    vm.platnosc = null;


    vm.cooldown = 5;


    vm.stepActive = 1;

    vm.wizytaConfig ={
        anonim:false,
        customer:false,
        lozko:false
    };

    vm.customerref = firebase.database().ref().child("customers");
    vm.customers = $firebaseArray(vm.customerref);

    vm.reservationRef = firebase.database().ref().child("Reservations");
    vm.reservations = $firebaseArray(vm.reservationRef );

    vm.equipmentRef = firebase.database().ref().child("Equipment");
    vm.equipment = $firebaseArray(vm.equipmentRef);

    vm.passes = _.each(vm.customers , function(customer){
        if (customer.ma_karnet){
            return customer;
        }
    });




    function fromNow(date){
        moment.locale('pl');
        return moment(date).fromNow();
    }

    function init(){
        $('.wizyta_customers').search({
            source: vm.customers,
            searchFields:[
                'name','surname'
            ],
            fields: {
                title : 'name',
                description: 'surname',
                price:'address'
            },
            onSelect:function(result, response){
                vm.wizytaConfig.customer = result.$id;
            }
        });

    }

    function bumpStep(step){
        vm.stepActive = step+1;
        if (vm.stepActive === 3){
            if(!vm.wizytaConfig.anonim){
                vm.confirmation.customer = _.filter(vm.customers,{'$id':vm.wizytaConfig.customer});

            }
            vm.confirmation.lozko = _.filter(vm.equipment,{'$id':vm.wizytaConfig.lozko});
        }
    }

    ////////////////////////

    vm.watcher = $scope.$watch(function(){
        return vm.customers;
    }, function (newValue, oldValue) {
        if(newValue !== oldValue) {
            init();
        }
    }, true);


    setInterval(function(){
        if(vm.stepActive === 1){
            vm.startDate = moment().format('HH:mm');
            vm.startDateConfig = moment().format('x');
            if (vm.czasOpalania){
                vm.startDateWithCooldownConfig = moment().add(vm.cooldown,'minutes');
                vm.startDateWithCooldown = moment().add(vm.cooldown,'minutes').format('HH:mm');
                vm.endDateConfig = moment(vm.startDateWithCooldownConfig).add(vm.czasOpalania,'minutes');
                vm.endDate = moment(vm.startDateWithCooldownConfig).add(vm.czasOpalania,'minutes').format('HH:mm');
                vm.coolDownDate = moment(vm.endDateConfig).add(vm.cooldown,'minutes').format('HH:mm');
                vm.coolDownDateConfig = moment(vm.endDateConfig).add(vm.cooldown,'minutes').format('x');
            }
        }

    },10);

    function openCheck(){
        // $('.ui.radio.checkbox').checkbox({onChecked: function(value) {
        //     console.log(value);
        // }});
    }

    function cancel(){
        vm.wizytaConfig ={
            anonim:false,
            customer:false,
            lozko:false
        };

        vm.stepActive = 1;
        vm.czasOpalania = false;
    }


    function accept(){
        var end = vm.coolDownDateConfig;
        var startDate = vm.startDateConfig;
        if (vm.wizytaConfig.customer){
            var dummyReservation = {
                customer:vm.confirmation.customer[0].$id,
                end: end,
                lozko:vm.confirmation.lozko[0].$id,
                start: startDate,
                status: 'Wykonana'
            };

            vm.reservations.$add(dummyReservation);
            Logs.addLog('Dodawanie', 'Dodano nową wizyte dla klienta '+vm.confirmation.customer[0].name+' '+ vm.confirmation.customer[0].surname +' na łóżku ' + vm.confirmation.lozko[0].name);
            Notifications.success('Dodano nową wizyte dla klienta '+vm.confirmation.customer[0].name+' '+ vm.confirmation.customer[0].surname +' na łóżku ' + vm.confirmation.lozko[0].name);
        } else {
            var dummyReservation = {
                customer:'Anonimowy Klient',
                end: end,
                lozko:vm.confirmation.lozko[0].$id,
                start: startDate,
                status: 'Wykonana'
            };

            vm.reservations.$add(dummyReservation);
            Logs.addLog('Dodawanie', 'Dodano nową wizyte dla Anonimowy Klient na łóżku ' + vm.confirmation.lozko[0].name);
            Notifications.success('Dodano nową wizyte dla Anonimowy Klient na łóżku ' + vm.confirmation.lozko[0].name);
        }


        vm.wizytaConfig ={
            anonim:false,
            customer:false,
            lozko:false
        };

        vm.stepActive = 1;
        vm.czasOpalania = false;


    }


    init();

    $scope.$on('destroy',function(){
        vm.watcher();
    })


}

DashboardCtrl.$inject = ['$scope','Logs' , '$firebaseArray' , 'Notifications'];
module.exports = DashboardCtrl;