import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import MySQL from '../../MySQL';
import ApiError from './ApiError';

class Group {
  id?: number;
  group_name?: string;
  created_at?: Date;

  constructor(group?: { id?: number; group_name?: string; created_at?: Date }) {
    this.set(group);
  }

  set(group?: { id?: number; group_name?: string; created_at?: Date }) {
    if (group !== undefined) {
      this.id = group.id;
      this.group_name = group.group_name;
      this.created_at = group.created_at;
    }
  }

  /*                  */
  /* CRUD OPERATIONS  */
  /*                  */
  create = async (): Promise<Group | undefined> => {
    const group = this;
    return new Promise<Group | undefined>((resolve, reject) => {
      // Insert new row
      MySQL.pool.getConnection((err, db) => {
        db.query(
          "INSERT INTO `group` (group_name, created_at) VALUES (?,  UTC_TIMESTAMP());",
          [group.group_name],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err.toString()));
            } else {
              // Check if results is an OkPacket (type guard)
              if ("insertId" in results) {
                const groupId = results.insertId;
                // Create a query to select the newly inserted group
                db.query(
                  "SELECT * FROM `group` WHERE id = ?",
                  [groupId],
                  (err, results: RowDataPacket[], fields) => {
                    if (err) {
                      reject(new ApiError(500, err.toString()));
                    } else {
                      // Resolve with the selected group object
                      const newGroup = new Group(results[0] as Group);
                      resolve(newGroup);
                    }
                    db.release();
                  }
                );
              } else {
                // Handle the case where results is not an OkPacket
                reject(new ApiError(500, "Unexpected result format"));
                db.release();
              }
            }
            db.release();
          }
        );
      });
    });
  };



  read = async (id: number): Promise<Group | undefined> => {
    const group = this;
    return new Promise<Group | undefined>((resolve, reject) => {
      /*    if (id) {
           MySQL.pool.getConnection((err, db) => {
             db.execute(
               "SELECT * FROM `group` WHERE user_id = ?",
               [id],
               (err, results, fields) => {
                 if (err) {
                   reject(new ApiError(500, err));
                 } else if (results.length < 1) {
                   reject(new ApiError(404, "Group not found"));
                 } else {
                   group.set(results[0]);
                   resolve(group);
                 }
                 db.release();
               }
             );
           });
         } else {
           reject(new ApiError(500, "Missing group id"));
         } */
    });
  };



  delete = async (id: number): Promise<void> => {
    const game = this;
    return new Promise<void>((resolve, reject) => {
      /*      if (id) {
             MySQL.pool.getConnection((err, db) => {
               db.execute(
                 "DELETE FROM `game` WHERE `id` = ?",
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
             reject(new ApiError(400, "Missing game id"));
           } */
    });
  };
}

export default Group;
