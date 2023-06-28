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
  url: "/v1/games/:userid/:artistNumberId?",
  method: "get",
  middleware: [middleware.authenticateJWT],
  handler: gameHandler.readGamesByUserId,
  description: "read game by user id ",
};

endpoints.getLeaderboardData = {
  url: "/v1/game/leaderboard/:game_symbol_id",
  method: "get",
  middleware: [],
  handler: gameHandler.getLeaderboardData,
  description: "read leaderboard data based on game symbol id ",
};

endpoints.updateGame = {
  url: "/v1/game/:userid",
  method: "put",
  middleware: [middleware.authenticateJWT],
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

endpoints.getBurnStatus = {
  url: "/v1/game/burn-status/:gameId/:levelId/:userAddress",
  method: "get",
  middleware: [],
  handler: gameHandler.getBurnStatus,
  description: "Get burn status of a user in a game level",
};

/*WEBHOOK EVENTS FROM CROSSMINT*/

endpoints.listenToWebhook = {
  url: "/v1/webhook",
  method: "post",
  middleware: [],
  handler: gameHandler.webhook,
  description: "listen to crossmint webhook",
};

endpoints.getLevelSettings = {
  url: "/v1/level-settings",
  method: "get",
  middleware: [],
  handler: gameHandler.getLevelSettings,
  description: "Get all level settings",
};
module.exports = endpoints;
