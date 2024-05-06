import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";
import queryString from "query-string";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { google } from "googleapis";

const config = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenUrl: "https://oauth2.googleapis.com/token",
  redirectUrl: process.env.REDIRECT_URL,
  clientUrl: process.env.CLIENT_URL,
  tokenSecret: process.env.TOKEN_SECRET,
  tokenExpiration: 36000,
  postUrl: "https://jsonplaceholder.typicode.com/posts",
};
const oauth2Client = new google.auth.OAuth2(
  config.clientId,
  config.clientSecret,
  config.redirectUrl
);
/**
 * Authorization parameters
 * Link: https://developers.google.com/identity/protocols/oauth2/web-server#creatingclient
 */
const authParams = queryString.stringify({
  client_id: config.clientId,
  redirect_uri: config.redirectUrl,
  response_type: "code",
  scope: "openid profile email https://www.googleapis.com/auth/calendar",
  access_type: "offline",
  state: "standard_oauth",
  prompt: "consent",
});

/**
 * Returns the parameters that is used with the token URL
 * Link: https://developers.google.com/identity/protocols/oauth2/web-server#exchange-authorization-code
 * @param {string} code Authorization code
 * @returns {object} Token url parameters
 */
const getTokenParams = (code) =>
  queryString.stringify({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: config.redirectUrl,
  });

// const app = express();

// // Resolve CORS
// app.use(
//   cors({
//     origin: [config.clientUrl],
//     credentials: true,
//   })
// );

// // Parse cookie
// app.use(cookieParser());

// Verify auth
export const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, config.tokenSecret);
    return next();
  } catch (err) {
    console.error("Error: ", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

/**
 * Returns the url that the client should navigate to
 */
// app.get("/auth/url", (_, res) => {
//   res.json({
//     url: `${config.authUrl}?${authParams}`,
//   });
// });

export const getAuthURL = (_, res) => {
  const url = oauth2Client.generateAuthUrl({
    scope: "openid profile email https://www.googleapis.com/auth/calendar",
    access_type: "offline",
  });
  res.json({
    url: url,
  });
}

export const getAuthToken = async (req, res) => {
  // Extract the code from the query parameter
  const code = req.query.code;
  // Exchange the code for tokens
  oauth2Client.getToken(code as string, (err, tokens) => {
    if (err) {
      // Handle error if token exchange fails
      console.error("Couldn't get token", err);
      res.send("Error");
      return;
    }
    // Set the credentials for the Google API client
    oauth2Client.setCredentials(tokens);
    console.log("tokens", tokens);
    console.log("Successfully logged in");

    if (!tokens.id_token) return res.status(400).json({ message: "Auth error" });
    // Get user info from id token
    const { email, name, picture } = jwt.decode(tokens.id_token);
    console.log("email, name, picture", email, name, picture)
    const user = { name, email, picture };
    // Sign a new token
    const token = jwt.sign({ user }, config.tokenSecret, {
      expiresIn: config.tokenExpiration,
    });
    console.log("hi")
    // Set cookies for user
    res.cookie("token", token, {
      maxAge: config.tokenExpiration,
      httpOnly: true,
    });
    // You can choose to store user in a DB instead
    res.json({
      user,
    });
      // // Notify the user of a successful login
      // res.send("Successfully logged in");
  });
}


export const getAuthLoggedIn = (req, res) => {
  console.log('entering getAuthLoggedIn')
  try {
    // Get token from cookie
    const token = req.cookies.token;
    if (!token) return res.json({ loggedIn: false });
    const { user } = jwt.verify(token, config.tokenSecret);
    const newToken = jwt.sign({ user }, config.tokenSecret, {
      expiresIn: config.tokenExpiration,
    });
    // Reset token in cookie
    res.cookie("token", newToken, {
      maxAge: config.tokenExpiration,
      httpOnly: true,
    });
    console.log("user is logged in (from server)")
    res.json({ loggedIn: true, user });
  } catch (err) {
    res.json({ loggedIn: false });
  }
}

export const getLogout = (_,res) => {
  // clear cookie
  res.clearCookie("token").json({ message: "Logged out" });
}

export const getUserPosts = async (_, res) => {
  try {
    const { data } = await axios.get(config.postUrl);
    res.json({ posts: data?.slice(0, 5) });
  } catch (err) {
    console.error("Error: ", err);
  }
}

const event = {
  summary: "Google I/O 2015",
  location: "800 Howard St., San Francisco, CA 94103",
  description: "A chance to hear more about Google's developer products.",
  start: {
    dateTime: "2015-05-28T09:00:00-07:00",
    timeZone: "America/Los_Angeles",
  },
  end: {
    dateTime: "2015-05-28T17:00:00-07:00",
    timeZone: "America/Los_Angeles",
  },
};

// app.get("/auth/schedule_event", (req, res) => {
//   const calendar = google.calendar({ version: "v3", auth: oauth2Client });
//   calendar.events.insert({
//     calendarId: "primary",
//     requestBody: event,
//   });
//   res.send({ msg: "Done" });
// });

// app.get("/auth/calendar_events", (req, res) => {
//   // google.oauth2('v2').tokeninfo({
//   //   access_token: ACCESS_TOKEN
//   // }, (err, info) => {
//   //   if (err) return console.error('Error fetching token info', err);
//   //   console.log(info.scope); // This will list the scopes the token has access to
//   // });
//   // Get the calendar ID from the query string, default to 'primary'
//   const calendarId = req.query.calendar as string?? "primary" as string;
//   // Create a Google Calendar API client
//   const calendar = google.calendar({ version: "v3", auth: oauth2Client });
//   // List events from the specified calendar
//   calendar.events.list(
//     {
//       calendarId,
//       timeMin: new Date().toISOString(),
//       maxResults: 15,
//       singleEvents: true,
//       orderBy: "startTime",
//     },
//     (err, response) => {
//       if (err) {
//         // Handle error if the API request fails
//         console.error("Can't fetch events");
//         res.send("Error");
//         return;
//       }
//       // Send the list of events as JSON
//       const events = response.data.items;
//       res.json(events);
//     }
//   );
// });