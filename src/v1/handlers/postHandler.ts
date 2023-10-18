import { Request, Response } from "express";
import ApiError from "../classes/ApiError";
import Post from "../classes/Post";

const postHandler = {
  create: async (req: Request, res: Response) => {
    const post = new Post();
    post.set(req.body); // should be a post object

    try {
      const result = await post.create();
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(new ApiError(400, "Error" + err));
    }
  },

  read: async (req: Request, res: Response) => {
    const groupId = String(req.params.group_id);

    if (groupId) {
      const post = new Post();
      try {
        const posts = await post.read(groupId);
        res.status(200).send(posts);
      } catch (err) {
        res.status(400).send(new ApiError(400, "Error" + err));
      }
    } else {
      res.status(403).send(new ApiError(403, "Error: group_id does not exist"));
    }
  },

  update: async (req: Request, res: Response) => {
    const post = new Post();
    post.set(req.body); // should be a post object

    try {
      const updatedPost = await post.update();
      res.status(200).send(updatedPost);
    } catch (err) {
      res.status(400).send(new ApiError(400, "Error" + err));
    }
  },

  // todo: delete a post by post_id
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