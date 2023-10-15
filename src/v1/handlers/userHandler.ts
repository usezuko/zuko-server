import { Request, Response } from "express";
import Auth from "../classes/Auth";
import ApiError from "../classes/ApiError";
import User from "../classes/User";
import { claims } from "../../constants";

import {
  AuthType,
  ClaimRequest,
  ClaimType,
  SismoConnect,
  SismoConnectVerifiedResult,
} from "@sismo-core/sismo-connect-server";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import helper from "../helper";
dotenv.config();

const userHandler = {
  create: async (req: Request, res: Response) => {
    const user = new User();
    user.set(req.body); // should be a user object
    try {
      const result = await user.create();
      res.status(200).send(result);
    } catch (err) {
      console.log(err, "Error: userHandler: create");
      res.status(400).send(new ApiError(400, err));
    }
  },

  createVaultIdToGroupId: async (req: Request, res: Response) => {
    const user = new User();
    try {
      const result = await user.createVaultIdToGroupId(
        req.body.group_id,
        req.body.vault_id
      );
      res.status(200).send(result);
    } catch (err) {
      console.log(err, "Error: userHandler: createVaultIdToGroupId");
      res.status(400).send(new ApiError(400, err));
    }
  },

  auth: async (req: Request, res: Response) => {
    const user = new User();
    const simsoConnectResponse = req.body; // get the zk proof
    console.log(simsoConnectResponse.proofs, "sismoooo connect res");

    const sismoConnect = SismoConnect({
      config: {
        appId: "0x1224f1ca77f3c19432034f998bcac8bb" || "",
      },
    });


    try {
      const result: SismoConnectVerifiedResult = await sismoConnect.verify(
        simsoConnectResponse,
        {
          auths: [{ authType: AuthType.VAULT }],
          claims,
        }
      );
      console.log(result, "result of sismo connect verified resu");

      const vaultId = result.getUserId(AuthType.VAULT);
      if (vaultId) {
        var token = jwt.sign(vaultId, process.env.JWT_SECRET || "default-secret");
        const existingUser = await user.readByVaultId(vaultId)
        if (existingUser?.username) {
          await helper.setUserToCommunity(result.claims, vaultId)
          res
            .status(200)
            .send({ user: existingUser, jwt: token, newUser: false });
        } else {
          //Set the user to be a part of community he/she is eligable for
          await helper.setUserToCommunity(result.claims, vaultId)
          res.status(200).send({ vaultId: vaultId, jwt: token, newUser: true });

        }
      } else {
        res.status(400).send(new ApiError(400, "Invalid auth response"));
      }
    } catch (error) {
      console.log(error, "Error with verifying zk proof");

      res.status(500).send(new ApiError(500, "Error with verifying zk proof"));
    }
  },

  readByVaultId: async (req: Request, res: Response) => {
    const vaultId = String(req.params.vault_id);
    if (vaultId) {
      const user = new User();
      try {
        const userObj = await user.readByVaultId(vaultId);
        res.status(200).send(userObj);
      } catch (err) {
        console.log(err, "Reading vault id error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No vault id provided"));
    }
  },

  update: async (req: Request, res: Response) => {
    /*    const user = new User();
       user.set(req.body);
       const userId = Number(req.user.id);
   
       if (userId == Number(req.params.id)) {
         try {
           const updatedUser = await user.update(userId);
           res.status(200).send(updatedUser);
         } catch (reject) {
           res.status(400).send(new ApiError(400, reject));
         }
       } else {
         res.status(403).send(new ApiError(403, "Access denied"));
       } */
  },

  delete: async (req: Request, res: Response) => {
    /*     const id = req.params.id;
        const userId = req.apiSession.userid;
    
        if (id == userId) {
          const user = new User();
          try {
            const userData = await user.read(id);
            await user.delete();
    
            res.status(200).send({});
          } catch (reject) {
            res.status(400).send(new ApiError(400, reject));
          }
        } else {
          res.status(403).send(new ApiError(403, "Access denied"));
        } */
  },






};

export default userHandler;
