'use strict';

module.exports = angular.module('modules',
    [
        require('./home').name,
        require('./login').name,
        require('./admin').name
    ])
    .controller('MainCtrl', require('./MainController'));