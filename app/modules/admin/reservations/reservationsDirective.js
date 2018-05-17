'use strict';

module.exports = function reservationsDirective() {
    return {
        controller: 'ReservationsCtrl',
        controllerAs: 'vm',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./reservations.html')
    };
};