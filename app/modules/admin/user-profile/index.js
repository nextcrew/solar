'use strict';
// UserProfileView
module.exports = angular.module('modules.pages.userprofile', [])
    .directive('userprofileView', require('./userprofileDirective'))
    .controller('UserprofileCtrl', require('./UserprofileController'));