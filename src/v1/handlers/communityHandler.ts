import { Request, Response } from "express";
import ApiError from "../classes/ApiError";
import Community from "../classes/Community";
import dotenv from "dotenv";
dotenv.config();

const communityHandler = {
  create: async (req: Request, res: Response) => {
    const community = new Community();
    community.set(req.body); // should be a community object
    try {
      const result = await community.create();
      res.status(200).send(result);
    } catch (err) {
      console.log(err, "Error: userHandler");
      res.status(400).send(new ApiError(400, err));
    }
  },

  read: async (req: Request, res: Response) => {
    const community = new Community();
    try {
      const communities = await community.read();
      res.status(200).send(communities);
    } catch (err) {
      console.log(err, "Error: read");
      res.status(400).send(new ApiError(400, err));
    }
  },

  readByGroupId: async (req: Request, res: Response) => {
    const groupId = String(req.params.group_id);
    if (groupId) {
      const community = new Community();
      try {
        const communityObj = await community.readByGroupId(groupId);
        res.status(200).send(communityObj);
      } catch (err) {
        console.log(err, "Error: group id");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No vault id provided"));
    }
  },

  readCommunityByVaultId: async (req: Request, res: Response) => {
    const vaultId = String(req.params.vault_id);
    if (vaultId) {
      const community = new Community();
      try {
        const communityList = await community.readCommunityByVaultId(vaultId);
        res.status(200).send(communityList);
      } catch (err) {
        console.log(err, "Error: group id");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No vault id provided"));
    }
  },

  update: async (req: Request, res: Response) => {
    /*    const community = new Community();
       community.set(req.body);
       const userId = Number(req.community.id);
   
       if (userId == Number(req.params.id)) {
         try {
           const updatedUser = await community.update(userId);
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
          const community = new Community();
          try {
            const userData = await community.read(id);
            await community.delete();
    
            res.status(200).send({});
          } catch (reject) {
            res.status(400).send(new ApiError(400, reject));
          }
        } else {
          res.status(403).send(new ApiError(403, "Access denied"));
        } */
  },
};

export default communityHandler;
