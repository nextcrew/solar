'use strict';

module.exports = function customerDirective() {
    return {
        controller: 'CustomerCtrl',
        controllerAs: 'vm',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./customers.html')
    };
};