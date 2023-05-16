var express = require("express");
var app = express();
var v1 = require("./v1/");
var bodyParser = require("body-parser");
var { expressjwt: jwt } = require("express-jwt");

var appPort = process.env.PORT || 3000;

//app.use(v1);
const secret = "my-secret";

// Configure express-jwt middleware
app.use(
  bodyParser.json({ limit: "5mb" }),
  jwt({
    secret: secret,
    algorithms: ["HS256"],
    // Optional: Customize the request property name where the decoded token will be attached (default: 'user')
    // requestProperty: 'auth',
    // Optional: Add additional options if needed
    // ...other options
  }).unless({ path: ["/v1/user"], method: ["POST"] }), // Exclude '/v1/user' path from JWT authentication
  v1
);

// requires access to lower ports
console.log(
  "\n\nIF THIS THROWS AN ERROR -\nMAKE SURE YOU ARE ALLOWED TO OPEN PORT 3000!\n\n"
);
app.listen(appPort);
