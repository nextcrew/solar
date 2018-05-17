'use strict';
// DashboardView
module.exports = angular.module('modules.pages.customer', [])
    .directive('customerView', require('./customerDirective'))
    .controller('CustomerCtrl', require('./CustomerController'));