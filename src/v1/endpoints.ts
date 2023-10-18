import { Express, Request, Response } from "express";
import middleware from "./middleware";
import handleRootRequest from "./handlers/rootHandler";
import userHandler from "./handlers/userHandler";
import communityHandler from "./handlers/communityHandler";
import postHandler from "./handlers/postHandler";

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

// USER
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

endpoints.readUser = {
  url: "/v1/user",
  method: "get",
  middleware: [],
  handler: userHandler.read,
  description: "read all users",
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

// COMMUNITY
endpoints.createCommunity = {
  url: "/v1/community",
  method: "post",
  middleware: [middleware.checkWhitelistedIpAddress],
  handler: communityHandler.create,
  description: "create community",
};

endpoints.readCommunity = {
  url: "/v1/community",
  method: "get",
  middleware: [],
  handler: communityHandler.read,
  description: "read all communities",
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

// POSTS
endpoints.createPost = {
  url: "/v1/post",
  method: "post",
  middleware: [middleware.checkWhitelistedIpAddress],
  handler: postHandler.create,
  description: "create a post",
};

endpoints.readPostByGroupId = {
  url: "/v1/post/:group_id",
  method: "get",
  middleware: [],
  handler: postHandler.read,
  description: "read all posts by group id",
};

endpoints.updatePost = {
  url: "/v1/post/",
  method: "put",
  middleware: [],
  handler: postHandler.update,
  description:
    "update a post (title, content, likes_count, comments_count) by group id",
};

export default endpoints;
