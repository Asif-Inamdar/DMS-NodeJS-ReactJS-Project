let express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

let router = express.Router();

router.post("/", (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, "secretkeyappearshere");
        let body = req.body;
        let user = new User();
        user.id = 0;
        user.name = body.name;
        user.email = body.email;
        user.mobileno = body.mobileno;
        user.password = body.password;
        user.utype = body.utype;
        user.save().then((result) => {
            res.json({ status: "success", data: result });
        }, (err) => {
            res.json({ status: "failed", data: err });
        });
    }
    catch (ex) {
        res.json({ status: "failed", data: "Your Unautheraized User" });
    }

});


router.put("/:id", (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, "secretkeyappearshere");
        let body = req.body;
        let user = new User();
        user.id = req.params.id;
        user.name = body.name;
        user.email = body.email;
        user.mobileno = body.mobileno;
        user.password = body.password;
        user.utype = body.utype;
        user.save().then((result) => {
            res.json({ status: "success", data: result });
        }, (err) => {
            res.json({ status: "failed", data: err });
        });
    }
    catch (ex) {
        res.json({ status: "failed", data: "Your Unautheraized User" });
    }

});


router.get("/", (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, "secretkeyappearshere");
        let user = new User();
        user.list().then((result) => {
            res.json({ status: "success", data: result });
        }, (err) => {
            res.json({ status: "failed", data: err });
        });
    }
    catch (ex) {
        res.json({ status: "failed", data: "Your Unautheraized User" });
    }

});


router.get("/:id", (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, "secretkeyappearshere");
        let user = new User();
        user.id = req.params.id;
        user.get().then((result) => {
            res.json({ status: "success", data: result });
        }, (err) => {
            res.json({ status: "failed", data: err });
        });
    }
    catch (ex) {
        res.json({ status: "failed", data: "Your Unautheraized User" });
    }

});


router.delete("/:id", (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, "secretkeyappearshere");
        let user = new User();
        user.id = req.params.id;
        user.delete().then((result) => {
            res.json({ status: "success", data: result });
        }, (err) => {
            res.json({ status: "failed", data: err });
        });
    }
    catch (ex) {
        res.json({ status: "failed", data: "Your Unautheraized User" });
    }

});
module.exports = router;