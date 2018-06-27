'use strict';

module.exports = angular.module('modules.admin', [
        require('./dashboard').name,
        require('./customers').name,
        require('./equipment').name,
        require('./settings').name,
        require('./reservations').name,
        require('./passes').name,
        require('./user-profile').name
    ])
    .config(require('./adminRoutes'))
    .controller('AdminCtrl', require('./AdminController'));