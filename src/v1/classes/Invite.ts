import ApiError from "./ApiError";
import { OkPacket, QueryError, RowDataPacket } from "mysql2";

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

    return new Promise<Invite>((resolve, reject) => {
      // Insert new row
    });
  };

  read = async (invite_link: string): Promise<Invite | { id: null }> => {
    const invite = this;
    const promise = new Promise<Invite | { id: null }>((resolve, reject) => {
      if (invite_link) {
      } else {
        reject(new ApiError(500, "Missing invite id/link"));
      }
    });
    return promise;
  };

  update = async (): Promise<Invite> => {
    const invite = this;
    const promise = new Promise<Invite>((resolve, reject) => {});
    return promise;
  };

  delete = async (id: number): Promise<void> => {
    const promise = new Promise<void>((resolve, reject) => {
      if (id) {
      } else {
        reject(new ApiError(400, "Missing invite id"));
      }
    });
    return promise;
  };
}

export default Invite;
