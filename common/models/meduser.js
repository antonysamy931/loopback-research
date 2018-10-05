'use strict';
var app = require('../../server/server');
var path = require('path');

var config = require(path.join(__dirname, '../../server/config.json'));

module.exports = function(Meduser) {    
    app.model(Meduser);    

    
    /*Meduser.disableRemoteMethod('upsert', true);				
    Meduser.disableRemoteMethod('deleteById', true);			
    Meduser.disableRemoteMethod("updateAll", true);				
    Meduser.disableRemoteMethod("updateAttributes", true);		
    Meduser.disableRemoteMethod("find", true);
    Meduser.disableRemoteMethod("findById", true);
    Meduser.disableRemoteMethod("findOne", true);

    Meduser.disableRemoteMethod("deleteById", true);

    Meduser.disableRemoteMethod("confirm", true);
    Meduser.disableRemoteMethod("count", true);
    Meduser.disableRemoteMethod("exists", true);
    Meduser.disableRemoteMethod("resetPassword", true);*/

    Meduser.disableRemoteMethod('__count__accessTokens', false);
    Meduser.disableRemoteMethod('__create__accessTokens', false);
    Meduser.disableRemoteMethod('__delete__accessTokens', false);
    Meduser.disableRemoteMethod('__destroyById__accessTokens', false);
    Meduser.disableRemoteMethod('__findById__accessTokens', false);
    Meduser.disableRemoteMethod('__get__accessTokens', false);
    Meduser.disableRemoteMethod('__updateById__accessTokens', false);
    
    /*Meduser.disableRemoteMethod('createChangeStream', true);
    Meduser.disableRemoteMethod("count", true);
    Meduser.disableRemoteMethod("exists", true);*/

    /*Meduser.disableRemoteMethod('login',true);*/
    /*Meduser.disableRemoteMethod('upsertWithWhere',true);*/

    

    Meduser.afterRemote('create', function(context, userInstance, next) {
        console.log('> user.afterRemote triggered');
        console.log(config['mailurl']);            
        var link = `${config['mailurl']}/${userInstance.id}`;
        var options = {
          type: 'email',
          to: 'antony.samy@ravsoftsolutions.com',//userInstance.email,
          from: 'DoNotReply_Local@Merge.com',
          subject: 'Thanks for registering.',
          verifyHref: link,          
          user: Meduser,
          //template: path.join(__dirname, './index.ejs'),
          //redirect: '/verified'
        };

        userInstance.verify(options, function(err, response, next) {
            if (err) return next(err);
      
            console.log('> verification email sent:', response);
      
            context.res.render('response', {
              title: 'Signed up successfully',
              content: 'Please check your email and click on the verification link ' -
                  'before logging in.',
              redirectTo: '/',
              redirectToLinkText: 'Log in'
            });
          });

        /*Meduser.find({'where':{'email':userInstance.email}}, (error, record) => {
            console.log(record);
        });*/

        // Method to render
        Meduser.afterRemote('prototype.verify', function(context, user, next) {
            context.res.render('response', {
            title: 'A Link to reverify your identity has been sent '+
                'to your email successfully',
            content: 'Please check your email and click on the verification link '+
                'before logging in',
            redirectTo: '/',
            redirectToLinkText: 'Log in'
            });
        });

        //console.log(link);

        next();
       
    });

    Meduser.beforeRemote('login', (ctx, userInstance, next) => {
        console.log('login before');
        console.log(ctx.req.body);
        ctx.req.body.ttl=30;
        next();
    });

   Meduser.afterRemote('login', (ctx, userInstance, next) => {
        console.log('login after');
        userInstance.Role = "admin";
        console.log(userInstance);
        next();
    });
    var user = app.models.User;

    Meduser.Account_Login = (cb) => {
        Meduser.login({username:"test@gm.com",password:"Pa$$word"}, function(err, token){
            console.log(err);
        });
    }

    Meduser.remoteMethod('Account_Login', {
		'http': {
			'path': '/add_to_login',
			'verb': 'post'
		},
		'accepts': [
			{
				'arg': 'credentials',
				'type': 'object',
				'description': 'Login credentials',
				'required': true,
				'http': {
					'source': 'body'
				}
			},
			{
				'arg': 'include',
				'type': 'string',
				'description': 'Related objects to include in the response. See the description of return value for more details.',
				'http': {
					'source': 'query'
				}
			}
		],
		'returns': [
			{
				'arg': 'token',
				'type': 'object',
				'root': true
			}
		]
	})
};