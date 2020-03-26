var models = require('./server.js').models


/*
----------------------------------------
            CREATE DATA
----------------------------------------

models.Profile.findOrCreate({
    name:"Yannis2"
}, (err, profile) => {
})
*/
// .create = INSERT INTO
// .upsert = UPDATE name WHERE id = :id
// .findOrCreate = INSERT or SELECT if already exists


/*var toSave = [
    {name:"Yannis",email:"yannis@mail.com"},
    {name:"jean",email:"jean@mail.com"},
    {name:"micha",email:"micha@mail.com"},
    {name:"jean",email:"jean@mail.com"},
    {name:"momo",email:"momo@mail.com"},
    {name:"clarisse",email:"clarisse@mail.com"},
    {name:"Jeanne",email:"Jeanne@mail.com"},
    {name:"Nico",email:"Nico@mail.com"},
    {name:"Eric",email:"Eric@mail.com"},
    {name:"justine",email:"justine@mail.com"},
]

toSave.map( obj => {
    models.Profile.create(obj, (err, created) => {
        console.log("Created? ",err,created)
    })
})*/


/*
----------------------------------------
            UPDATE DATA
----------------------------------------

profile.email = "yannis.yannis@yannis.fr"
        profile.save((ue, updated) => {
            console.log("Updated ? ", ue, updated)
        })
*/

// .updateAttribute(s){(name:"value")}
// model.column = "new value"



/*
----------------------------------------
            SELECT DATA
----------------------------------------
*/

/*
findOne or find
models.Profile.find(One)({
    where: {
        name:"jean"
    }
})

.findById("id",filter)

var filter= {
    where: {
        email: {like: 'Nico'},
    }, //kind of like MYSQL Where clause
    order: 'id ASC', //Order By : "field direction"
    limit: 3,
    skip: 0,
    fields: { //return specific field(s)
        email: true
    }
    include: { // nested query
        relation: 'Post',
        scope: {
            limit: 5,
            order: 'date DESC',
            include: {
                relation: 'Image',
                limit: 1,
                where: {type: 'thumbnail'}
            }
        }
    }
}*/


/*
----------------------------------------
            DELETE DATA
----------------------------------------

models.Profile.findById("id", (err, found) => {
    console.log("Find? ",err,found)
    found.destroy()
})

models.Profile.destroyAll( {
    email: {like:"justine"}
}

models.Profile.destroyById("5e7c5324a5281d03b3d79bd5", filter, (err, found) => {
    console.log("Delete? ",err,found)
})
*/

models.Profile.destroyById("5e7c5324a5281d03b3d79bd5", (err, found) => {
    console.log("Delete? ",err,found)
})