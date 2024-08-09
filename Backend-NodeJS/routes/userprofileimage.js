let express = require("express");
let multer = require("multer");
let path = require("path");
const Userprofileimage = require("../models/Userprofileimage"); 

let router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '././public/productpics/userpics');
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
    console.log("Received POST request at / with body:", req.body);
    let userprofileimage = new Userprofileimage();
    userprofileimage.imagepath = "userpics/" + req.uniqueFilename; // Save the path to the database

    userprofileimage.save().then((result) => {
        console.log("Saved user profile image:", result);
        res.json({ status: "success", data: result });
    }).catch((err) => {
        console.error("Error saving user profile image:", err);
        res.status(500).json({ status: "failed", data: err });
    });
});


router.put("/:id", upload.single("image"), (req, res) => {
    console.log("Received PUT request at /" + req.params.id + " with body:", req.body);
    let userprofileimage = new Userprofileimage();
    userprofileimage.id = req.params.id;
    userprofileimage.imagepath = "userpics/" + req.file.filename; // Update with new image path

    userprofileimage.update().then((result) => {
        console.log("Updated user profile image:", result);
        res.json({ status: "success", data: result });
    }).catch((err) => {
        console.error("Error updating user profile image:", err);
        res.status(500).json({ status: "failed", data: err });
    });
});



router.get("/", (req, res) => {
    let userprofileimage = new Userprofileimage();
    userprofileimage.list().then((result) => {
        console.log("Retrieved list of user profile images:", result);
        res.json({ status: "success", data: result });
    }).catch((err) => {
        console.error("Error fetching user profile image list:", err);
        res.status(500).json({ status: "failed", data: err });
    });
});

router.get("/:id", (req, res) => {
    console.log("Received GET request at /" + req.params.id);
    let userprofileimage = new Userprofileimage();
    userprofileimage.id = req.params.id;
    userprofileimage.get().then((result) => {
        console.log("Retrieved user profile image:", result);
        res.json({ status: "success", data: result });
    }).catch((err) => {
        console.error("Error fetching user profile image:", err);
        res.status(500).json({ status: "failed", data: err });
    });
});

router.delete("/:id", (req, res) => {
    console.log("Received DELETE request at /" + req.params.id);
    let userprofileimage = new Userprofileimage();
    userprofileimage.id = req.params.id;
    userprofileimage.delete().then((result) => {
        console.log("Deleted user profile image:", result);
        res.json({ status: "success", data: result });
    }).catch((err) => {
        console.error("Error deleting user profile image:", err);
        res.status(500).json({ status: "failed", data: err });
    });
});
module.exports = router;