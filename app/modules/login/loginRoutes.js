'use strict';

function loginRoutes($stateProvider) {

    var login = {
        name: 'login', // state name
        url: '/login', // url path that activates this state
        template: '<div login-view></div>', // generate the Directive "homeView" - when calling the directive in HTML, the name must not be camelCased
        data: {
            moduleClasses: 'page', // assign a module class to the <body> tag
            pageClasses: 'login', // assign a page-specific class to the <body> tag
            pageTitle: 'Login', // set the title in the <head> section of the index.html file
            pageDescription: 'Meta Description goes here' // meta description in <head>
        }
    };

    $stateProvider.state(login);

}

loginRoutes.$inject = ['$stateProvider'];
module.exports = loginRoutes;