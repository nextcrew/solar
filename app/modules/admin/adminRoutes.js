'use strict';

function adminRoutes($stateProvider) {
    var admin = {
        name: 'admin',
        abstract: true,  // This makes it so that the url for this route doesn't actually resolve
        url: '/admin',
        template: '<common-header></common-header><div class="ui grid centered"><div class="fourteen wide column"><div ui-view></div></div>', // This injects a new ui-view that the about page directive is injected into
        controller: 'AdminCtrl',
        resolve: {
        // controller will not be loaded until $requireSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
        "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
        }]
    }
    };

    var dashboard = {
        name: 'admin.dashboard',
        url: '/dashboard', // The ^ character makes this url override the parent url
        template: '<div dashboard-view></div>',
        data: {
            moduleClasses: 'admin',
            pageClasses: 'admin',
            pageTitle: 'Dashboard',
            pageDescription: 'Some description.'
        }
    };

    var customer = {
        name: 'admin.customer',
        url: '/customer', // The ^ character makes this url override the parent url
        template: '<div customer-view></div>',
        data: {
            moduleClasses: 'customer',
            pageClasses: 'customer',
            pageTitle: 'Customer',
            pageDescription: 'Some description.'
        }
    };

    var equipment = {
        name: 'admin.equipment',
        url: '/equipment', // The ^ character makes this url override the parent url
        template: '<div equipment-view></div>',
        data: {
            moduleClasses: 'equipment',
            pageClasses: 'equipment',
            pageTitle: 'Equipment',
            pageDescription: 'Some description.'
        }
    };

    var settings = {
        name: 'admin.settings',
        url: '/settings', // The ^ character makes this url override the parent url
        template: '<div settings-view></div>',
        data: {
            moduleClasses: 'settings',
            pageClasses: 'settings',
            pageTitle: 'Settings',
            pageDescription: 'Some description.'
        }
    };

    var reservations = {
        name: 'admin.reservations',
        url: '/reservations', // The ^ character makes this url override the parent url
        template: '<div reservations-view></div>',
        data: {
            moduleClasses: 'reservations',
            pageClasses: 'reservations',
            pageTitle: 'Reservations',
            pageDescription: 'Some description.'
        }
    };

    var passes = {
        name: 'admin.passes',
        url: '/passes', // The ^ character makes this url override the parent url
        template: '<div passes-view></div>',
        data: {
            moduleClasses: 'passes',
            pageClasses: 'passes',
            pageTitle: 'Passes',
            pageDescription: 'Some description.'
        }
    };

    var userprofile = {
        name: 'admin.profile',
        url: '/profile', // The ^ character makes this url override the parent url
        template: '<div userprofile-view></div>',
        params: { profile: null},
        data: {
            moduleClasses: 'passes',
            pageClasses: 'passes',
            pageTitle: 'User profile',
            pageDescription: 'Some description.'
        }
    };

    $stateProvider.state(admin);
    $stateProvider.state(dashboard);
    $stateProvider.state(customer);
    $stateProvider.state(equipment);
    $stateProvider.state(settings);
    $stateProvider.state(reservations);
    $stateProvider.state(passes);
    $stateProvider.state(userprofile);

}

adminRoutes.$inject = ['$stateProvider'];
module.exports = adminRoutes;