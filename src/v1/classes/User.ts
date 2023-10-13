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

      // Insert a row into the table
      const { meta: insert } = await db
        .prepare(
          `INSERT INTO ${userTable} (user_id, username, registation_timestamp) VALUES (?, ?, ?);`
        )
        .bind(user.vault_id, user.username, user.registation_timestamp)
        .run();

      // Wait for transaction finality
      await insert.txn?.wait();

      // Perform a read query, requesting all rows from the table
      const { results } = await db.prepare(`SELECT * FROM ${userTable};`).all();

      console.log({ results }, "aaaa");

      // MySQL.pool.getConnection((err, db) => {
      //   db.query(
      //     "INSERT INTO `user` (username, registation_timestamp) VALUES (?,  UTC_TIMESTAMP());",
      //     [user.username],
      //     (err, results, fields) => {
      //       if (err) {
      //         reject(new ApiError(500, err.toString()));
      //       } else {
      //         // Check if results is an OkPacket (type guard)
      //         if ("insertId" in results) {
      //           const groupId = results.insertId;
      //           // Create a query to select the newly inserted user
      //           db.query(
      //             "SELECT * FROM `user` WHERE vault_id = ?",
      //             [groupId],
      //             (err, results: RowDataPacket[], fields) => {
      //               if (err) {
      //                 reject(new ApiError(500, err.toString()));
      //               } else {
      //                 // Resolve with the selected user object
      //                 const newUser = new User(results[0] as User);
      //                 resolve(newUser);
      //               }
      //               db.release();
      //             }
      //           );
      //         } else {
      //           // Handle the case where results is not an OkPacket
      //           reject(new ApiError(500, "Unexpected result format"));
      //           db.release();
      //         }
      //       }
      //       db.release();
      //     }
      //   );
      // });
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
