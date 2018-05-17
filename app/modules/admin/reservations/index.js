'use strict';
// DashboardView
module.exports = angular.module('modules.pages.reservations', [])
    .directive('reservationsView', require('./reservationsDirective'))
    .controller('ReservationsCtrl', require('./ReservationsController'));