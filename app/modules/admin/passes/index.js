'use strict';
// DashboardView
module.exports = angular.module('modules.pages.passes', [])
    .directive('passesView', require('./passesDirective'))
    .controller('PassesCtrl', require('./PassesController'));