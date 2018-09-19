'use strict';
var app = require('../../server/server');

module.exports = function(Meduser) {    
    app.model(Meduser);    
    Meduser.afterRemote('create', function(context, userInstance, next) {
        console.log('> user.afterRemote triggered');
                
        var link = `<a href="http://localhost:3000/api/medusers/${userInstance.id}/verify">Verify</a>`;
        var options = {
          type: 'email',
          to: 'antony.samy@ravsoftsolutions.com',//userInstance.email,
          from: 'DoNotReply_Local@Merge.com',
          subject: 'Thanks for registering.',
          html: link,          
          user: Meduser,
          redirect: '/verified'
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
};