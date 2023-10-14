import middleware from "./middleware";
import userHandler from "./handlers/userHandler";
import inviteHandler from "./handlers/inviteHandler";
import { Express, Request, Response } from "express";

type Endpoint = {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  middleware: any[];
  handler: (req: Request, res: Response) => void;
  description: string;
};

const endpoints: Record<string, Endpoint> = {};


endpoints.createUser = {
  url: "/v1/user",
  method: "post",
  middleware: [],
  handler: userHandler.create,
  description: "create user",
};

endpoints.readUser = {
  url: "/v1/user/:vault_id",
  method: "get",
  middleware: [],
  handler: userHandler.read,
  description: "read user by vault id",
};

endpoints.authUser = {
  url: "/v1/auth",
  method: "post",
  middleware: [],
  handler: userHandler.auth,
  description: "authenticate user",
};

endpoints.createInvite = {
  url: "/v1/invite",
  method: "post",
  middleware: [],
  handler: inviteHandler.create,
  description: "create invite",
};

endpoints.readInvite = {
  url: "/v1/invite/:inviteLink",
  method: "get",
  middleware: [],
  handler: inviteHandler.read,
  description: "read invite by invite link",
};

export default endpoints;
