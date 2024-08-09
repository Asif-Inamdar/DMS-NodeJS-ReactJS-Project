let express = require("express");
const jwt = require("jsonwebtoken");
let multer = require("multer");
let path = require("path");
const Product = require("../models/Product");

let router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '././public/productpics/');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const uniqueFilename = timestamp + "." + path.extname(file.originalname).slice(1);
        cb(null, uniqueFilename);
        req.uniqueFilename = uniqueFilename;
    },
});
const upload = multer({ storage: storage });


router.post("/", upload.single("image"), (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, "secretkeyappearshere");
        let body = req.body;
        let product = new Product();
        product.id = 0;
        product.name = body.name;
        product.categoryid = body.categoryid;
        product.unitid = body.unitid;
        product.description = body.description;
        product.gstpercent = body.gstpercent;
        product.imagepath = "productpics/" + req.uniqueFilename;

        product.save().then((result) => {
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
        let product = new Product();
        product.id = req.params.id;
        product.name = body.name;
        product.categoryid = body.categoryid;
        product.unitid = body.unitid;
        product.description = body.description;
        product.gstpercent = body.gstpercent;

        product.save().then((result) => {
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
        let product = new Product();
        product.list().then((result) => {
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
        let product = new Product();
        product.id = req.params.id;
        product.get().then((result) => {
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
        let product = new Product();
        product.id = req.params.id;
        product.delete().then((result) => {
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