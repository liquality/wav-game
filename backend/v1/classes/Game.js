const MySQL = require("../../MySQL");
const ApiError = require("./ApiError");

class Game {
  constructor(game) {
    this.set(game);
  }

  set(game) {
    if (typeof game !== "undefined") {
      this.id = game.id;
      this.status = game.status;
      this.user_id = game.user_id;
      this.level = game.level;
      this.artist_name = game.artist_name;
      this.level_4_claimed_prizes = game.level_4_claimed_prizes;
      this.level_5_claimed_prizes = game.level_5_claimed_prizes;
      this.level_6_claimed_main_prize = game.level_6_claimed_main_prize;
      this.claimable_prize_count = game.claimable_prize_count;
      this.game_symbol_id = game.game_symbol_id;
      this.created_at = game.created_at;
    }
  }

  /*                  */
  /* CRUD OPERATIONS  */
  /*                  */

  create = async () => {
    const game = this;
    const promise = new Promise((resolve, reject) => {
      MySQL.pool.getConnection((err, db) => {
        db.query(
          "SELECT COUNT(*) AS count FROM `game` WHERE user_id = ? AND game_symbol_id = ?",
          [game.user_id, game.game_symbol_id],
          (err, results) => {
            if (err) {
              reject(new ApiError(500, err));
              db.release();
              return;
            }
            const rowCount = results[0].count;

            if (rowCount > 0) {
              // Update existing row
              db.query(
                "UPDATE `game` SET status=?, level=?, artist_name=?, level_4_claimed_prizes=?, level_5_claimed_prizes=?, level_6_claimed_main_prize=?, claimable_prize_count=? WHERE user_id=? AND game_symbol_id=?;",
                [
                  "in_progress",
                  game.level,
                  game.artist_name,
                  game.level_4_claimed_prizes,
                  game.level_5_claimed_prizes,
                  game.level_6_claimed_main_prize,
                  game.claimable_prize_count,
                  game.user_id,
                  game.game_symbol_id,
                ],
                (err, results, fields) => {
                  if (err) {
                    reject(new ApiError(500, err));
                  } else if (results.affectedRows < 1) {
                    reject(new ApiError(404, "Game not found!"));
                  } else {
                    resolve(game);
                  }
                  db.release();
                }
              );
            } else {
              // Insert new row
              db.query(
                "INSERT INTO `game` (status, user_id, level, artist_name, level_4_claimed_prizes, level_5_claimed_prizes, level_6_claimed_main_prize, claimable_prize_count, game_symbol_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, UTC_TIMESTAMP());",
                [
                  "in_progress",
                  game.user_id,
                  1,
                  game.artist_name,
                  game.level_4_claimed_prizes,
                  game.level_5_claimed_prizes,
                  game.level_6_claimed_main_prize,
                  game.claimable_prize_count,
                  game.game_symbol_id,
                ],
                (err, results, fields) => {
                  if (err) {
                    reject(new ApiError(500, err));
                  } else {
                    game.id = results.insertId;
                    resolve(game);
                  }
                  db.release();
                }
              );
            }
          }
        );
      });
    });
    return promise;
  };

  read = async (id) => {
    const game = this;
    const promise = new Promise((resolve, reject) => {
      if (id) {
        MySQL.pool.getConnection((err, db) => {
          db.execute(
            "select * from `game` where user_id = ?",
            [id],
            (err, results, fields) => {
              if (err) {
                reject(new ApiError(500, err));
              } else if (results.length < 1) {
                reject(new ApiError(404, "Game not found"));
              } else {
                game.set(results[0]);
                resolve(game);
              }
              db.release();
            }
          );
        });
      } else {
        reject(new ApiError(500, "Missing game id"));
      }
    });
    return promise;
  };

