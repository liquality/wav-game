const MySQL = require("../../MySQL");
const ApiError = require("./ApiError");

class Burn {
  constructor(burn) {
    this.set(burn);
  }

  set(burn) {
    if (typeof burn !== "undefined") {
        this.status = burn.status
        this.lastBlock = burn.lastBlock
        this.userAddress = burn.userAddress
        this.levelId = burn.levelId
        this.gameId = burn.gameId
    }
  }

  /*                  */
  /* CRUD OPERATIONS  */
  /*                  */

  createLevelBurnStatus = async () => {
    const levelBurnData = this;
    const promise = new Promise((resolve, reject) => {
      MySQL.pool.getConnection((err, db) => {
        // Insert new row
        db.query(
          "INSERT INTO `level_burn_status` (status, last_block, user_address, level_id, game_id) VALUES (?, ?, ?, ?, ?);",
          [
            levelBurnData.status,
            levelBurnData.lastBlock,
            levelBurnData.userAddress,
            levelBurnData.levelId,
            levelBurnData.gameId
          ],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err));
            } else {
              levelBurnData.id = results.insertId;
              resolve(levelBurnData);
            }
            db.release();
          }
        );
      })
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
    
  }

  updateLevelBurnStatus = async () => {
    const levelBurnData = this;
    const promise = new Promise((resolve, reject) => {
      MySQL.pool.getConnection((err, db) => {
        db.query(
          "UPDATE `level_burn_status` SET status=?, last_block=? WHERE user_address = ? AND level_id = ? AND game_id = ?;",
          [
            levelBurnData.status,
            levelBurnData.lastBlock,
            levelBurnData.userAddress,
            levelBurnData.levelId,
            levelBurnData.gameId
          ],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err));
            } else if (results.affectedRows < 1) {
              reject(new ApiError(404, "Record not found!"));
            } else {
              resolve(levelBurnData);
            }
            db.release();
          }
        );
      });
    });
    return promise;
  };
}

module.exports = Burn;
