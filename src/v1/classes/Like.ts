import ApiError from "./ApiError";
import db from "../../config";
import dotenv from "dotenv";
dotenv.config();

const likeTable = process.env.TABLELAND_LIKE_DATABASE;
const postTable = process.env.TABLELAND_POST_DATABASE;
const commentTable = process.env.TABLELAND_COMMENT_DATABASE;
const userTable = process.env.TABLELAND_USER_DATABASE;

class Like {
  post_id?: number;
  comment_id?: number;
  vault_id?: string;
  group_id?: string;

  constructor(like?: Like) {
    if (like) {
      this.set(like);
    }
  }

  set(like: Like) {
    if (like) {
      this.post_id = like.post_id;
      this.comment_id = like.comment_id;
      this.vault_id = like.vault_id;
      this.group_id = like.group_id;
    }
  }

  // read all likes for a like
  read = async (group_id: string): Promise<Like | Object> => {
    const like = this;
    return new Promise<Like | Object>(async (resolve, reject) => {
      //   try {
      //     const { results } = await db
      //       .prepare(
      //         `SELECT * FROM ${postTable} WHERE group_id = ?1 ORDER BY post_id DESC`
      //       )
      //       .bind(group_id)
      //       .all();
      //     resolve(results);
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

  readPost = async (): Promise<Object> => {
    const post = this;
    return new Promise<Object>(async (resolve, reject) => {
      try {
        const posts = await db
          .prepare(
            `SELECT 
            p.*,
            l.like_id IS NOT NULL AS hasLiked,
            u.username
          FROM ${postTable} p
          LEFT JOIN ${likeTable} AS l
          ON p.post_id = l.post_id AND l.vault_id = ?1
          LEFT JOIN ${userTable} AS u
          ON p.vault_id = u.vault_id
          WHERE p.group_id = ?2
          ORDER BY p.post_id DESC`
          )
          .bind(post.vault_id, post.group_id)
          .run();

        resolve(posts);
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

  // like a post
  createPost = async (): Promise<Object | Boolean> => {
    return new Promise<Object | Boolean>(async (resolve, reject) => {
      try {
        const { results } = await db
          .prepare(
            `SELECT * FROM ${likeTable} WHERE vault_id = ?1 AND post_id = ?2`
          )
          .bind(this.vault_id, this.post_id)
          .all();

        if (results.length > 0) {
          reject("User already liked post");
        } else {
          const result = await db.batch([
            db
              .prepare(
                `INSERT INTO ${likeTable} (vault_id, post_id) VALUES (?, ?);`
              )
              .bind(this.vault_id, this.post_id),
            db
              .prepare(
                `UPDATE ${postTable} SET likes_count = likes_count + 1 WHERE post_id = ?;`
              )
              .bind(this.post_id),
          ]);

          result ? resolve(result) : reject("tx failed");
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

  // like a comment
  createComment = async (): Promise<Object | Boolean> => {
    const like = this;
    return new Promise<Object | Boolean>(async (resolve, reject) => {
      try {
        const { results } = await db
          .prepare(
            `SELECT * FROM ${likeTable} WHERE vault_id = ?1 AND comment_id = ?2`
          )
          .bind(like.vault_id, like.comment_id)
          .all();

        if (results.length > 0) {
          reject("User already liked comment");
        } else {
          const result = await db.batch([
            db
              .prepare(
                `INSERT INTO ${likeTable} (vault_id, comment_id) VALUES (?, ?);`
              )
              .bind(like.vault_id, like.comment_id),
            db
              .prepare(
                `UPDATE ${commentTable} SET likes_count = likes_count + 1 WHERE comment_id = ?;`
              )
              .bind(like.comment_id),
          ]);

          result ? resolve(result) : reject("tx failed");
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

  // undo like from post
  deletePost = async (): Promise<Object | Boolean> => {
    return new Promise<Object | Boolean>(async (resolve, reject) => {
      try {
        const result = await db.batch([
          db
            .prepare(
              `DELETE FROM ${likeTable} WHERE vault_id = ?1 AND post_id = ${this.post_id}`
            )
            .bind(this.vault_id),
          db
            .prepare(
              `UPDATE ${postTable} SET likes_count = likes_count - 1 WHERE post_id = ?;`
            )
            .bind(this.post_id),
        ]);

        result ? resolve(result) : reject("tx failed");
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

  // undo like from comment
  deleteComment = async (): Promise<Object | Boolean> => {
    return new Promise<Object | Boolean>(async (resolve, reject) => {
      try {
        const result = await db.batch([
          db
            .prepare(
              `DELETE FROM ${likeTable} WHERE vault_id = ?1 AND comment_id = ${this.comment_id}`
            )
            .bind(this.vault_id),
          db
            .prepare(
              `UPDATE ${commentTable} SET likes_count = likes_count - 1 WHERE comment_id = ?;`
            )
            .bind(this.comment_id),
        ]);

        result ? resolve(result) : reject("tx failed");
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
}

export default Like;
