'use strict';
// DashboardView
module.exports = angular.module('modules.pages.equipment', [])
    .directive('equipmentView', require('./equipmentDirective'))
    .controller('EquipmentCtrl', require('./EquipmentController'));