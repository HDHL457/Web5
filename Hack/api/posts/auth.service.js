var jwt = require('jsonwebtoken');
var configs = require('../../configs/configs.js');

module.exports = {
  authentication : function(req , res , next){
    jwt.verify(req.body.token, configs.jwtKey, function(err, decoded){
      if (err) res.json({status : false , message : err.message});
      else {
        req.user = decoded.data;
        next();
      }
    })
  },
  hasRole : function(role){
    return function(req, res , next){
      var roleIndex = configs.allRole.indexOf(role);
      var roleState = false;
      if(roleIndex >= 0){
          for(let i = 0; i <= roleIndex; i++){
            if(req.user.role == configs.allRole[i]) roleState = true;
          }
          if(roleState) next();
          else res.json({status : false,
              message : "You have to be " + role + "s to access this!"});
      }
      else next();
    }
  },
  hasPermission : function(objectAPI , permission){
    return function(req, res, next){
      var permissionIndex = configs.allPermission.indexOf(permission);
      var permissionState = false;
      if(permissionIndex >= 0){
        for(let i = 0; i <= permissionIndex; i++){
          for(let j = 0; j < req.user.permission.length ; j++){
            if(req.user.permission[j][objectAPI] == configs.allPermission[i])
              permissionState = true;
          }
        }
        if(permissionState) next();
        else res.json({status : false, message : "You do not have permission to do this!"});
      }
      else next();
    }
  }
}
