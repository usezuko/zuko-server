import authHandler from "./handlers/authHandler";
import middleware from "./middleware";
import userHandler from "./handlers/userHandler";
import inviteHandler from "./handlers/inviteHandler";
import { Express, Request, Response } from "express"; // Import Express types

type Endpoint = {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  middleware: any[]; // You should replace 'any[]' with a more specific type for middleware
  handler: (req: Request, res: Response) => void;
  description: string;
};

const endpoints: Record<string, Endpoint> = {}; // Define the endpoints object

// Define and populate the endpoints
endpoints.loginUser = {
  url: "/v1/user/login/:serviceprovider_name",
  method: "get",
  middleware: [],
  handler: authHandler.loginUser,
  description: "login user",
};

endpoints.createUser = {
  url: "/v1/user",
  method: "post",
  middleware: [],
  handler: userHandler.create,
  description: "create user",
};

endpoints.readUser = {
  url: "/v1/user/:id",
  method: "get",
  middleware: [],
  handler: userHandler.read,
  description: "read user by userid/public address",
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
