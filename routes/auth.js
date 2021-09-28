const router = require("express").Router();
const bcrypt = require("bcryptjs");
const passport = require('passport')

const User = require("../models/user");

router.post("/user/register", async (req, res) => {
    const emailExist = await User.findOne({
        email: req.body.email
    });
    if (emailExist) {
        res.status(400);
        res.redirect("/");
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        email: req.body.email,
        password: hashPassword,
        repassword: req.body.repassword
    });
    try {
        const savedUser = await user.save();
        res.status(200);
        console.log(res.status());
        res.redirect("/");
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/user/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/'
    })(req, res, next);
});

router.post("/admin/login", (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
        repassword: req.body.repassword
    }
    try {
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;