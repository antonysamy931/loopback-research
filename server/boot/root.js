'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  router.get('/verified',(req, res) => {
    console.log('verified');
    router.render('verified');
  });
  server.use(router);
};