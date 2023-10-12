import { Request, Response } from "express";
import Message from "../classes/Message";
import ApiError from "../classes/ApiError";
import { QueryError } from "mysql2";
import io from "../../index" // Import the socket instance

const messageHandler = {
  create: async (req: Request, res: Response) => {
    const message = new Message({});
    message.set(req.body);

    try {
      const msg = await message.create();
      io.emit("messageCreation", msg);

      res.status(200).send(msg);
    } catch (err) {
      console.log(err, 'error creating msg')

      //res.status(400).send(new ApiError(400, reject));
    }
  },


  readMessageByGroupId: async (req: Request, res: Response) => {
    const groupId = req.params.groupId;

    if (groupId) {
      console.log(groupId, 'groupID')
      const message = new Message({});
      try {
        const msgs = await message.readMessageByGroupId(Number(groupId));
        res.status(200).send(msgs);
      } catch (err) {
        console.log(err, 'error reading msg by groupid')
        //res.status(400).send(new ApiError(400, err.toString()));
      }
    } else {
      res
        .status(403)
        .send(new ApiError(403, "Access denied, group_id does not match"));
    }
  },

  update: async (req: Request, res: Response) => {
    /*    const game = new Message({});
       game.set(req.body);
       const userId = Number(req.params.userid);
       //const userIdFromSession = req.user.id;
   
       if (userId) {
         try {
           const updatedGame = await game.update();
           res.status(200).send(updatedGame);
         } catch (err) {
           console.log(err, 'error updating by id')
   
           //res.status(400).send(new ApiError(400, reject));
         }
       } else {
         res.status(403).send(new ApiError(403, "Access denied, update"));
       } */
  },

  delete: async (req: Request, res: Response) => {
    /*     const id = Number(req.params.id);
        //const userid = req.apiSession.userid;
    
        if (id == id) {
          const game = new Message({});
          try {
            const retrievedGame = await game.read(id);
            await game.delete(id);
    
            res.status(200).send({});
          } catch (err) {
            console.log(err, 'error deleting msg by id')
            //res.status(400).send(new ApiError(400, reason));
          }
        } else {
          res.status(403).send(new ApiError(403, "Access denied for delete game"));
        } */
  },


};

export default messageHandler;
