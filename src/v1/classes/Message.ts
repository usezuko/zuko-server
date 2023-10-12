import mysql, { Pool, Query, RowDataPacket } from "mysql2/promise"; // Use promise-based version
import ApiError from "./ApiError";
import MySQL from "../../MySQL";

class Message {
  id?: number;
  group_id?: number;
  sender?: string;
  text?: string;
  created_at?: Date;

  constructor(message: Partial<Message>) {
    this.set(message);
  }

  set(message: Partial<Message>) {
    if (message) {
      this.id = message.id;
      this.group_id = message.group_id;
      this.sender = message.sender;
      this.text = message.text;
      this.created_at = message.created_at;
    }
  }
  create = async (): Promise<Message> => {
    const message = this;
    return new Promise<Message>((resolve, reject) => {
      // Insert new row
      MySQL.pool.getConnection((err, db) => {
        db.query(
          "INSERT INTO `message` (group_id, sender, text, created_at) VALUES (?, ?, ?, UTC_TIMESTAMP());",
          [message.group_id, message.sender, message.text],
          (err, results: any, fields) => {
            if (err) {
              reject(new ApiError(500, err.toString()));
            } else {
              // Check if results is an OkPacket
              if (results && results.insertId) {
                // Create a new Message instance with the insertedId
                const newMessage = new Message({
                  id: results.insertId,
                  group_id: message.group_id,
                  sender: message.sender,
                  text: message.text,
                  created_at: new Date(),
                  // Map other fields as needed
                });

                resolve(newMessage);
              } else {
                reject(new ApiError(500, "Unexpected result format"));
              }
              db.release();
            }
          }
        );
      });
    });
  };

  readMessageByGroupId = async (
    groupId: number
  ): Promise<Message[] | undefined> => {
    const message = this;
    if (groupId) {
      return new Promise<Message[] | undefined>((resolve, reject) => {
        // Insert new row
        MySQL.pool.getConnection((err, db) => {
          db.query(
            "SELECT * FROM `message` WHERE group_id = ? ORDER BY created_at ASC",
            [groupId],
            (err, results: RowDataPacket[], fields) => {
              if (err) {
                reject(new ApiError(500, err.toString()));
              } else {

                const messages: Message[] = results.map((row: RowDataPacket) =>
                  new Message({
                    id: row.id,
                    group_id: row.group_id,
                    sender: row.sender,
                    text: row.text,
                    created_at: row.created_at,

                  })
                );
                resolve(messages);
                db.release();
              }
            }
          );
        });
      });
    } else {
      throw new ApiError(500, "Missing group ID");
    }
  };




}

export default Message;
