const { User } = require('../models/User');

let admin = (req, res, next) => {
  let token = req.cookies.w_auth;

  User.findByToken(token, (err, admin) => {
      if (err) throw err;
      console.log(admin.role)
      
      if (admin.role != 1) {

        return res.json({
        
            error: true,
            isAdmin:false
        });
    }

    req.token = token;
    req.admin = admin;
    req.role = 1;
        next();
  });
};

module.exports = { admin };
