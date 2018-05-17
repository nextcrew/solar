'use strict';
// DashboardView
module.exports = angular.module('modules.pages.settings', [])
    .directive('settingsView', require('./settingsDirective'))
    .controller('SettingsCtrl', require('./SettingsController'));