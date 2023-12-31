import ApiError from "./ApiError";
import db from "../../config";
import dotenv from "dotenv";
dotenv.config();

const userTable = process.env.TABLELAND_USER_DATABASE;
const userCommunityTable = process.env.TABLELAND_USER_COMMUNITY_DATABASE;
const currentTimestamp = Math.floor(new Date().getTime() / 1000);

type UserCommunity = {
  success: boolean;
  vault_id: string;
  group_id: string;
};

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
  // create a new user
  create = async (): Promise<User | undefined> => {
    const user = this;
    return new Promise<User | undefined>(async (resolve, reject) => {
      try {
        const { results } = await db
          .prepare(`SELECT * FROM ${userTable} WHERE username = ?1`)
          .bind(user.username)
          .all();

        if (results.length > 0) {
          reject("Username already exists");
        } else {
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
        }
      } catch (e: any) {
        console.log(e);
        reject({
          success: false,
          message: e.message,
          cause: e.cause.message,
        });
      }
    });
  };

  // add a user (vault id) to a community (group id)
  createVaultIdToGroupId = async (
    group_id: string,
    vault_id: string
  ): Promise<UserCommunity | undefined> => {
    const user = this;
    return new Promise<UserCommunity | undefined>(async (resolve, reject) => {
      try {
        const { results } = await db
          .prepare(
            `SELECT * FROM ${userCommunityTable} WHERE group_id = ?1 AND vault_id =?2`
          )
          .bind(group_id, vault_id)
          .all();

        if (results.length > 0) {
          const userAlreadyInCommunity = {
            success: true,
            vault_id: vault_id,
            group_id: group_id,
          };
          resolve(userAlreadyInCommunity);
        } else {
          // Insert a row into the table
          const { error, meta: insert } = await db
            .prepare(
              `INSERT INTO ${userCommunityTable} (vault_id, group_id) VALUES (?, ?);`
            )
            .bind(vault_id, group_id)
            .run();

          // Wait for transaction finality
          const status = await insert.txn?.wait();
          console.log(status, "status of waiting for tx");

          const newUserCommunity = {
            success: true,
            vault_id: vault_id,
            group_id: group_id,
          };

          resolve(newUserCommunity);
        }
      } catch (e: any) {
        console.log(e);
        reject({
          success: false,
          message: e.message,
          cause: e.cause.message,
        });
      }
    });
  };

  // get all users
  read = async (): Promise<User | undefined> => {
    return new Promise<User | undefined>(async (resolve, reject) => {
      try {
        const results: any = await db
          .prepare(`SELECT * FROM ${userTable}`)
          .bind()
          .all();

        if (results.results.length === 0) {
          resolve(undefined);
        } else {
          resolve(results.results);
        }
      } catch (e: any) {
        console.log(e);
        reject({
          success: false,
          message: e.message,
          cause: e.cause.message,
        });
      }
    });
  };

  // get users by vault_id
  readByVaultId = async (vault_id: string): Promise<User | undefined> => {
    console.log(vault_id, "wats vault id?");
    return new Promise<User | undefined>(async (resolve, reject) => {
      try {
        const results: any = await db
          .prepare(`SELECT * FROM ${userTable} WHERE vault_id = ?1`)
          .bind(vault_id)
          .all();

        if (results.results.length === 0) {
          resolve(undefined);
        } else {
          console.log(results, "wats results?");
          resolve(results.results[0]);
        }
      } catch (e: any) {
        console.log(e);
        reject({
          success: false,
          message: e.message,
          cause: e.cause.message,
        });
      }
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
