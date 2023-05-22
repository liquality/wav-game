const MySQL = require("../../MySQL");
const ApiError = require("./ApiError");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

class User {
  constructor(user) {
    this.set(user);
  }

  set(user) {
    if (typeof user !== "undefined") {
      this.id = user.id;
      this.google_email = user.google_email;
      this.username = user.username;
      this.avatar = user.avatar;
      this.public_address = user.public_address;
    }
  }

  /*                  */
  /* CRUD OPERATIONS  */
  /*                  */
  create = async () => {
    const user = this;
    console.log(user, "GETTING HERE USER?");
    const promise = new Promise((resolve, reject) => {
      MySQL.pool.getConnection((err, db) => {
        db.query(
          "insert into `user` (google_email,username,avatar,public_address) values (?,?,?,?);",
          [user.google_email, user.username, user.avatar, user.public_address],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err));
            } else if (results.length < 1) {
              reject(new ApiError(500, "User not saved!"));
            } else {
              const { id, google_email, username, avatar, public_address } =
                user;
              const token = jwt.sign(
                { id, google_email, username, avatar, public_address },
                "my-secret"
              );
              resolve(user, token);
            }
            db.release();
          }
        );
      });
    });
    return promise;
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
                reject(new this.ApiError(500, err));
              } else if (results.length < 1) {
                reject(new this.ApiError(404, "User not found"));
              } else {
                user.set(results[0]);
                resolve(user);
              }
              db.release();
            }
          );
        });
      } else {
        reject(new this.ApiError(500, "Missing user id"));
      }
    });
    return promise;
  };

  update = async () => {
    update = async () => {
      const user = this;
      const promise = new Promise((resolve, reject) => {
        this.MySQL.pool.getConnection((err, db) => {
          db.query(
            "update `user` set google_email=?, username=?, avatar=?, public_address=? where id=?;",
            [
              user.google_email,
              user.username,
              user.avatar,
              user.public_address,
              user.id,
            ],
            (err, results, fields) => {
              if (err) {
                reject(new this.ApiError(500, err));
              } else if (results.affectedRows < 1) {
                reject(new this.ApiError(404, "User not found!"));
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
                reject(new this.ApiError(500, err));
              } else if (results.length < 1) {
                reject(new this.ApiError(400, "Nothing deleted"));
              } else {
                resolve();
              }
              db.release();
            }
          );
        });
      } else {
        reject(new this.ApiError(400, "Missing user id"));
      }
    });
    return promise;
  };
}

/* HELPER FUNCTIONS */

module.exports = User;
