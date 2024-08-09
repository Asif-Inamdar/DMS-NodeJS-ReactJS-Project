let express = require("express");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

let router = express.Router();

router.post("/", (req, res) => {
  try {
    let token = req.headers.authorization.split(' ')[1];
    const decodeToken = jwt.verify(token, "secretkeyappearshere");
    let body = req.body;
    let customer = new Customer();
    customer.id = 0;
    customer.name = body.name;
    customer.email = body.email;
    customer.mobileno = body.mobileno;
    customer.address = body.address;
    customer.town = body.town;
    customer.save().then((result) => {
      res.json(JSON.stringify({ status: "success", data: result }));
    }, (err) => {
      res.json(JSON.stringify({ status: "failed", data: err }));
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
    let customer = new Customer();
    customer.list().then((result) => {
      res.json({ status: "success", data: result });
    }).catch((err) => {
      res.json({ status: "failed", data: err.message });
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
    let customer = new Customer();
    customer.id = req.params.id;
    customer.list().then((result) => {
      res.json({ status: "success", data: result });
    }).catch((err) => {
      res.json({ status: "failed", data: err.message });
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
    let customer = new Customer();
    customer.id = req.params.id;
    customer.delete().then((result) => {
      res.json({ status: "success", data: result });
    }).catch((err) => {
      res.json({ status: "failed", data: err.message });
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
    let id = req.params.id;
    let body = req.body;
    let customer = new Customer();
    customer.id = req.params.id;
    customer.name = body.name;
    customer.email = body.email;
    customer.mobileno = body.mobileno;
    customer.address = body.address;
    customer.town = body.town
    customer.save().then((result) => {
      res.end(JSON.stringify({ status: "success", data: result }));

    }, (err) => {
      res.end(JSON.stringify({ status: "failed", data: err }));

    });
  }
  catch (ex) {
    res.json({ status: "failed", data: "Your Unautheraized User" });
  }


});


module.exports = router;