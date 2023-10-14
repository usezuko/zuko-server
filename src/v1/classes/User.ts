import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import MySQL from "../../MySQL";
import ApiError from "./ApiError";
import db from "../../config";

const userTable = `user2_421613_199`;
const currentTimestamp = Math.floor(new Date().getTime() / 1000);

class User {
  success?: boolean;
  vault_id?: string;
  username?: string;
  registration_timestamp?: number;

  constructor(user?: {
    success?: boolean;
    vault_id?: string;
    username?: string;
    registration_timestamp?: number;
  }) {
    this.set(user);
  }

  set(user?: {
    success?: boolean;
    vault_id?: string;
    username?: string;
    registration_timestamp?: number;
  }) {
    if (user !== undefined) {
      this.success = user.success;
      this.vault_id = user.vault_id;
      this.username = user.username;
      this.registration_timestamp = user.registration_timestamp;
    }
  }

  /*                  */
  /* CRUD OPERATIONS  */
  /*                  */
  create = async (): Promise<User | undefined> => {
    const user = this;
    return new Promise<User | undefined>(async (resolve, reject) => {
      try {
        // Insert a row into the table
        const { error, meta: insert } = await db
          .prepare(
            `INSERT INTO ${userTable} (vault_id, username, registration_timestamp) VALUES (?, ?, ?);`
          )
          .bind(user.vault_id, user.username, currentTimestamp)
          .run();

        // Wait for transaction finality
        const status = await insert.txn?.wait();
        console.log(status, "status of waiting for tx");

        const newUser = new User({
          success: true,
          vault_id: user.vault_id,
          username: user.username,
          registration_timestamp: user.registration_timestamp,
        });

        resolve(newUser);
      } catch (e: any) {
        console.log(e);
        return {
          success: false,
          message: e.message,
          cause: e.cause.message,
        };
      }
    });
  };

  read = async (vault_id: number): Promise<User | undefined> => {
    const user = this;
    return new Promise<User | undefined>((resolve, reject) => {
      /*    if (vault_id) {
           MySQL.pool.getConnection((err, db) => {
             db.execute(
               "SELECT * FROM `user` WHERE user_id = ?",
               [vault_id],
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
           reject(new ApiError(500, "Missing user vault_id"));
         } */
    });
  };

  delete = async (vault_id: number): Promise<void> => {
    const game = this;
    return new Promise<void>((resolve, reject) => {
      /*      if (vault_id) {
             MySQL.pool.getConnection((err, db) => {
               db.execute(
                 "DELETE FROM `game` WHERE `vault_id` = ?",
                 [vault_id],
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
             reject(new ApiError(400, "Missing game vault_id"));
           } */
    });
  };
}

export default User;
