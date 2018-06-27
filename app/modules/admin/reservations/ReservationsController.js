'use strict';

function ReservationsCtrl($scope , $firebaseArray , Logs) {
    var vm = this;
    vm.loaded = true;
    vm.equipRef = firebase.database().ref().child("Equipment");
    vm.reservationRef = firebase.database().ref().child("Reservations");
    vm.reservations = $firebaseArray(vm.reservationRef );

    vm.hoursArray = _.range(9, 20);


    vm.equipment = $firebaseArray(vm.equipRef);
    vm.customerref = firebase.database().ref().child("customers");
    vm.customers = $firebaseArray(vm.customerref);
    vm.selectedCustomer = false;
    vm.Locations = [];
    vm.today = moment();
    vm.startDate = vm.today;


    vm.filters = {

    };




    vm.newReservation = {
        customer:null,
        status:'Nowa',
        lozko:null,
        start:null,
        end:null
    };
    /////

    vm.createReservation = createReservation;
    vm.calculateTimeBar = calculateTimeBar;
    vm.getReservationClass = getReservationClass;
    vm.formatReservationTimeStamp = formatReservationTimeStamp;
    vm.calculateHourPosition = calculateHourPosition;


    $scope.$watch(function(){
        return vm.startDate;
    }, function (newValue, oldValue) {
        if (newValue) {
            prepareData(newValue);
        }
    }, true);



    function init(){

    }



    //////////////////
    function formatReservationTimeStamp(timestamp){
        return moment(parseInt(timestamp)).format('HH:mm');
    }

    function calculateTimeBar(){
        var startDate = moment().hour(vm.hoursArray[0]).minute(0).valueOf();
        var endDate =  moment().hour(vm.hoursArray[vm.hoursArray.length-1]).minute(0).valueOf();
        var todayDate = moment().valueOf();

        var total = endDate - startDate;
        var current = todayDate - startDate;
        vm.percentage = (current / total )* 100;
    }

    function prepareData(filter){
        vm.momentHoursArray = [];
        _.each(vm.hoursArray,function(hour){
            vm.momentHoursArray.push({hour:moment.utc(hour*3600*1000).format('HH:mm'),hourString:hour , resevations:[]});
        });
        var data = moment();
        if (filter) data = filter;

        if(vm.Locations.length === 0){
            _.each(vm.equipment,function(equip){
                vm.Locations.push(equip.name);
            });
        }
        _.each(vm.reservations,function(reservation){
            var dummydata = moment(parseInt(reservation.start)).format();
            if(moment(data).isSame(dummydata, 'day')){
                var reserevationString =_.find(vm.momentHoursArray, function(hour){
                    var dummy = moment().hour(hour.hourString);
                    return moment(dummydata).hours() === dummy.hours();
                });

                if (reserevationString){
                    var customer = _.find(vm.customers,{'$id':reservation.customer});
                    var equipment = _.find(vm.equipment,{'$id':reservation.lozko});
                    var style = calculateHourPosition(reservation);
                    reserevationString.resevations.push({customer:customer, equipment:equipment ,reservation:reservation , style:style})
                }

            }
        });

    }


    function getReservationClass(reservation){
        switch (reservation.reservation.status){
            case 'Nowa':
                return 'teal';
                break;

            case 'Wykonana':
                return 'green';
                break;

            case 'Stara':
                return 'red';
                break;
        }

    }

    function calculateHourPosition(reservation){
        var full = 3600000;
        var start_position = parseInt(reservation.start);

        var end_position = parseInt(reservation.end);
        var Height = ((end_position - start_position) / full) * 100;
        var Top = (moment(parseInt(reservation.start)).minutes()/60)*100;
        return {
            top:Top+'%',
            height:Height+'%'
        }

    };

    function createReservation(){
        vm.startDate = moment();
        vm.endDate = moment().add(2, 'm');

        $('.ui.addReservation.modal').modal({
            closable  : false,
            onApprove : function() {
                vm.newReservation.start = vm.newReservation.start.valueOf();
                vm.newReservation.end = vm.newReservation.end.valueOf();
                vm.reservations.$add(vm.newReservation);
                Logs.addLog('Dodawanie', 'Dodano nową rezerwacje');
                vm.newReservation = {
                    customer:null,
                    status:null,
                    lozko:null,
                    start:null,
                    end:null
                };
                prepareData();
            }
        }).modal('show');


        $('.reservations_customers').search({
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
                vm.newReservation.customer = result.$id;
            }
        });

        $('.add_lozko')
            .dropdown({
                onChange: function(value, text, $selectedItem) {
                    vm.newReservation.lozko = value;
                }
            });

    }
    calculateTimeBar();
    setInterval(calculateTimeBar(),6000);




}

ReservationsCtrl.$inject = ['$scope', '$firebaseArray' , 'Logs'];
module.exports = ReservationsCtrl;