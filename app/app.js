'use strict';

var angular = require('angular');

module.exports = angular.module('myApp',
    [
        require('./common/common.js').name,
        require('./modules').name
    ])
    .config(require('./appConfig'))
    .constant('version', require('../package.json').version)
    .factory("Auth", ["$firebaseAuth",
        function($firebaseAuth) {
            return $firebaseAuth();
        }
    ])
    .run(require('./common/common-init.js'));