const MySQL = require("../../MySQL");
const ApiError = require("./ApiError");

class LevelSetting {
  constructor() {}
  
  getAll = async () => {
    return new Promise((resolve, reject) => {
      MySQL.pool.getConnection((error, db) => {
        if (!error) {
          db.execute(
            "select * from `level_setting`",
            [],
            (err, results) => {
              db.release();
              if (err) {
                reject(new ApiError(500, err));
              } else {
                resolve(results);
              }
            }
          );
        } else {
          reject(new ApiError(500, error));
        }
      });
    });
  };
}

module.exports = LevelSetting;
