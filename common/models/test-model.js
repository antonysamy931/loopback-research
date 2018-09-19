'use strict';
var app = require('../../server/server');
module.exports = function(Testmodel) {

    Testmodel.disableRemoteMethod('upsert', true);				
    Testmodel.disableRemoteMethod('deleteById', true);			
    Testmodel.disableRemoteMethod("updateAll", true);				
    Testmodel.disableRemoteMethod("updateAttributes", true);		
    
    
    Testmodel.disableRemoteMethod('createChangeStream', true);
    Testmodel.disableRemoteMethod("count", true);
    Testmodel.disableRemoteMethod("exists", true);

    var user = app.models.Meduser;         

    Testmodel.users = (cb) => {
        var users = user.find({},(error, u) => {
            console.log(u)
            cb(null, u);
        });
    }

    Testmodel.remoteMethod('users',{       
        http: {path: '/users', verb: 'get'},
        returns: {arg: 'users', type: 'Object'}
    });    
};
