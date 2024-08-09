let express = require("express");
var cors = require("cors");
let bodyparser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

let app = express();
app.use(cors());
app.use(express.static("public"));

app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

// Lets Access React Project - CORSS policy
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.get("/", (req, res) => {
    res.end("Wellcome To Node Js");
});

app.use("/users", require("./routes/users"));
app.use("/units", require("./routes/units"));
app.use("/categories", require("./routes/categories"));
app.use("/customers", require("./routes/customers"));
app.use("/routes", require("./routes/routes"));
app.use("/products", require("./routes/products"));
app.use("/routewisecustomers", require("./routes/routewisecustomers"));
app.use("/authentication", require("./routes/authentication"));
app.use("/userprofileimage", require("./routes/userprofileimage"));
app.use("/forgetpassword", require("./routes/forgetpassword"));


app.listen(8081, () => {
    console.log("server running on http://localhost:8081/");
})