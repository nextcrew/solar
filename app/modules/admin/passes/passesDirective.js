'use strict';

module.exports = function passesDirective() {
    return {
        controller: 'PassesCtrl',
        controllerAs: 'vm',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./passes.html')
    };
};