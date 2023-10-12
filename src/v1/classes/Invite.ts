import MySQL from "../../MySQL";
import ApiError from "./ApiError";
import { OkPacket, QueryError, RowDataPacket } from "mysql2"

class Invite {
  id?: number;
  group_id?: number;
  link?: string;
  is_used?: boolean;
  expiry_date?: Date;

  constructor(invite?: Invite) {
    if (invite) {
      this.set(invite);
    }
  }

  set(invite: Invite) {
    if (invite) {
      this.id = invite.id;
      this.group_id = invite.group_id;
      this.link = invite.link;
      this.is_used = invite.is_used;
      this.expiry_date = invite.expiry_date;
    }
  }

  /*                  */
  /* CRUD OPERATIONS  */
  /*                  */
  create = async (): Promise<Invite> => {
    const invite = this;
    const inviteLink = this.generateInviteLink();

    return new Promise<Invite>((resolve, reject) => {
      // Insert new row
      MySQL.pool.getConnection((err, db) => {
        if (err) {
          reject(new ApiError(500, err.toString()));
          return;
        }

        db.query(
          "INSERT INTO `invite` (group_id, invite_link, is_used, expiry_date) VALUES (?, ?, ?, UTC_TIMESTAMP());",
          [invite.group_id, inviteLink, false],
          (err, results: RowDataPacket[], fields) => {
            if (err) {
              db.release();
              reject(new ApiError(500, err.toString()));
              return;
            }

            if ("insertId" in results) {
              const inviteId = results.insertId;
              // Create a query to select the newly inserted group
              db.query(
                "SELECT * FROM `invite` WHERE id = ?",
                [inviteId],
                (err, results: RowDataPacket[], fields) => {
                  if (err) {
                    db.release();
                    reject(new ApiError(500, err.toString()));
                    return;
                  }

                  const newInvite = new Invite(results[0] as Invite);
                  resolve(newInvite);
                  db.release();
                }
              );
            } else {
              db.release();
            }
          }
        );
      });
    });
  };


  generateInviteLink = (): string => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let inviteLink = "";
    const linkLength = 10; // You can adjust the length as needed

    for (let i = 0; i < linkLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      inviteLink += characters.charAt(randomIndex);
    }

    return inviteLink;
  };

  read = async (invite_link: string): Promise<Invite | { id: null }> => {
    const invite = this;
    const promise = new Promise<Invite | { id: null }>((resolve, reject) => {
      if (invite_link) {
        MySQL.pool.getConnection((err, db) => {
          db.execute(
            "select * from `invite` where invite_link = ?",
            [invite_link],
            (err: any, results: any, fields: any) => {
              if (err) {
                reject(new ApiError(500, err));
              } else if (results.length < 1) {
                resolve({ id: null });
              } else {
                invite.set(results[0]);
                resolve(invite);
              }
              db.release();
            }
          );
        });
      } else {
        reject(new ApiError(500, "Missing invite id/link"));
      }
    });
    return promise;
  };

  update = async (): Promise<Invite> => {
    const invite = this;
    const promise = new Promise<Invite>((resolve, reject) => {
      MySQL.pool.getConnection((err, db) => {
        db.query(
          "UPDATE `invite` SET group_id=?, link=?, is_used=?, expiry_date=? WHERE id=?;",
          [
            invite.group_id,
            invite.link,
            invite.is_used,
            invite.expiry_date,
            invite.id,
          ],
          (err, results: OkPacket, fields) => {
            if (err) {
              reject(new ApiError(500, err.toString()));
            } else if (results.affectedRows < 1) {
              reject(new ApiError(404, "Invite not found!"));
            } else {
              resolve(invite);
            }
            db.release();
          }
        );
      });
    });
    return promise;
  };


  delete = async (id: number): Promise<void> => {
    const promise = new Promise<void>((resolve, reject) => {
      if (id) {
        MySQL.pool.getConnection((err, db) => {
          db.execute(
            "delete from `invite` where `id` = ?",
            [id],
            (err, results: RowDataPacket[], fields) => {
              if (err) {
                reject(new ApiError(500, err.toString()));
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
        reject(new ApiError(400, "Missing invite id"));
      }
    });
    return promise;
  };
}

export default Invite;
