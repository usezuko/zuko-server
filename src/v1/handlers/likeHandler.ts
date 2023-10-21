import { Request, Response } from "express";
import ApiError from "../classes/ApiError";
import Like from "../classes/Like";

const postHandler = {
  read: async (req: Request, res: Response) => {
    // const groupId = String(req.params.group_id);
    // if (groupId) {
    //   const like = new Like();
    //   try {
    //     const posts = await like.read(groupId);
    //     res.status(200).send(posts);
    //   } catch (err) {
    //     res.status(400).send(new ApiError(400, "Error" + err));
    //   }
    // } else {
    //   res.status(403).send(new ApiError(403, "Error: group_id does not exist"));
    // }
  },

  post: async (req: Request, res: Response) => {
    const like = new Like();
    like.set(req.body);

    try {
      const hasLiked = await like.createPost();
      res.status(200).send(hasLiked);
    } catch (err) {
      res.status(400).send(new ApiError(400, err));
    }
  },

  comment: async (req: Request, res: Response) => {
    const like = new Like();
    like.set(req.body);

    try {
      const hasLiked = await like.createComment();
      res.status(200).send(hasLiked);
    } catch (err) {
      res.status(400).send(new ApiError(400, err));
    }
  },

  // todo: delete a like by post_id
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

export default postHandler;
