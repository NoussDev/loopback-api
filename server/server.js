// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});


//.find = SELECT
app.models.user.find((err, result) => {
  if(result.length === 0){
    const user = {
      email: "yannis@yannis.com",
      password: "test",
      username: "yannis"
    }
    app.models.user.create(user, (err, result) => {
      console.log("Tried to create user ",err, result)
    })
  }
})

/* User Post / Users 
data : 
  { 
    "email":"yannis@test.fr",
    "password":"test", 
    "username":"yannis"
  }
after create a new user, i log the new user with his datas
  */
app.models.user.afterRemote('create', (ctx, user, next) => {
  console.log("New user is ", user)
  app.models.Profile.create({
    first_name: user.username,
    create_at: new Date(),
    userId: user.id
  }, (err, result) => { //call back it's like a catch in PHP
    if(!err && result){
      console.log("Created new Profile! ", result)
    }else{
      console.log("There is an error ")
    }
  })
  next()
})