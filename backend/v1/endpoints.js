var endpoints = {};
var userHandler = require("./handlers/userHandler");
var gameHandler = require("./handlers/gameHandler");

var middleware = require("./middleware");

endpoints.createUser = {
  url: "/v1/user",
  method: "post",
  middleware: [],
  handler: userHandler.create,
  description: "create user",
};
endpoints.readUser = {
  url: "/v1/user/:id",
  method: "get",
  middleware: [middleware.authenticateJWT],
  handler: userHandler.read,
  description: "create user",
};

endpoints.loginUser = {
  url: "/v1/user/login/:serviceprovider_name",
  method: "get",
  middleware: [],
  handler: userHandler.loginUser,
  description: "login user",
};

endpoints.updateUser = {
  url: "/v1/user/:id",
  method: "put",
  middleware: [middleware.authenticateJWT],
  handler: userHandler.update,
  description: "update user",
};

endpoints.deleteUser = {
  url: "/v1/user/:id",
  method: "delete",
  middleware: [middleware.authenticateJWT],
  handler: userHandler.delete,
  description: "delete user",
};
/*  */
//Game endpoints
/*  */
endpoints.createGame = {
  url: "/v1/game",
  method: "post",
  middleware: [middleware.authenticateJWT],
  handler: gameHandler.create,
  description: "create game",
};
endpoints.readGame = {
  url: "/v1/game/:id",
  method: "get",
  middleware: [middleware.authenticateJWT],
  handler: gameHandler.read,
  description: "read game",
};

endpoints.readGameByUserId = {
  url: "/v1/games/:userid",
  method: "get",
  middleware: [middleware.authenticateJWT],
  handler: gameHandler.readGamesByUserId,
  description: "read game by user id ",
};

endpoints.updateGame = {
  url: "/v1/game/:id",
  method: "put",
  middleware: [],
  handler: gameHandler.update,
  description: "update game",
};

endpoints.deleteGame = {
  url: "/v1/game/:id",
  method: "delete",
  middleware: [],
  handler: gameHandler.delete,
  description: "delete game",
};

module.exports = endpoints;
