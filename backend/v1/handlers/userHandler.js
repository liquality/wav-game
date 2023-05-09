"use strict";

var User = require("../classes/User");
var ApiError = require("../classes/ApiError");

var userHandler = {};

//Add JWT token for session management

userHandler.read = function (req, res) {
  var id = req.params.id;
  //var userid = req.apiSession.userid;

  if (id) {
    if (id == id) {
      var user = new User();
      user.read(id).then(
        (user) => {
          console.log(user, "USER?");
          res.status(200).send(user);
        },
        (reason) => {
          res.status(400).send(new ApiError(400, reason));
        }
      );
    } else {
      res
        .status(403)
        .send(new ApiError(403, "Access denied, userid does not match"));
    }
  }
};

userHandler.create = function (req, res) {
  var user = new User();
  user.set(req.body); // should be a user object
  user.create().then(
    (user) => {
      res.status(200).send(user);
    },
    (reject) => {
      res.status(400).send(new ApiError(400, reject));
    }
  );
};

userHandler.update = function (req, res) {
  var id = req.params.id;
  var user = new User();
  user.set(req.body);
  //TODO: do we need apiSession and userid?
  user.id = req.apiSession.userid;

  if (id == user.id) {
    user.update().then(
      (user) => {
        res.status(200).send(user);
      },
      (reject) => {
        res.status(400).send(new ApiError(400, reject));
      }
    );
  } else {
    res.status(403).send(new ApiError(403, "Access denied"));
  }
};

userHandler.delete = function (req, res) {
  var id = req.params.id;
  var userid = req.apiSession.userid;
  if (id == userid) {
    var user = new User();
    user.read(id).then(
      (user) => {
        user.delete().then(
          (result) => {
            res.status(200).send({});
          },
          (reject) => {
            res.status(400).send(new ApiError(400, reject));
          }
        );
      },
      (reason) => {
        res.status(400).send(new ApiError(400, reason));
      }
    );
  } else {
    res.status(403).send(new ApiError(403, "Access denied"));
  }
};

module.exports = userHandler;
