require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport=require('passport')
const session = require("express-session");

const User = require("./models/user");

const authRoute = require("./routes/auth")
require("./routes/passport")(passport);

const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Connected to Database!");
});
mongoose.connection.on("error", () => {
    console.log("Failed to connect to database!");
});

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie : {
        maxAge: 1000 * 60 * 60 * 24 * 365
    },
    })
);

app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("dashboard");
    } else {
        res.sendFile(__dirname + "/public/index.html");
    }
});

app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.static(__dirname + "/public/"));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use("/", authRoute);

app.get("/dashboard", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("dashboard");
    } else {
        res.redirect("/");
    }
})

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}!`);
})