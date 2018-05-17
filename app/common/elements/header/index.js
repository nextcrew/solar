'use strict';

module.exports = angular.module('common.elements.commonHeader', [])
    .directive('commonHeader', function() {
        return {
            template: require('./common-header.html'),
            restrict: 'EA',
            controllerAs: 'vm',
            bindToController:true,
            controller: function(Auth, $state){
                var vm = this;
                vm.user = Auth.$getAuth();
                vm.logout = logout;
                vm.cleanSession = cleanSession;

                function logout(){
                    $('.ui.basic.modal').modal({
                        closable  : false,
                        onApprove : function() {
                            vm.cleanSession();
                        }
                    })
                        .modal('show');

                }

                function cleanSession(){
                    Auth.$signOut();
                    $state.go('login');
                }

                function init(){
                    $('.ui.dropdown').dropdown();
                }

               init();

            }

        };
    });