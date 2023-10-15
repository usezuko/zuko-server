import middleware from "./middleware";
import userHandler from "./handlers/userHandler";
import communityHandler from "./handlers/communityHandler";
import { Express, Request, Response } from "express";
import handleRootRequest from "./handlers/rootHandler";

type Endpoint = {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  middleware: any[];
  handler: (req: Request, res: Response) => void;
  description: string;
};

const endpoints: Record<string, Endpoint> = {};

endpoints.index = {
  url: "/",
  method: "get",
  middleware: [],
  handler: handleRootRequest,
  description: "welcome",
};

endpoints.createUser = {
  url: "/v1/user",
  method: "post",
  middleware: [middleware.checkWhitelistedIpAddress],
  handler: userHandler.create,
  description: "create user",
};

endpoints.createVaultIdToGroupId = {
  url: "/v1/user/community",
  method: "post",
  middleware: [middleware.checkWhitelistedIpAddress],
  handler: userHandler.createVaultIdToGroupId,
  description: "add a user (vault id) to a community (group id)",
};

endpoints.readUserByVaultId = {
  url: "/v1/user/:vault_id",
  method: "get",
  middleware: [],
  handler: userHandler.readByVaultId,
  description: "read user by vault id",
};

endpoints.authUser = {
  url: "/v1/auth",
  method: "post",
  middleware: [middleware.checkWhitelistedIpAddress],
  handler: userHandler.auth,
  description: "authenticate user",
};

endpoints.createCommunity = {
  url: "/v1/community",
  method: "post",
  middleware: [middleware.checkWhitelistedIpAddress],
  handler: communityHandler.create,
  description: "create community",
};

endpoints.readCommunityByGroupId = {
  url: "/v1/community/group/:group_id",
  method: "get",
  middleware: [],
  handler: communityHandler.readByGroupId,
  description: "read community by group id",
};

endpoints.readCommunityByVaultId = {
  url: "/v1/community/vault/:vault_id",
  method: "get",
  middleware: [],
  handler: communityHandler.readCommunityByVaultId,
  description: "read community by user (vault id)",
};

export default endpoints;
