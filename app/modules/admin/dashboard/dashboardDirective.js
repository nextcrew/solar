'use strict';

module.exports = function dashboardDirective() {
    return {
        controller: 'DashboardCtrl',
        controllerAs: 'vm',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./dashboard.html')
    };
};