import ApiError from "./ApiError";
import db from "../../config";
import dotenv from "dotenv";
dotenv.config();

const commentTable = process.env.TABLELAND_COMMENT_DATABASE;
const postTable = process.env.TABLELAND_POST_DATABASE;
const currentTimestamp = Math.floor(new Date().getTime() / 1000);

class Comment {
  success?: boolean;
  comment_id?: number;
  post_id?: number;
  vault_id?: string;
  content?: string;
  likes_count?: number;
  timestamp?: number;

  constructor(comment?: Comment) {
    if (comment) {
      this.set(comment);
    }
  }

  set(comment: Comment) {
    if (comment) {
      this.success = comment.success;
      this.comment_id = comment.comment_id;
      this.post_id = comment.post_id;
      this.vault_id = comment.vault_id;
      this.content = comment.content;
      this.likes_count = 0;
      this.timestamp = currentTimestamp;
    }
  }

  // create a comment
  create = async (): Promise<Object | Array<number>> => {
    const comment = this;
    return new Promise<Object | Array<number>>(async (resolve, reject) => {
      try {
        const result = await db.batch([
          db
            .prepare(
              `INSERT INTO ${commentTable} (post_id, vault_id, content, timestamp) VALUES (?, ?, ?, ?);`
            )
            .bind(
              comment.post_id,
              comment.vault_id,
              comment.content,
              comment.timestamp
            ),
          db
            .prepare(
              `UPDATE ${postTable} SET comments_count = comments_count + 1 WHERE post_id = ?;`
            )
            .bind(comment.post_id),
        ]);

        // const status = await insert.txn?.wait();
        // console.log(status);
        console.log(result);

        const { results } = await db
          .prepare(
            `SELECT * FROM ${commentTable} ORDER BY comment_id DESC LIMIT 1;`
          )
          .all();

        resolve(results[0] || "undefined");
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

  // read all comments by post_id
  read = async (post_id: number): Promise<Object | Array<number>> => {
    return new Promise<Object | Array<number>>(async (resolve, reject) => {
      try {
        const { results } = await db
          .prepare(
            `SELECT * FROM ${commentTable} WHERE post_id = ?1 ORDER BY timestamp`
          )
          .bind(post_id)
          .all();
        resolve(results);
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

  // todo: update a comment by post_id
  update = async (): Promise<Object | Array<number>> => {
    const comment = this;
    return new Promise<Object | Array<number>>(async (resolve, reject) => {
      //   try {
      //     const { error, meta: insert } = await db
      //       .prepare(
      //         `UPDATE ${commentTable}
      //         SET
      //             title = COALESCE(?1, title),
      //             content = COALESCE(?2, content),
      //             likes_count = COALESCE(?3, likes_count),
      //             comments_count = COALESCE(?4, comments_count)
      //         WHERE post_id = ?5;`
      //       )
      //       .bind(
      //         comment.title,
      //         comment.content,
      //         comment.likes_count,
      //         comment.comments_count,
      //         comment.post_id
      //       )
      //       .run();
      //     await insert.txn?.wait();
      //     const { results } = await db
      //       .prepare(`SELECT * FROM ${commentTable} WHERE post_id = ?1;`)
      //       .bind(comment.post_id)
      //       .all();
      //     resolve(results[0] || "undefined");
      //   } catch (e: any) {
      //     console.log(e);
      //     reject({
      //       success: false,
      //       message: e.message,
      //       cause: e.cause.message,
      //     });
      //   }
    });
  };

  // delete a comment
  delete = async (comment_id: number): Promise<Object> => {
    return new Promise<Object>(async (resolve, reject) => {
    //   try {
    //     const result = await db.batch([
    //       db
    //         .prepare(`DELETE FROM ${commentTable} WHERE comment_id = ?1;`)
    //         .bind(comment_id),
    //       db
    //         .prepare(
    //           `UPDATE ${postTable} SET comments_count = comments_count - 1 WHERE post_id = ?;`
    //         )
    //         .bind(comment.post_id),
    //     ]);

    //     // const status = await insert.txn?.wait();
    //     // console.log(status);

    //     const { results } = await db
    //       .prepare(
    //         `SELECT * FROM ${commentTable} WHERE comment_id = ${comment_id};`
    //       )
    //       .all();

    //     if (results.length === 0) {
    //       resolve({ success: true } || "undefined");
    //     } else {
    //       resolve({ success: false } || "undefined");
    //     }
    //   } catch (e: any) {
    //     console.log(e);
    //     reject({
    //       success: false,
    //       message: e.message,
    //       cause: e.cause.message,
    //     });
    //   }
    });
  };
}

export default Comment;
