'use strict';
// DashboardView
module.exports = angular.module('modules.pages.dashboard', [])
    .directive('dashboardView', require('./dashboardDirective'))
    .controller('DashboardCtrl', require('./DashboardController'));