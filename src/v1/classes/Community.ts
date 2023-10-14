import ApiError from "./ApiError";
import db from "../../config";
import dotenv from "dotenv";
dotenv.config();

const communityTable = process.env.TABLELAND_COMMUNITY_DATABASE;

class Community {
  success?: boolean;
  community_id?: number;
  group_id?: string;
  name?: string;
  description?: string;

  constructor(community?: {
    success?: boolean;
    community_id?: number;
    group_id?: string;
    name?: string;
    description?: string;
  }) {
    this.set(community);
  }

  set(community?: {
    success?: boolean;
    community_id?: number;
    group_id?: string;
    name?: string;
    description?: string;
  }) {
    if (community) {
      this.success = community.success;
      this.community_id = community.community_id;
      this.group_id = community.group_id;
      this.name = community.name;
      this.description = community.description;
    }
  }

  // create a community
  create = async (): Promise<Community> => {
    const community = this;
    return new Promise<Community>(async (resolve, reject) => {
      try {
        // check for community duplicates
        const { results } = await db
          .prepare(`SELECT * FROM ${communityTable} WHERE group_id = ?1`)
          .bind(community.group_id)
          .all();

        if (results.length > 0) {
          reject("Community already exists");
        } else {
          // Insert community into the table
          const { error, meta: insert } = await db
            .prepare(
              `INSERT INTO ${communityTable} (name, description, group_id) VALUES (?, ?, ?);`
            )
            .bind(community.name, community.description, community.group_id)
            .run();

          // Wait for transaction finality
          const status = await insert.txn?.wait();
          console.log(status, "status of waiting for tx");

          const newCommunity = new Community({
            success: true,
            name: community.name,
            description: community.description,
            group_id: community.group_id,
          });

          resolve(newCommunity);
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

  // get all communities
  readByGroupId = async (
    group_id: string
  ): Promise<Community[] | undefined> => {
    const community = this;
    return new Promise<Community[] | undefined>(async (resolve, reject) => {
      try {
        const results: any = await db
          .prepare(`SELECT * FROM ${communityTable} WHERE group_id = ?1`)
          .bind(group_id)
          .all();

        if (results.results.length === 0) {
          reject("No community object found from group id");
        } else {
          resolve(results);
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
}

export default Community;
