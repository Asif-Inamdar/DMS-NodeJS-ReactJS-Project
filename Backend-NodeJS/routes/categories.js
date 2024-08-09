let express = require("express");
const jwt = require("jsonwebtoken");
const Categories = require("../models/Category");

let router = express.Router();

router.post("/", (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, "secretkeyappearshere");
        let body = req.body;
        let category = new Categories();
        category.id = 0;
        category.name = body.name;
        category.save().then((result) => {
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
        let category = new Categories();
        category.id = req.params.id;
        category.name = body.name;
        category.utype = body.utype;
        category.save().then((result) => {
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
        let category = new Categories();
        category.list().then((result) => {
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
        let category = new Categories();
        category.id = req.params.id;
        category.get().then((result) => {
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
        let category = new Categories();
        category.id = req.params.id;
        category.delete().then((result) => {
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