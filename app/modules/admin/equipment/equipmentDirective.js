'use strict';

module.exports = function equipmentDirective() {
    return {
        controller: 'EquipmentCtrl',
        controllerAs: 'vm',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./equipment.html')
    };
};