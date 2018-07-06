'use strict';

var CONSTANTS = (function() {
    return {
        modalTemplates:{
          remove:'<div class="ui basic modal uuuu"><div class="content"><p>Czy napewno chcesz usunąć?</p></div><div class="actions"><div class="ui red basic cancel inverted button" ng-click="dismissModal(false)">Nie</div><div class="ui green ok inverted button" ng-click="dismissModal(true)">Tak</div></div></div>'
        },
        successMessage: 'You have successfully logged in.',
        failureMessage: 'Your username or password is incorrect.',
        key: 'value'
    };
}());

CONSTANTS.$inject = [];
module.exports = CONSTANTS;