  update = async () => {
    const game = this;
    const promise = new Promise((resolve, reject) => {
      MySQL.pool.getConnection((err, db) => {
        db.query(
          "UPDATE `game` SET status=?, user_id=?, level=?, artist_name=?, level_4_claimed_prizes=?, level_5_claimed_prizes=?, level_6_claimed_main_prize=?, claimable_prize_count=?, game_symbol_id=? WHERE id=?;",
          [
            game.status,
            game.user_id,
            game.level,
            game.artist_name,
            game.level_4_claimed_prizes,
            game.level_5_claimed_prizes,
            game.level_6_claimed_main_prize,
            game.claimable_prize_count,
            game.game_symbol_id,
            game.id,
          ],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err));
            } else if (results.affectedRows < 1) {
              reject(new ApiError(404, "Game not found!"));
            } else {
              resolve(game);
            }
            db.release();
          }
        );
      });
    });
    return promise;
  };

  delete = async (id) => {
    const game = this;
    const promise = new Promise((resolve, reject) => {
      if (id) {
        this.MySQL.pool.getConnection((err, db) => {
          db.execute(
            "delete from `game` where `id` = ?",
            [id],
            (err, results, fields) => {
              if (err) {
                reject(new ApiError(500, err));
              } else if (results.length < 1) {
                reject(new ApiError(400, "Nothing deleted"));
              } else {
                resolve();
              }
              db.release();
            }
          );
        });
      } else {
        reject(new ApiError(400, "Missing game id"));
      }
    });
    return promise;
  };

  readGameByUserId = async (userId, gameNumberId, helper) => {
    const game = this;
    const promise = new Promise((resolve, reject) => {
      if (userId) {
        MySQL.pool.getConnection((err, db) => {
          if (gameNumberId) {
            db.execute(
              "SELECT * FROM `game` WHERE user_id = ? AND game_symbol_id = ?",
              [userId, gameNumberId],
              (err, results, fields) => {
                if (err) {
                  reject(new ApiError(500, err));
                } else if (results.length < 1) {
                  if (helper) {
                    resolve(null);
                  } else {
                    reject(new ApiError(404, "Game not found"));
                  }
                } else {
                  game.set(results[0]);
                  resolve(results[0]);
                }
                db.release();
              }
            );
          } else {
            db.execute(
              "select * from `game` where user_id = ?",
              [userId],
              (err, results, fields) => {
                if (err) {
                  reject(new ApiError(500, err));
                } else if (results.length < 1) {
                  reject(new ApiError(404, "Game not found"));
                } else {
                  game.set(results[0]);
                  resolve(results);
                }
                db.release();
              }
            );
          }
        });
      } else {
        reject(new ApiError(500, "Missing user id"));
      }
    });
    return promise;
  };
  getLeaderboardData = async (gameId) => {
    const promise = new Promise((resolve, reject) => {
      MySQL.pool.getConnection((err, db) => {
        db.execute(
          "SELECT level, COUNT(DISTINCT user_id) AS userCount FROM `game` WHERE game_symbol_id = ? GROUP BY level",
          [gameId],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err));
            } else {
              const leaderboardData = {};
              results.forEach((row) => {
                leaderboardData[`level${row.level}`] = row.userCount;
              });
              resolve(leaderboardData);
            }
            db.release();
          }
        );
      });
    });
    return promise;
  };

  readUserByWalletAddress = async (address) => {
    const promise = new Promise((resolve, reject) => {
      if (address) {
        MySQL.pool.getConnection((err, db) => {
          db.execute(
            "SELECT * FROM `user` WHERE public_address = ?",
            [address],
            (err, results, fields) => {
              if (err) {
                reject(new ApiError(500, err));
              } else if (results.length < 1) {
                reject(new ApiError(404, "User with wallet address not found"));
              } else {
                resolve(results[0]);
              }
              db.release();
            }
          );
        });
      } else {
        reject(new ApiError(500, "Missing wallet address"));
      }
    });
    return promise;
  };

  getLevelBurnStatus = async (gameId, levelId, userAddress) => {
    const promise = new Promise((resolve, reject) => {
      if (gameId > 0 && levelId > 0 && userAddress != "") {
        MySQL.pool.getConnection((err, db) => {
          db.execute(
            "SELECT * FROM `level_burn_status` WHERE user_address = ? AND level_id = ? AND game_id = ?;",
            [userAddress, levelId, gameId],
            (err, results, fields) => {
              if (err) {
                reject(new ApiError(500, err));
              } else if (results.length < 1) {
                reject(new ApiError(404, "Burn status not found for request"));
              } else {
                resolve(results[0]);
              }
              db.release();
            }
          );
        });
      } else {
        reject(new ApiError(500, "Params not valid"));
      }
    });
    return promise;
  };

  updateLevelBurnStatus = async () => {
    const levelBurnData = this;
    const promise = new Promise((resolve, reject) => {
      this.MySQL.pool.getConnection((err, db) => {
        db.query(
          "UPDATE `level_burn_status` SET status=?, last_block=?, WHERE WHERE user_address = ? AND level_id = ? AND game_id = ?;",
          [
            levelBurnData.status,
            levelBurnData.lastBlock,
            levelBurnData.userAddress,
            levelBurnData.levelId,
            levelBurnData.gameId,
          ],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err));
            } else if (results.affectedRows < 1) {
              reject(new ApiError(404, "Record not found!"));
            } else {
              resolve(game);
            }
            db.release();
          }
        );
      });
    });
    return promise;
  };
}

module.exports = Game;
