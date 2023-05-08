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
    }
  }

  /*                  */
  /* CRUD OPERATIONS  */
  /*                  */
  create = async () => {
    const game = this;
    const promise = new Promise((resolve, reject) => {
      this.MySQL.pool.getConnection((err, db) => {
        db.query(
          "INSERT INTO `game` (status, user_id, level, artist_name, level_4_claimed_prizes, level_5_claimed_prizes, level_6_claimed_main_prize, claimable_prize_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
          [
            game.status,
            game.user_id,
            game.level,
            game.artist_name,
            game.level_4_claimed_prizes,
            game.level_5_claimed_prizes,
            game.level_6_claimed_main_prize,
            game.claimable_prize_count,
          ],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err));
            } else if (results.length < 1) {
              reject(new ApiError(500, "Game not saved!"));
            } else {
              game.id = results.insertId;
              resolve(game);
            }
            db.release();
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
            "select * from `game` where id = ?",
            [id],
            (err, results, fields) => {
              if (err) {
                reject(new ApiError(500, err));
              } else if (results.length < 1) {
                reject(new ApiError(404, "Game not found"));
              } else {
                game.set(results[0]);
                console.log(results, "results??");
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
    update = async () => {
      const game = this;
      const promise = new Promise((resolve, reject) => {
        this.MySQL.pool.getConnection((err, db) => {
          db.query(
            "UPDATE `game` SET status=?, user_id=?, level=?, artist_name=?, level_4_claimed_prizes=?, level_5_claimed_prizes=?, level_6_claimed_main_prize=?, claimable_prize_count=? WHERE id=?;",
            [
              game.status,
              game.user_id,
              game.level,
              game.artist_name,
              game.level_4_claimed_prizes,
              game.level_5_claimed_prizes,
              game.level_6_claimed_main_prize,
              game.claimable_prize_count,
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
}

module.exports = Game;
