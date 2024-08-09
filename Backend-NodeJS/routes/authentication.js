let express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
let router = express.Router();

router.post("/login", (req,res)=>{
    let body = req.body;
    let user = new User();
    user.email = body.email;
    user.password = body.password;
    user.login().then((result)=>{
        let token = jwt.sign({userId:result.id, email:result.email},"secretkeyappearshere",{ expiresIn: "1h" });
        res.json({status:"success", data:{...result, token:token}});
    }, (err)=>{
        res.json({status:"failed", data:err});
    })
});

module.exports= router;