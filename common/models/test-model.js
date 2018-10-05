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

    var modelValue;
    
    /*Testmodel.observe('before save', (ctx, next) => {
        console.log("before save");
        modelValue = ctx.instance.test;
        ctx.instance.unsetAttribute("test");
        next();
    });

    Testmodel.observe('after save', (ctx, next) => {
        console.log("after save");
        console.log(modelValue);
        next();
    });*/

    Testmodel.afterRemote('create', function(context, modelinstance, next){
        console.log("after remote");
        console.log(modelinstance);
        console.log(modelValue);
        next();
    });

    Testmodel.beforeCreate = function(next, modelInstance) {
        //your logic goes here
        console.log('beforecreate')
        modelValue = modelInstance.test;
        modelInstance.unsetAttribute("test");
        next();
    };

    Testmodel.afterCreate = function(next) {
        //your logic goes here
        console.log('aftercreate')
        console.log(modelValue)
        next();
    };
};
