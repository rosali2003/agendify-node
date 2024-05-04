"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
// import queryString from "query-string";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.config = {
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
const authParams = {
    client_id: exports.config.clientId,
    redirect_uri: exports.config.redirectUrl,
    response_type: "code",
    scope: "openid profile email",
    access_type: "offline",
    state: "standard_oauth",
    prompt: "consent",
};
const getTokenParams = (code) => ({
    client_id: exports.config.clientId,
    client_secret: exports.config.clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: exports.config.redirectUrl,
});
let params = new URLSearchParams();
for (const [key, value] of Object.entries(authParams)) {
    params.set(key, value);
}
for (const [key, value] of Object.entries(getTokenParams)) {
    params.set(key, value);
}
const app = (0, express_1.default)();
// Resolve CORS
app.use((0, cors_1.default)({
    origin: [exports.config.clientUrl],
    credentials: true,
}));
// Parse Cookie
app.use((0, cookie_parser_1.default)());
// Verify auth
const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.status(401).json({ message: 'Unauthorized' });
        jsonwebtoken_1.default.verify(token, exports.config.tokenSecret);
        return next();
    }
    catch (err) {
        console.error('Error: ', err);
        res.status(401).json({ message: 'Unauthorized' });
    }
};
app.get('/auth/url', (_, res) => {
    res.json({
        url: `${exports.config.authUrl}?${authParams}`,
    });
});
app.get('/auth/token', async (req, res) => {
    const { code } = req.query;
    if (!code)
        return res.status(400).json({ message: 'Authorization code must be provided' });
    try {
        // Get all parameters needed to hit authorization server
        const tokenParam = getTokenParams(code);
        // Exchange authorization code for access token (id token is returned here too)
        const { data: { id_token }, } = await axios_1.default.post(`${exports.config.tokenUrl}?${tokenParam}`);
        if (!id_token)
            return res.status(400).json({ message: 'Auth error' });
        // Get user info from id token
        const { email, name, picture } = jsonwebtoken_1.default.decode(id_token);
        const user = { name, email, picture };
        // Sign a new token
        const token = jsonwebtoken_1.default.sign({ user }, exports.config.tokenSecret, { expiresIn: exports.config.tokenExpiration });
        // Set cookies for user
        res.cookie('token', token, { maxAge: exports.config.tokenExpiration, httpOnly: true });
        // You can choose to store user in a DB instead
        res.json({
            user,
        });
    }
    catch (err) {
        console.error('Error: ', err);
        res.status(500).json({ message: err.message || 'Server error' });
    }
});
app.get('/auth/logged_in', (req, res) => {
    try {
        // Get token from cookie
        const token = req.cookies.token;
        if (!token)
            return res.json({ loggedIn: false });
        const { user } = jsonwebtoken_1.default.verify(token, exports.config.tokenSecret);
        const newToken = jsonwebtoken_1.default.sign({ user }, exports.config.tokenSecret, { expiresIn: exports.config.tokenExpiration });
        // Reset token in cookie
        res.cookie('token', newToken, { maxAge: exports.config.tokenExpiration, httpOnly: true });
        res.json({ loggedIn: true, user });
    }
    catch (err) {
        res.json({ loggedIn: false });
    }
});
app.post('/auth/logout', (_, res) => {
    // clear cookie
    res.clearCookie('token').json({ message: 'Logged out' });
});
app.get('/user/posts', auth, async (_, res) => {
    try {
        const { data } = await axios_1.default.get(exports.config.postUrl);
        res.json({ posts: data?.slice(0, 5) });
    }
    catch (err) {
        console.error('Error: ', err);
    }
});
//# sourceMappingURL=oauth.js.map