// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = module.exports = loopback();

app.start = function () {
  // start the web server
  return app.listen(function () {
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
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});


//create all users

var dbUsers = [
  { email: "admin@website.com", password: "admin", name: "admin" },
  { email: "editor@website.com", password: "editor", name: "editor" }
]


app.models.user.find({
  where: {
    or:[
      {email: "admin@website.com"}, 
      {email: "editor@website.com"}
    ]
  }}, (errFindUser, findUser) => {
  console.log("Find ? ", errFindUser, findUser)
  if (!errFindUser && findUser.length === 0) {
    dbUsers.map((user) => {
      app.models.user.create(user, (err, result) => {
        if (!err && result) {
          console.log(result, " is created")
          // create profiles
          app.models.Profile.create({
            first_name: result.name,
            create_at: new Date(),
            userId: result.id
          }, (profileErr, profile) => {
            if (!profileErr && profile) {
              console.log("Profile created for : ", profile)
            } else {
              console.log("Error create profile for : ", profileErr)
            }
          })
        } else {
          console.log("create user error : ", err)
        }
      })
    })
  }
})

/*
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
      console.log("There is an error ", err)
    }
  })
  next()
}) 
*/

//create admin role
app.models.Role.find({ where: { name: "admin" } }, (err, role) => {
  if (!err && role) {
    console.log("No error, role is ", role)
    if (role.length === 0) {
      app.models.Role.create({
        name: "admin",
      }, (errRole, result) => {
        if (!errRole && result) {
          app.models.user.findOne((userErr, user) => {
            if (!userErr && user) {
              result.principals.create({
                principalType: app.models.RoleMapping.USER,
                principalId: user.id
              }, (errPrincipal, principal) => {
                console.log("Created principal ", errPrincipal, principal)
              })
            }
          })
        }
      })
    }
  }
})

//create editor role
app.models.Role.find({ where: { name: "editor" } }, (err, role) => {
  if (!err && role) {
    console.log("No error, role is ", role)
    if (role.length === 0) {
      app.models.Role.create({
        name: "editor"
      }, (creationErr, result) => {
        console.log(creationErr, result)
      })
    }
  }
})