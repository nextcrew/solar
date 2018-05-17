'use strict';

module.exports = function settingsDirective() {
    return {
        controller: 'SettingsCtrl',
        controllerAs: 'vm',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./settings.html')
    };
};