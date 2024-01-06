require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true })); // 解析HTML表单数据

// use the session package
app.use(
  session({
    secret: "Our Little Secret.",
    resave: false,
    saveUninitialized: false,
  })
);

// initialize passport and use passport to manage our session
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB");
// mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  secret: String,
});

// use passport-local-mongoose to hash and salt our passwords and to save our users into our MongoDB database
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/secrets", async function (req, res) {
  // Uncomment and use this if you need authentication check
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  try {
    // Retrieve users where 'secret' is not null
    const foundUsers = await User.find({ secret: { $ne: null } });

    // Check if users with secrets are found
    if (foundUsers && foundUsers.length > 0) {
      console.log("foundUsers: ");
      console.log(foundUsers);
      res.render("secrets", { usersWithSecrets: foundUsers });
    } else {
      // Handle the case where no users are found or no secrets are set
      // Optionally, render a different view or send a message
      res.render("secrets", { usersWithSecrets: [] });
    }
  } catch (err) {
    // Handle any errors that occur during the process
    console.log(err);
    res.status(500).send("An error occurred while retrieving secrets");
  }
});

app.post("/register", function (req, res) {
  User.register(
    { username: req.body.username, active: false },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        // authenticate the user using local strategy
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets"); // first time introduce the secrets route
        });
      }
    }
  );
});

app.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  // use passport to login the user and authenticate them
  req.login(user, function (err) {
    if (err) {
      res.redirect("/login");
    } else {
      // authenticate the user using local strategy
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    }
  });
});

app.get("/submit", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});

app.post("/submit", async function (req, res) {
  const submittedSecret = req.body.secret;
  console.log("!!! current user: ");
  console.log(req.user);

  try {
    // Find the user by ID using the async-await pattern
    const foundUser = await User.findById(req.user.id);

    // Check if the user was found
    if (foundUser) {
      // Update the secret
      foundUser.secret = submittedSecret;

      // Save the user and redirect
      await foundUser.save();
      res.redirect("/secrets");
    } else {
      // Handle the case where the user is not found
      // You might want to send a response or throw an error
      res.status(404).send("User not found");
    }
  } catch (err) {
    // Handle any errors that occur during the process
    console.log(err);
    // Optionally, send an error response back to the client
    res.status(500).send("An error occurred");
  }
});

app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    // deauthenticate the user
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
