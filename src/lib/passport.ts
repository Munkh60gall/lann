import passport from "passport";
import passportSteam from "passport-steam";

const SteamStrategy = passportSteam.Strategy;

export interface SteamProfile {
  _json: {
    avatarfull: string;
    profileurl: string;
    communityvisibilitystate: number;
    personaname: string;
    personastate: number;
    personastateflags: number;
    primaryclanid: number;
    profilestate: number;
  };
  displayName: string;
  id: string;
  identifier: string;
  photos: Image;
  provider: string;
}

interface Image {
  value: string;
}
// ...

passport.serializeUser(function (user, done) {
  console.log("Serializing user:", user);
  done(null, user);
});

passport.deserializeUser(function (obj: SteamProfile, done) {
  console.log("Deserializing user:", obj);
  done(null, obj);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: `${process.env.DOMAIN}/api/auth/return`,
      realm: `${process.env.DOMAIN}/`,
      apiKey: `${process.env.STEAM_API_KEY}`,
      // returnURL: `https://lann-test.netlify.app/api/auth/return`,
      // realm: `https://lann-test.netlify.app/`,
      // apiKey: `F3051B7C4B5A0FA2D4AC2C6E19956E78`,
    },
    (
      _: string,
      profile: SteamProfile,
      done: (a: null | string, b: SteamProfile) => typeof done
    ) => {
      console.log("Steam authentication callback - received profile:", profile);

      // Fetch any more information to populate

      console.log("Fetching more information...");

      // Simulate fetching more information, then return the profile
      setTimeout(() => {
        console.log("Fetched more information, returning profile:", profile);
        return done(null, profile);
      }, 1000);
    }
  )
);

export default passport;
