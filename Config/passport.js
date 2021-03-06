const usersModel = require("./../db/models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

// Config .env file
dotenv.config();

// Get SECRET_KEY variable from .env
const SECRET = process.env.SECRETKEY;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const email = profile.email.toLowerCase();
      const username = profile.given_name.toLowerCase();

      const user = await usersModel
        .findOne({
          $or: [{ username }, { email }],
        })
        .populate("role");

      if (user) {
        const payload = {
          id: user._id,
          email: user.email,
          userName: user.username,
          role: user.role.role,
          deleted: user.deleted,
        };

        const options = {
          expiresIn: "60m",
        };

        const token = jwt.sign(payload, SECRET, options);

        return done(null, { result: user, token });
      } else {
        const newUser = new usersModel({
          email: email,
          username: username,
          avatar: profile.picture,
          role: process.env.USER_ROLE,
          active: true,
        });

        newUser.save().then(async (result) => {
          const res = await usersModel
            .findOne({ _id: result._id })
            .populate("role");

          const payload = {
            id: res._id,
            email: res.email,
            username: res.username,
            role: res.role.role,
            deleted: res.deleted,
          };

          const options = {
            expiresIn: "60m",
          };

          const token = jwt.sign(payload, SECRET, options);

          return done(null, { result: res, token });
        });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
