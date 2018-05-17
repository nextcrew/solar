'use strict';

module.exports = angular.module('common.elements.adminMenu', [])
    .directive('adminMenu', function() {
        return {
            template: require('./admin-menu.html'),
            restrict: 'EA',
            replace: true
        };
    });