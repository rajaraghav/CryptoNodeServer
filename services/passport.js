var bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const uuidv4 = require("uuid/v4");
const ExtractJWT = passportJWT.ExtractJwt;
const mongoose = require("mongoose");
const { speakEasyValueGenerator } = require("./speakEasySecret");
const keys = require("../config/keys");
const saltRounds = 10;
const User = mongoose.model("Users");

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: keys.jwtKey
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findOne({ _id: jwtPayload.id });
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
/* eslint-disable*/
export const token = ({ required, roles = ["user", "admin"] } = {}) => (
  req,
  res,
  next
) =>
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (
      err ||
      (required && !user) ||
      (required && !~roles.indexOf(user.role))
    ) {
      return res.status(401).end();
    }
    req.logIn(user, { session: false }, err => {
      if (err) {
        return res.status(401).end();
      }
      next();
    });
  })(req, res, next);
/* eslint-enable*/
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
      passwordField: "password",
      usernameField: "email"
    },
    /* eslint-disable max-params */
    /* eslint-disable max-statements */
    /* eslint-disable max-lines-per-function */
    async (req, email, password, done) => {
      try {
        try {
          if (
            typeof req.body === "undefined" ||
            typeof req.body.email === "undefined" ||
            typeof req.body.password === "undefined" ||
            typeof req.body.role === "undefined"
          ) {
            return done(null, null);
          }

          if (req.body.role !== "admin" && req.body.role !== "user") {
            return done(null, null);
          }
        } catch (ex) {
          return done(null, null);
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return done(null, "user already exists");
        }
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            return done(err, null);
          }
          let speakEasyObj = speakEasyValueGenerator(email);
          const emailVerificationKey = uuidv4();
          let newUser = {
            email,
            emailVerificationKey,
            otpAuthUrl: speakEasyObj.otpAuthURL,
            password: hash,
            role: req.body.role,
            twofaSecret: speakEasyObj.value,
            verified: false
          };
          return done(null, await new User(newUser).save());
        });
      } catch (err) {
        return done(null, err);
      }
    }
  )
);
/* eslint-enable max-statements */
/* eslint-enable max-lines-per-function */
passport.use(
  "local-login",
  new LocalStrategy(
    {
      passReqToCallback: true,
      passwordField: "password",
      usernameField: "email"
    },
    async (req, email, password, done) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          /* eslint-disable no-undef */
          console.log(process.env.NODE_ENV);
          if (process.env.NODE_ENV === "production" && !existingUser.verified) {
            /* eslint-enable no-undef */

            return done(null, "user is not verified");
          }
          bcrypt.compare(password, existingUser.password, (err, res) => {
            if (err) {
              return done(null, err);
            }
            if (!res) {
              return done(null, "password does not match");
            }

            return done(null, existingUser);
          });
        } else {
          return done(null, "user does not exist");
        }
      } catch (err) {
        return done(null, err);
      }
    }
    /* eslint-enable max-params */
  )
);
