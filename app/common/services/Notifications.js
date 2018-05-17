'use strict';

var Notifications = function(Notification) {


    var services = {
        success : success,
        error: error
    };

    return services;



    function success(text){
        Notification.success(text);
    };

    function error(text){
        Notification.error(text);
    }




};

Notifications.$inject = ['Notification'];
module.exports = Notifications;
