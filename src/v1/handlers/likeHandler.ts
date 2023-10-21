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

  createPost: async (req: Request, res: Response) => {
    const like = new Like();
    like.set(req.body);

    try {
      const hasLiked = await like.createPost();
      res.status(200).send(hasLiked);
    } catch (err) {
      res.status(400).send(new ApiError(400, err));
    }
  },

  createComment: async (req: Request, res: Response) => {
    const like = new Like();
    like.set(req.body);

    try {
      const hasLiked = await like.createComment();
      res.status(200).send(hasLiked);
    } catch (err) {
      res.status(400).send(new ApiError(400, err));
    }
  },

  deletePost: async (req: Request, res: Response) => {
    const like = new Like();
    like.set(req.body);

    try {
      const unlikeRes = await like.deletePost();
      res.status(200).send(unlikeRes);
    } catch (err) {
      res.status(400).send(new ApiError(400, err));
    }
  },

  deleteComment: async (req: Request, res: Response) => {
    const like = new Like();
    like.set(req.body);

    try {
      const unlikeRes = await like.deleteComment();
      res.status(200).send(unlikeRes);
    } catch (err) {
      res.status(400).send(new ApiError(400, err));
    }
  },
};

export default postHandler;
