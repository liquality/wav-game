var endpoints = {};
var userHandler = require("./handlers/userHandler");
var middleware = require("./middleware");

endpoints.createUser = {
  url: "/v1/user",
  method: "post",
  middleware: [],
  handler: userHandler.create,
  description: "create user",
};
endpoints.createUser = {
  url: "/v1/user/:id",
  method: "get",
  middleware: [],
  handler: userHandler.read,
  description: "create user",
};

endpoints.updateUser = {
  url: "/v1/user/:id",
  method: "put",
  middleware: [],
  handler: userHandler.update,
  description: "update user",
};

endpoints.deleteUser = {
  url: "/v1/user/:id",
  method: "delete",
  middleware: [],
  handler: userHandler.delete,
  description: "delete user",
};

module.exports = endpoints;
