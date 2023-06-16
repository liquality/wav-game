"use strict";

var Game = require("../classes/Game");
var ApiError = require("../classes/ApiError");
const { helperFindArtistNumberIdByTokenId } = require("../helper");

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

gameHandler.readGamesByUserId = function (req, res) {
  const userid = Number(req.params.userid);
  const gameNumberId = Number(req.params.artistNumberId);
  const userIdFromSession = req.user.id;

  if (userid) {
    if (userid === userIdFromSession) {
      var game = new Game();
      game.readGameByUserId(userid, gameNumberId).then(
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

gameHandler.getLeaderboardData = function (req, res) {
  const gameId = Number(req.params.game_symbol_id);
  console.log("leaderboard", gameId);
  if (gameId) {
    var game = new Game();
    game.getLeaderboardData(gameId).then(
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
  var game = new Game();
  game.set(req.body);
  const userid = Number(req.params.userid);
  const userIdFromSession = req.user.id;
  console.log("why do i come here lol??");
  if (userid == userIdFromSession) {
    game.update().then(
      (game) => {
        res.status(200).send(game);
      },
      (reject) => {
        res.status(400).send(new ApiError(400, reject));
      }
    );
  } else {
    res.status(403).send(new ApiError(403, "Access denied, update"));
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
    res.status(403).send(new ApiError(403, "Access denied for delete game"));
  }
};

gameHandler.levelUpTrade = function (req, res) {
  console.log("BÄÄÄ");
  const gameId = req.body.gameId;
  const userId = req.body.userId;
  const userIdFromSession = req.user.id;

  console.log(userId, "userids", userIdFromSession);
  if (userId && gameId) {
    if (userId === userIdFromSession) {
      const game = new Game();
      console.log("bä");
      game.levelUpTrade(userId, gameId).then(
        (game) => {
          console.log("not here");
          res.status(200).send(game);
        },
        (reject) => {
          res.status(400).send(new ApiError(400, reject));
        }
      );
    } else {
      res.status(400).send(new ApiError(400, reason));
    }
  } else {
    res.status(403).send(new ApiError(403, "Access denied for level up"));
  }
};

gameHandler.webhook = async function (req, res) {
  console.log(req.body, "req body???");
  const { status, tokenIds } = req.body;
  if (status === "success") {
    const artistNumberId = await helperFindArtistNumberIdByTokenId(tokenIds);
    console.log(artistNumberId, "artist nr id");
    const game = new Game();
    game.levelUpOnboarding(req.body.walletAddress, artistNumberId).then(
      (game) => {
        console.log("webhook successfull");
        res.status(200).send(game);
      },
      (reject) => {
        res.status(400).send(new ApiError(400, reject));
      }
    );
  } else {
    res.status(400).send(new ApiError(400, reason));
  }
};

module.exports = gameHandler;
