'use strict';

function ReservationsCtrl($scope , $firebaseArray , Logs) {
    var vm = this;
    vm.loaded = true;
    vm.equipRef = firebase.database().ref().child("Equipment");
    vm.reservationRef = firebase.database().ref().child("Reservations");
    vm.reservations = $firebaseArray(vm.reservationRef );

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


    $scope.$watch(function(){
        return vm.startDate;
    }, function (newValue, oldValue) {
        if (newValue) {
            $('.timetable').empty();
            prepareData(newValue);
        }
    }, true);



    function init(){
        $('.ui.dropdown.lozko')
            .dropdown({
                onChange: function(value, text, $selectedItem) {
                    //vm.dummyKarnet.typ = value;
                }
            });


        prepareData();
    }



    setTimeout(function(){
        init();
    },2000);


    //////////////////

    function prepareData(filter){
        var data = moment();
        if (filter) data = filter;
        var timetable = new Timetable();
        timetable.setScope(9, 20); // optional, only whole hours between 0 and 23

        if(vm.Locations.length === 0){
            _.each(vm.equipment,function(equip){
                vm.Locations.push(equip.name);
            });
        }
        timetable.addLocations(vm.Locations);
        _.each(vm.reservations,function(reservation){
            var dummydata = moment(parseInt(reservation.start)).format();
            if(moment(data).isSame(dummydata, 'day')){
                var customer = _.find(vm.customers,{'$id':reservation.customer});
                var equipment = _.find(vm.equipment,{'$id':reservation.lozko});
                timetable.addEvent(customer.name+' '+customer.surname, equipment.name, new Date(parseInt(reservation.start)), new Date(parseInt(reservation.end)));
            }

        });


        var renderer = new Timetable.Renderer(timetable);
        renderer.draw('.timetable'); // any css selector
    }

    function createReservation(){
        vm.startDate = moment();
        vm.endDate = moment().add(2, 'm');

        $('.ui.addReservation.modal').modal({
            closable  : false,
            onApprove : function() {
                vm.reservations.$add(vm.newReservation);
                Logs.addLog('Dodawanie', 'Dodano nową rezerwacje');
                vm.newReservation = {
                    customer:null,
                    status:null,
                    lozko:null,
                    start:null,
                    end:null
                };
                $('.timetable').empty();
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


    /*jshint -W079*/

    'use strict';

    var Timetable = function() {
        this.scope = {
            hourStart: 9,
            hourEnd: 17
        };
        this.locations = [];
        this.events = [];
    };

    Timetable.Renderer = function(tt) {
        if (!(tt instanceof Timetable)) {
            throw new Error('Initialize renderer using a Timetable');
        }
        this.timetable = tt;
    };

    (function() {
        function isValidHourRange(start, end) {
            return isValidHour(start) && isValidHour(end);
        }
        function isValidHour(number) {
            return isInt(number) && isInHourRange(number);
        }
        function isInt(number) {
            return number === parseInt(number, 10);
        }
        function isInHourRange(number) {
            return number >= 0 && number < 24;
        }
        function locationExistsIn(loc, locs) {
            return locs.indexOf(loc) !== -1;
        }
        function isValidTimeRange(start, end) {
            var correctTypes = start instanceof Date && end instanceof Date;
            var correctOrder = start < end;
            return correctTypes && correctOrder;
        }
        function getDurationHours(startHour, endHour) {
            return endHour >= startHour ? endHour - startHour : 24 + endHour - startHour;
        }

        Timetable.prototype = {
            setScope: function(start, end) {
                if (isValidHourRange(start, end)) {
                    this.scope.hourStart = start;
                    this.scope.hourEnd = end;
                } else {
                    throw new RangeError('Timetable scope should consist of (start, end) in whole hours from 0 to 23');
                }

                return this;
            },
            addLocations: function(newLocations) {
                function hasProperFormat() {
                    return newLocations instanceof Array;
                }

                var existingLocations = this.locations;

                if (hasProperFormat()) {
                    newLocations.forEach(function(loc) {
                        if (!locationExistsIn(loc, existingLocations)) {
                            existingLocations.push(loc);
                        } else {
                            throw new Error('Location already exists');
                        }
                    });
                } else {
                    throw new Error('Tried to add locations in wrong format');
                }

                return this;
            },
            addEvent: function(name, location, start, end, options) {
                if (!locationExistsIn(location, this.locations)) {
                    throw new Error('Unknown location');
                }
                if (!isValidTimeRange(start, end)) {
                    throw new Error('Invalid time range: ' + JSON.stringify([start, end]));
                }

                var optionsHasValidType = Object.prototype.toString.call(options) === '[object Object]';

                this.events.push({
                    name: name,
                    location: location,
                    startDate: start,
                    endDate: end,
                    options: optionsHasValidType ? options : undefined
                });

                return this;
            }
        };

        function emptyNode(node) {
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
        }

        function prettyFormatHour(hour) {
            var prefix = hour < 10 ? '0' : '';
            return prefix + hour + ':00';
        }

        Timetable.Renderer.prototype = {
            draw: function(selector) {
                function checkContainerPrecondition(container) {
                    if (container === null) {
                        throw new Error('Timetable container not found');
                    }
                }
                function appendTimetableAside(container) {
                    var asideNode = container.appendChild(document.createElement('aside'));
                    var asideULNode = asideNode.appendChild(document.createElement('ul'));
                    appendRowHeaders(asideULNode);
                }
                function appendRowHeaders(ulNode) {
                    for (var k=0; k<timetable.locations.length; k++) {
                        var liNode = ulNode.appendChild(document.createElement('li'));
                        var spanNode = liNode.appendChild(document.createElement('span'));
                        spanNode.className = 'row-heading';
                        spanNode.textContent = timetable.locations[k];
                    }
                }
                function appendTimetableSection(container) {
                    var sectionNode = container.appendChild(document.createElement('section'));
                    var timeNode = sectionNode.appendChild(document.createElement('time'));
                    appendColumnHeaders(timeNode);
                    appendTimeRows(timeNode);
                }
                function appendColumnHeaders(node) {
                    var headerNode = node.appendChild(document.createElement('header'));
                    var headerULNode = headerNode.appendChild(document.createElement('ul'));

                    var completed = false;
                    var looped = false;

                    for (var hour=timetable.scope.hourStart; !completed;) {
                        var liNode = headerULNode.appendChild(document.createElement('li'));
                        var spanNode = liNode.appendChild(document.createElement('span'));
                        spanNode.className = 'time-label';
                        spanNode.textContent = prettyFormatHour(hour);

                        if (hour === timetable.scope.hourEnd && (timetable.scope.hourStart !== timetable.scope.hourEnd || looped)) {
                            completed = true;
                        }
                        if (++hour === 24) {
                            hour = 0;
                            looped = true;
                        }
                    }
                }
                function appendTimeRows(node) {
                    var ulNode = node.appendChild(document.createElement('ul'));
                    ulNode.className = 'room-timeline';
                    for (var k=0; k<timetable.locations.length; k++) {
                        var liNode = ulNode.appendChild(document.createElement('li'));
                        appendLocationEvents(timetable.locations[k], liNode);/**/
                    }
                }
                function appendLocationEvents(location, node) {
                    for (var k=0; k<timetable.events.length; k++) {
                        var event = timetable.events[k];
                        if (event.location === location) {
                            appendEvent(event, node);
                        }
                    }
                }
                function appendEvent(event, node) {
                    var hasOptions = event.options !== undefined;
                    var hasURL, hasAdditionalClass, hasDataAttributes = false;

                    if(hasOptions) {
                        hasURL = (event.options.url !== undefined) ? true : false;
                        hasAdditionalClass = (event.options.class !== undefined) ? true : false;
                        hasDataAttributes = (event.options.data !== undefined) ? true : false;
                    }

                    var elementType = hasURL ? 'a' : 'span';
                    var aNode = node.appendChild(document.createElement(elementType));
                    var smallNode = aNode.appendChild(document.createElement('small'));
                    aNode.title = event.name;

                    if (hasURL) {
                        aNode.href = event.options.url;
                    }
                    if(hasDataAttributes){
                        for (var key in event.options.data) {
                            aNode.setAttribute('data-'+key, event.options.data[key]);
                        }
                    }

                    aNode.className = hasAdditionalClass ? 'time-entry ' + event.options.class : 'time-entry';
                    aNode.style.width = computeEventBlockWidth(event);
                    aNode.style.left = computeEventBlockOffset(event);
                    smallNode.textContent = event.name;
                }
                function computeEventBlockWidth(event) {
                    var start = event.startDate;
                    var end = event.endDate;
                    var durationHours = computeDurationInHours(start, end);
                    return durationHours / scopeDurationHours * 100 + '%';
                }
                function computeDurationInHours(start, end) {
                    return (end.getTime() - start.getTime()) / 1000 / 60 / 60;
                }
                function computeEventBlockOffset(event) {
                    var scopeStartHours = timetable.scope.hourStart;
                    var eventStartHours = event.startDate.getHours() + (event.startDate.getMinutes() / 60);
                    var hoursBeforeEvent =  getDurationHours(scopeStartHours, eventStartHours);
                    return hoursBeforeEvent / scopeDurationHours * 100 + '%';
                }

                var timetable = this.timetable;
                var scopeDurationHours = getDurationHours(timetable.scope.hourStart, timetable.scope.hourEnd);
                var container = document.querySelector(selector);
                checkContainerPrecondition(container);
                emptyNode(container);
                appendTimetableAside(container);
                appendTimetableSection(container);
            }
        };

    })();




}

ReservationsCtrl.$inject = ['$scope', '$firebaseArray' , 'Logs'];
module.exports = ReservationsCtrl;