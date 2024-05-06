import express from "express";
export const oauthRouter = express.Router();

import {
  getAuthURL,
  getAuthToken,
  getAuthLoggedIn,
  getLogout,
  auth,
  getUserPosts,
} from "../controllers/oauth_controller.js";

console.log('enters task router');
oauthRouter.get("/url", getAuthURL);
oauthRouter.get("/token", getAuthToken);
oauthRouter.get("/logged_in", getAuthLoggedIn);
oauthRouter.get("/logout", getLogout);


///user/posts, change the uri from frontend
oauthRouter.get('user/posts', auth, getUserPosts)
