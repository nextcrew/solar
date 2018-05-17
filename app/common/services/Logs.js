'use strict';

var Logs = function($firebaseArray , Auth) {

    var user = Auth.$getAuth();
    var userEmail = user.email;
    var log = firebase.database().ref().child("logi");
    var logArray = $firebaseArray(log);


    var services = {
        addLog : addLog,
        getLog: getLog
    };

    return services;



    function addLog(topic,content){
        var date = new Date().getTime();
        logArray.$add({
            topic:topic,
            content: content,
            user: userEmail,
            timestamp:date
        });
    };

    function getLog(){
        return logArray;
    }

};

Logs.$inject = ['$firebaseArray', 'Auth'];
module.exports = Logs;
