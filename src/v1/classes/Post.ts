import ApiError from "./ApiError";
import db from "../../config";
import dotenv from "dotenv";
dotenv.config();

const postTable = process.env.TABLELAND_POST_DATABASE;
const likeTable = process.env.TABLELAND_LIKE_DATABASE;
const userTable = process.env.TABLELAND_USER_DATABASE;
const currentTimestamp = Math.floor(new Date().getTime() / 1000);

class Post {
  success?: boolean;
  post_id?: number;
  title?: string;
  content?: string;
  timestamp?: number;
  likes_count?: number;
  comments_count?: number;
  vault_id?: string;
  group_id?: string;

  constructor(post?: Post) {
    if (post) {
      this.set(post);
    }
  }

  set(post: Post) {
    if (post) {
      this.success = post.success;
      this.post_id = post.post_id;
      this.title = post.title;
      this.content = post.content;
      this.timestamp = currentTimestamp;
      this.likes_count = 0;
      this.comments_count = 0;
      this.vault_id = post.vault_id;
      this.group_id = post.group_id;
    }
  }

  // create a post
  create = async (): Promise<Object | Array<number>> => {
    const post = this;
    return new Promise<Object | Array<number>>(async (resolve, reject) => {
      try {
        const { error, meta: insert } = await db
          .prepare(
            `INSERT INTO ${postTable} (title, content, timestamp, likes_count, comments_count, vault_id, group_id) VALUES (?, ?, ?, ?, ?, ?, ?);`
          )
          .bind(
            post.title,
            post.content,
            post.timestamp,
            post.likes_count,
            post.comments_count,
            post.vault_id,
            post.group_id
          )
          .run();

        const status = await insert.txn?.wait();
        console.log(status);

        const { results } = await db
          .prepare(`SELECT * FROM ${postTable} ORDER BY post_id DESC LIMIT 1;`)
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

  // read all posts by group_id
  read = async (group_id: string, vault_id: string): Promise<Post | Object> => {
    // const post = this;
    return new Promise<Post | Object>(async (resolve, reject) => {
      try {
        const { results } = await db
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
          .bind(vault_id, group_id)
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

  // update a post by post_id
  update = async (): Promise<Object | Array<number>> => {
    const post = this;
    return new Promise<Object | Array<number>>(async (resolve, reject) => {
      try {
        const { error, meta: insert } = await db
          .prepare(
            `UPDATE ${postTable}
            SET
                title = COALESCE(?1, title),
                content = COALESCE(?2, content),
                likes_count = COALESCE(?3, likes_count),
                comments_count = COALESCE(?4, comments_count)
            WHERE post_id = ?5;`
          )
          .bind(
            post.title,
            post.content,
            post.likes_count,
            post.comments_count,
            post.post_id
          )
          .run();

        await insert.txn?.wait();

        const { results } = await db
          .prepare(`SELECT * FROM ${postTable} WHERE post_id = ?1;`)
          .bind(post.post_id)
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

  delete = async (id: number): Promise<void> => {
    // const promise = new Promise<void>((resolve, reject) => {
    //   if (id) {
    //   } else {
    //     reject(new ApiError(400, "Missing post id"));
    //   }
    // });
    // return promise;
  };
}

export default Post;
