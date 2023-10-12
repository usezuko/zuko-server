import authHandler from "./handlers/authHandler";
import messageHandler from "./handlers/messageHandler";
import middleware from "./middleware";
import groupHandler from "./handlers/groupHandler";
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

// Message endpoints
endpoints.createMessage = {
  url: "/v1/message",
  method: "post",
  middleware: [],
  handler: messageHandler.create,
  description: "create msg",
};

endpoints.createGroup = {
  url: "/v1/group",
  method: "post",
  middleware: [],
  handler: groupHandler.create,
  description: "create group",
};

endpoints.readGroup = {
  url: "/v1/group/:id",
  method: "get",
  middleware: [],
  handler: groupHandler.read,
  description: "read group by userid/public address",
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

endpoints.readMessageByGroupId = {
  url: "/v1/message/:groupId",
  method: "get",
  middleware: [],
  handler: messageHandler.readMessageByGroupId,
  description: "read messages by groupid",
};





export default endpoints;
