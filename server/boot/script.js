
module.exports = function(app){
    var Role = app.models.Role;
    var Meduser = app.models.Meduser;
    var RoleMapping = app.models.RoleMapping;

    //console.log(role);
    Role.findOne({where: {name:'admin'}}, function(error, role) {
        //console.log(role);
        Meduser.findOne({where:{email:"test@gm.com"}}, function(error, user) {
            RoleMapping.findOne({where:{principalId: user.id, roleId: role.id}}, (e, rm) => {
                if(!rm){                    
                    RoleMapping.create({
                        principalType: "USER",
                        principalId: user.id,
                        roleId: role.id
                      }, function(err, roleMapping) {
                        if (err) {return console.log(err);}
                        console.log(roleMapping);                            
                      })
                }
            })            

        });
    });

    /*Role.findOne({where: {name:'admin'}}, function(error, role) {
        role.principals.create({
            principalType: RoleMapping.USER,
            principalId: "5bb743bf91944147c401e0e1"
          }, function(err, principal) {
            if (err) return debug(err);
            //debug(principal);
          });
    });*/

    function test(){
        Role.findOne({where:{name:"pharmaadmin"}}, (err, role) => {
            if(!role){
                Role.create({name:"pharmaadmin"}, (e, r) => {
                    console.log(r);
                });
            }
        });
    }

    //test()

    /*Role.create({
        name: 'admin'
    }, function(err, role) {
        if (err) console.log(err);

        console.log(role);
    });*/
}