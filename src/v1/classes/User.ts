import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import MySQL from "../../MySQL";
import ApiError from "./ApiError";
import db from "../../config";

class User {
  vault_id?: number;
  username?: string;
  registation_timestamp?: number;

  constructor(user?: {
    vault_id?: number;
    username?: string;
    registation_timestamp?: number;
  }) {
    this.set(user);
  }

  set(user?: {
    vault_id?: number;
    username?: string;
    registation_timestamp?: number;
  }) {
    if (user !== undefined) {
      this.vault_id = user.vault_id;
      this.username = user.username;
      this.registation_timestamp = user.registation_timestamp;
    }
  }

  /*                  */
  /* CRUD OPERATIONS  */
  /*                  */
  create = async (): Promise<User | undefined> => {
    const user = this;
    return new Promise<User | undefined>(async (resolve, reject) => {
      const userTable = `user_421613_197`;

      try {
        // Insert a row into the table
        const { meta: insert } = await db
          .prepare(
            `INSERT INTO ${userTable} (user_id, username, registation_timestamp) VALUES (?, ?, ?);`
          )
          .bind(user.vault_id, user.username, user.registation_timestamp)
          .run();

        // Wait for transaction finality
        const status = await insert.txn?.wait();

        console.log(status, "status of waiting for tx");

        // Perform a read query, requesting all rows from the table
        const { results } = await db
          .prepare(`SELECT * FROM ${userTable};`)
          .all();

        return { success: true };
      } catch (e: any) {
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
