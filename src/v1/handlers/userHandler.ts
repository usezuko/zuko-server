import { Request, Response } from "express";
import Auth from "../classes/Auth";
import ApiError from "../classes/ApiError";
import User from "../classes/User";
import {
  AuthType,
  ClaimType,
  SismoConnect,
  SismoConnectVerifiedResult,
} from "@sismo-core/sismo-connect-server";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userHandler = {
  create: async (req: Request, res: Response) => {
    const user = new User();
    user.set(req.body); // should be a user object

    try {
      const result = await user.create();

      res.status(200).send(result);
    } catch (err) {
      //console.log(err, 'creating user error')
      //res.status(400).send(new ApiError(400, reject));
    }
  },

  auth: async (req: Request, res: Response) => {
    const user = new User();
    const simsoConnectResponse = req.body; // get the zk proof

    const sismoConnect = SismoConnect({
      config: {
        appId: process.env.SISMO_CONNECT_APP_ID || "",
        vault: {
          impersonate: ["nansen.eth", "jebus.eth"],
        },
      },
    });

    console.log(process.env.SISMO_CONNECT_APP_ID, "sismo app ID");

    try {
      const result: SismoConnectVerifiedResult = await sismoConnect.verify(
        simsoConnectResponse,
        { auths: [{ authType: AuthType.VAULT }] }
      );

      const vaultId = result.getUserId(AuthType.VAULT);
      if (vaultId) {
        //check in db if the user table has exisisting user with matching vaultId
        var token = jwt.sign(vaultId, process.env.SECRET || ""); // Adjust the expiration time as needed

        const existingUser = true; //TODO check here if in db user.read(vaultId)
        if (existingUser) {
          //log user in
          //send user object to client and show logged in dashboard
          res
            .status(200)
            .send({ vaultId: vaultId, jwt: token, newUser: false });
        } else {
          //TODO: create user in db with vaultId
          //redirect to signup page in frontend
          res.status(200).send({ vaultId: vaultId, jwt: token, newUser: true });

          //const result = await user.create();
        }
      } else {
        res.status(400).send(new ApiError(400, "Invalid auth response"));
      }
      res.status(200).send({ userId: vaultId });
    } catch (error) {
      console.log(error, "Error with verifying zk proof");

      res.status(500).send(new ApiError(500, "Error with verifying zk proof"));
    }
  },

  read: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (id) {
      if (id == id) {
        const user = new User();
        try {
          const user_id = await user.read(id);
          res.status(200).send(user_id);
        } catch (err) {
          console.log(err, "Reading user error");
          //res.status(400).send(new ApiError(400, err));
        }
      } else {
        res
          .status(403)
          .send(new ApiError(403, "Access denied, userid does not match"));
      }
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
