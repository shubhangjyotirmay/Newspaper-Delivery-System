require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport=require('passport')
const MongoStore = require("connect-mongo");
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
    resave: false,
    saveUninitialized: false,
    cookie : {
        maxAge: 1000* 60 * 60 *24 * 365
    },
    store: MongoStore.create({
        mongoUrl: process.env.mongoURL,
        auto_reconnect: true
    }),
    unset: 'destroy' 
}));

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

app.get("/finduser", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("finduser");
    } else {
        res.redirect("/");
    }
})

app.get("/userlist", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("userlist");
    } else {
        res.redirect("/");
    }
})

app.get("/adminlist", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("adminlist");
    } else {
        res.redirect("/");
    }
})

app.get("/visualization", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("visualization");
    } else {
        res.redirect("/");
    }
})

app.get("/delivery", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("delivery");
    } else {
        res.redirect("/");
    }
})

app.get("/profile", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("profile");
    } else {
        res.redirect("/");
    }
})

app.get("/update", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("update");
    } else {
        res.redirect("/");
    }
})

app.get("/logout", (req, res) => {
    req.logout();
    req.session = null;  
    res.redirect("/");
})

app.get("/api/onLoadinfo", (req, res) => {
    User.findOne({email: req.user.email}).then((user) => {
        let userInfo = {
            id: user._id,
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

app.get("/api/findOnlyUsers", (req, res) => {
    User.find({isAdmin: false}).then((users) => {
        let sendList = [];
        for (let i = 0; i < users.length; i++) {
            const obj = {
                id: users[i]._id,
                name: users[i].name,
                email: users[i].email,
                address: users[i].address,
                contactNo: users[i].contactNo,
                newspapers: users[i].newspapers,
                magazines: users[i].magazines,
                onlineSub: users[i].onlineSubscription,
                dues: users[i].billDues
            }
            sendList.push(obj);
        }
        res.send(sendList);
    })
})

app.get("/api/findOnlyAdmins", (req, res) => {
    User.find({isAdmin: true}).then((users) => {
        let sendList = [];
        for (let i = 0; i < users.length; i++) {
            const obj = {
                id: users[i]._id,
                name: users[i].name,
                email: users[i].email,
                address: users[i].address,
                contactNo: users[i].contactNo
            }
            sendList.push(obj);
        }
        res.send(sendList);
    })
})

app.patch("/api/user/:email", (req, res) => {
    const updatedUser = req.body;
    User.findOneAndUpdate({email: req.params.email}, {$set: updatedUser}, {new: true}, (err, doc) => {
        if (err) {
            console.log(err);
        }
        let userInfo = {
            id: doc._id,
            name: doc.name,
            email: doc.email,
            address: doc.address,
            contactNo: doc.contactNo,
            newspapers: doc.newspapers,
            magazines: doc.magazines,
            onlineSub: doc.onlineSubscription,
            dues: doc.billDues
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
