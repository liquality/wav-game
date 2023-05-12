//var Quota = require("./classes/Quota");
var ApiError = require("./classes/ApiError");
const jwt = require("jsonwebtoken");

var config = require("../config.json");

var middleware = {};

// Middleware function to authenticate JWT token
middleware.authenticateToken = function (req, res, next) {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  // If no token is provided, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  //TODO: add secret in env variable/config file
  // Verify the token
  jwt.verify(token, "my-secret", (err, user) => {
    if (err) {
      // If the token is invalid, return a 403 Forbidden response
      return res.status(403).json({ error: "Invalid token" });
    }

    // If the token is valid, attach the decoded user to the request object for further use
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  });
};

middleware.service = function (req, res, next) {
  if (req.connection.localAddress === req.connection.remoteAddress) {
    // only allow localhost to connect
    next();
  } else {
    // check whitelist if any other hosts should be allowed
    let whitelist = config.service.whitelist;
    let found = false;
    for (let i = 0; i < whitelist.length; i++) {
      if (whitelist[i] == req.connection.remoteAddress) {
        found = true;
        next();
      }
    }
    // only send response if no match was found
    if (!found) {
      res.status(401).send(new ApiError("Unauthorized access"));
    }
  }
};

middleware.responseHeaders = function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", config.site.url);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE,HEAD"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "x-session,X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

middleware.authenticate = function (req, res, next) {
  if (true) {
    if (req.apiSession) {
      next();
    } else {
      res.status(401).send(new ApiError("No sessionstring supplied"));
    }
  } else {
    res.status(418).send(new ApiError("If true is false then I'm a teapot!"));
  }
};

middleware.quota = function (req, res, next) {
  if (true) {
    Quota.checkQuota(req).then(
      () => {
        next();
      },
      (reason) => {
        res.status(429).send(reason);
      }
    );
  } else {
    res.status(418).send(new ApiError("If true is false then I'm a teapot!"));
  }
};

middleware.adminArea = function (req, res, next) {
  if (req.apiSession.is_admin) {
    next();
  } else {
    res.status(403).send({ message: "Access denied" });
  }
};

module.exports = middleware;
