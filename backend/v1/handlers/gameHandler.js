"use strict";

var Game = require("../classes/Game");
var ApiError = require("../classes/ApiError");

var gameHandler = {};

gameHandler.read = function (req, res) {
  var id = req.params.id;
  //var userid = req.apiSession.userid;

  if (id) {
    if (id == id) {
      var game = new Game();
      game.read(id).then(
        (game) => {
          res.status(200).send(game);
        },
        (reason) => {
          res.status(400).send(new ApiError(400, reason));
        }
      );
    } else {
      res
        .status(403)
        .send(new ApiError(403, "Access denied, gameid does not match"));
    }
  }
};

gameHandler.create = function (req, res) {
  var game = new Game();
  game.set(req.body); // should be a game object

  if (req.body.user_id === req.user.id) {
    game.create().then(
      (game) => {
        res.status(200).send(game);
      },
      (reject) => {
        res.status(400).send(new ApiError(400, reject));
      }
    );
  }
};

gameHandler.update = function (req, res) {
  var id = req.params.id;
  var game = new Game();
  game.set(req.body);
  //TODO: do we need apiSession and userid?
  //game.id = req.apiSession.userid;

  if (id == id) {
    game.update().then(
      (game) => {
        res.status(200).send(game);
      },
      (reject) => {
        res.status(400).send(new ApiError(400, reject));
      }
    );
  } else {
    res.status(403).send(new ApiError(403, "Access denied"));
  }
};

gameHandler.delete = function (req, res) {
  var id = req.params.id;
  //var userid = req.apiSession.userid;
  if (id == id) {
    var game = new Game();
    game.read(id).then(
      (game) => {
        game.delete().then(
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

module.exports = gameHandler;
