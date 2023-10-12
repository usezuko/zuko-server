import { Request, Response } from "express";
import User from "../classes/Auth";
import ApiError from "../classes/ApiError";

const authHandler = {
  /* read: async (req: Request, res: Response) => {
    const id = req.params.id;
    // const userid = req.apiSession.userid;

    if (id) {
      if (id == id) {
        const user = new User();
        try {
          const userData = await user.read(id);
          res.status(200).send(userData);
        } catch (reason) {
          res.status(400).send(new ApiError(400, reason));
        }
      } else {
        res.status(403).send(new ApiError(403, "Access denied, userid does not match"));
      }
    }
  }, */

  create: async (req: Request, res: Response) => {
    /*   const user = new User();
      user.set(req.body); // should be a user object
  
      try {
        const result = await user.create();
        res.status(200).send(result);
      } catch (reject) {
        res.status(400).send(new ApiError(400, reject));
      } */
  },



  delete: async (req: Request, res: Response) => {
    /*    const id = req.params.id;
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

  loginUser: async (req: Request, res: Response) => {
    /*   const serviceprovider_name = req.params.serviceprovider_name;
      const user = new User();
  
      try {
        const result = await user.loginUser(serviceprovider_name);
        res.status(200).send(result);
      } catch (reason) {
        res.status(400).send(new ApiError(400, reason));
      } */
  },
};

export default authHandler;
