require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport=require('passport')
const session = require("express-session");
const bcrypt = require("bcryptjs");

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

app.get("/api/onLoadinfo", (req, res) => {
    User.findOne({email: req.user.email}).then((user) => {
        let userInfo = {
            name: user.name,
            email: user.email,
            address: user.address,
            contactNo: user.contactNo,
            newspapers: user.newspapers,
            magazines: user.magazines,
            onlineSub: user.onlineSubscription,
            dues: user.billDues
        }
        res.send(userInfo);
    })
})

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}!`);
})

//  sample data adding to database

// const userNames = require("./data/names");
// const userEmails = require("./data/emails");
// const userPasswords = require("./data/passwords");
// const userAddresses = require("./data/addresses");
// const userContacts = require("./data/contact");
// const userNewspapers = require("./data/newspapers");
// const userMagazines = require("./data/magazines");
// const userSub = require("./data/onlineSubscriptions");
// const userDue = require("./data/billDues");

// let hashPassList = [];

// function hashPass(i) {
//     if (i > 99) {
//         saveToDatabase(0);
//         return;
//     }

//     bcrypt.genSalt(10).then((salt) => {
//         bcrypt.hash(userPasswords[i], salt).then((hashedPass) => {
//             hashPassList.push(hashedPass);
//             hashPass(i + 1);
//         })
//     })
// }

// hashPass(0);

// function saveToDatabase(i) {
//     if (i > 99) {
//         return;
//     }

//     const currUser = new User({
//         name: userNames[i],
//         email: userEmails[i],
//         password: hashPassList[i],
//         address: userAddresses[i],
//         contactNo: userContacts[i],
//         newspapers: userNewspapers[i],
//         magazines: userMagazines[i],
//         onlineSubscription: userSub[i],
//         billDues: userDue[i],
//         isAdmin: false
//     });
//     currUser.save().then((user) => {
//         console.log("user " + i + " " + user.name);
//         saveToDatabase(i + 1);
//     }).catch((err) => {
//         console.log(err);
//     })
// }
