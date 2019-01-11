import {Strategy} from 'passport-google-oauth20';
import passport from 'passport';

passport.use(new Strategy({
    clientID: "820301897401-h67ubv25mv5oef7jvvbv5b7antmtut4q.apps.googleusercontent.com",
    clientSecret: "2-lIwkRRxIwg6hQjYaRGSM_Q",
    callbackURL: "/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(profile['emails']);
      cb();
  }
));

export default passport;
