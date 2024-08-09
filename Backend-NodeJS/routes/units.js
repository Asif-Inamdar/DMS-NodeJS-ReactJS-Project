let express = require("express");
const jwt = require("jsonwebtoken");
const Unit = require("../models/Unit");

let router = express.Router();

router.post("/", (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, "secretkeyappearshere");
        let body = req.body;
        let unit = new Unit();
        unit.id = 0;
        unit.name = body.name;
        unit.email = body.email;
        unit.mobileno = body.mobileno;
        unit.password = body.password;
        unit.utype = body.utype;
        unit.save().then((result) => {
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
        let unit = new Unit();
        unit.id = req.params.id;
        unit.name = body.name;
        unit.email = body.email;
        unit.mobileno = body.mobileno;
        unit.password = body.password;
        unit.utype = body.utype;
        unit.save().then((result) => {
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

        let unit = new Unit();
        unit.list().then((result) => {
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
    let unit = new Unit();
    unit.id = req.params.id;
    unit.get().then((result) => {
        res.json({ status: "success", data: result });
    }, (err) => {
        res.json({ status: "failed", data: err });
    });
});


router.delete("/:id", (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, "secretkeyappearshere");
        let unit = new Unit();
        unit.id = req.params.id;
        unit.delete().then((result) => {
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