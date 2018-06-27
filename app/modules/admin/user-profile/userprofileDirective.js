'use strict';

module.exports = function userprofileDirective() {
    return {
        controller: 'UserprofileCtrl',
        controllerAs: 'vm',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./user-profile.html')
    };
};