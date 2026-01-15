import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

console.log('Passport config loading...');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET');

// Google OAuth Strategy - Only register if credentials are available
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  console.log('✓ Registering Google OAuth Strategy');
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            const token = generateToken(user._id);
            user.redirectUrl = `${process.env.FRONTEND_URL}?token=${token}`;
            return done(null, user);
          }

          const nameParts = profile.displayName.split(' ');
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(' ') || 'User';

          user = new User({
            firstName,
          lastName,
          email: profile.emails[0].value,
          googleId: profile.id,
          profileImage: profile.photos[0]?.value,
          authProvider: 'google',
          isEmailVerified: true,
        });

        await user.save();

        const token = generateToken(user._id);
        user.redirectUrl = `${process.env.FRONTEND_URL}?token=${token}`;

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
} else {
  console.log('✗ Google OAuth credentials not found in environment variables');
}

// GitHub OAuth Strategy - Only register if credentials are available
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  console.log('✓ Registering GitHub OAuth Strategy');
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ githubId: profile.id });

          if (user) {
            const token = generateToken(user._id);
            user.redirectUrl = `${process.env.FRONTEND_URL}?token=${token}`;
            return done(null, user);
          }

          const nameParts = (profile.displayName || profile.username).split(' ');
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(' ') || 'User';

          user = new User({
            firstName,
            lastName,
            email: profile.emails?.[0]?.value || `${profile.username}@github.local`,
            githubId: profile.id,
            profileImage: profile.photos?.[0]?.value,
            authProvider: 'github',
            isEmailVerified: true,
          });

          await user.save();

          const token = generateToken(user._id);
          user.redirectUrl = `${process.env.FRONTEND_URL}?token=${token}`;

          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
}

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
