'use strict';

function AdminCtrl($scope) {
    $scope.childModulesInheritThis = 'This text is inherited from the About page\'s parent scope (PagesCtrl).'; // child modules can inherit this
}

AdminCtrl.$inject = ['$scope'];
module.exports = AdminCtrl;