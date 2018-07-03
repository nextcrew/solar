// window.jQuery = require('jquery');
// window.$ = require('jquery');
window._ = require('lodash');


require('angular-bootstrap');
require('angular-ui-router');
require('angular-animate');
require('angular-cookies');
require('angular-resource');
require('angular-sanitize');
require('domready/ready');
require('lodash');
require('restangular');
require('semantic');
require('semantic-ui-calendar');
require('semantic-ui-angular-jquery');
require('timetable.js');
require('moment');
require('angular-moment-picker');
require('angular-ui-notification');
require('angular-modal-service');


module.exports = angular.module('common',
    [
        'ui.bootstrap',
        'ui.router',
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'restangular',
        'firebase',
        'moment-picker',
        'ui-notification',
        'semantic-ui',
        'angularModalService',
        require('./elements/header').name,
        require('./elements/footer').name,
        require('./elements/adminMenu').name,
        require('./constants').name,
        require('./directives').name,
        require('./resources').name,
        require('./services').name
    ]).config(function(NotificationProvider) {
    NotificationProvider.setOptions({
        delay: 5000,
        startTop: 20,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'top',
        positionY: 'right'
    });
});
