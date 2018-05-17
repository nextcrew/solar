'use strict';

module.exports = function loginDirective() {
    return {
        controller: 'LoginCtrl', // Called from LoginController.js
        controllerAs: 'vm',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./login.html')
    };
};