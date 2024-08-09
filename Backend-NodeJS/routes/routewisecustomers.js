let express = require("express");
const jwt = require("jsonwebtoken");
const Routewisecustomers = require("../models/Routewisecustomers");

let router = express.Router();


router.get("/", (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, "secretkeyappearshere");
        let route = new Routewisecustomers();
        route.list().then((result) => {
            res.json({ status: "success", data: result });
        }, (err) => {
            res.json({ status: "failed", data: err });
        });
    }
    catch (ex) {
        res.json({ status: "failed", data: "Your Unautheraized Route-Wise-Customers" });
    }

});

module.exports = router;