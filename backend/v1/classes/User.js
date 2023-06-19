const MySQL = require("../../MySQL");
const ApiError = require("./ApiError");
const jwt = require("jsonwebtoken");

class User {
  constructor(user) {
    this.set(user);
  }

  set(user) {
    if (typeof user !== "undefined") {
      this.id = user.id;
      this.serviceprovider_name = user.serviceprovider_name;
      this.username = user.username;
      this.avatar = user.avatar
        ? Buffer.from(user.avatar).toString("utf8")
        : null;
      this.public_address = user.public_address;
    }
  }

  async getUserByServiceProviderName(name) {
    return new Promise((resolve, reject) => {
      MySQL.pool.getConnection((error, db) => {
        if (!error) {
          db.execute(
            "select * from `user` where serviceprovider_name = ?",
            [name],
            (err, results) => {
              if (err) {
                reject(new ApiError(500, err));
              } else if (results.length < 1) {
                resolve(null);
              } else {
                resolve(results[0]);
              }
              db.release();
            }
          );
        } else {
          reject(new ApiError(500, error));
        }
      });
    });
  }

  /*                  */
  /* CRUD OPERATIONS  */
  /*                  */
  create = async () => {
    const user = this;
    return new Promise((resolve, reject) => {
      MySQL.pool.getConnection((error, db) => {
        if (!error) {
          db.query(
            `INSERT INTO user (serviceprovider_name, username, avatar, public_address)
                  VALUES (?, ?, ?, ?)
                  ON DUPLICATE KEY UPDATE
                      serviceprovider_name = VALUES(serviceprovider_name),
                      username = VALUES(username),
                      avatar = VALUES(avatar),
                      public_address = VALUES(public_address);
                      `,
            [
              user.serviceprovider_name,
              user.username,
              user.avatar,
              user.public_address,
            ],
            (err, insertResult) => {
              console.log(err, "insertres?");
              if (err) {
                reject(new ApiError(500, err));
              } else if (insertResult.affectedRows < 1) {
                reject(new ApiError(500, "User not saved!"));
              } else {
                db.query(
                  "SELECT LAST_INSERT_ID() AS id",
                  (err, selectResult) => {
                    if (err) {
                      reject(new ApiError(500, err));
                    } else {
                      const {
                        serviceprovider_name,
                        avatar,
                        username,
                        public_address,
                      } = user;
                      const id = selectResult[0].id;
                      const token = jwt.sign(
                        { id, public_address },
                        "my-secret"
                      );
                      resolve({
                        id,
                        serviceprovider_name,
                        avatar,
                        username,
                        public_address,
                        token,
                      });
                    }
                  }
                );
              }
              db.release();
            }
          );
        } else {
          reject(new ApiError(500, error));
        }
      });
    });
  };

  read = async (id) => {
    const user = this;
    const promise = new Promise((resolve, reject) => {
      if (id) {
        MySQL.pool.getConnection((err, db) => {
          db.execute(
            "select * from `user` where id = ?",
            [id],
            (err, results, fields) => {
              if (err) {
                reject(new ApiError(500, err));
              } else if (results.length < 1) {
                reject(new ApiError(404, "User not found"));
              } else {
                user.set(results[0]);
                resolve(user);
              }
              db.release();
            }
          );
        });
      } else {
        reject(new ApiError(500, "Missing user id"));
      }
    });
    return promise;
  };

  update = async () => {
    const user = this;
    const promise = new Promise((resolve, reject) => {
      this.MySQL.pool.getConnection((err, db) => {
        db.query(
          "update `user` set serviceprovider_name=?, username=?, avatar=?, public_address=? where id=?;",
          [
            user.serviceprovider_name,
            user.username,
            user.avatar,
            user.public_address,
            user.id,
          ],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err));
            } else if (results.affectedRows < 1) {
              reject(new ApiError(404, "User not found!"));
            } else {
              resolve(user);
            }
            db.release();
          }
        );
      });
    });
    return promise;
  };

  delete = async (id) => {
    const user = this;
    const promise = new Promise((resolve, reject) => {
      if (id) {
        this.MySQL.pool.getConnection((err, db) => {
          db.execute(
            "delete from `user` where `id` = ?",
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
        reject(new ApiError(400, "Missing user id"));
      }
    });
    return promise;
  };

  loginUser = async (serviceprovider_name) => {
    const promise = new Promise((resolve, reject) => {
      MySQL.pool.getConnection((err, db) => {
        db.query(
          "SELECT * FROM `user` WHERE serviceprovider_name = ? LIMIT 1;",
          [serviceprovider_name],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err));
            } else if (results.length < 1) {
              resolve({});
            } else {
              const storedUser = results[0];
              const {
                id,
                serviceprovider_name,
                avatar,
                username,
                public_address,
              } = storedUser;
              const token = jwt.sign({ id, public_address }, "my-secret");
              resolve({
                id,
                serviceprovider_name,
                avatar,
                username,
                public_address,
                token,
              });
            }
            db.release();
          }
        );
      });
    });
    return promise;
  };
}

/* HELPER FUNCTIONS */

module.exports = User;
