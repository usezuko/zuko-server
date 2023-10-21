import { Request, Response } from "express";
import ApiError from "../classes/ApiError";
import Like from "../classes/Like";

const postHandler = {
  readPost: async (req: Request, res: Response) => {
    const like = new Like();
    like.set(req.body);
    try {
      const posts = await like.readPost();
      res.status(200).send(posts);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error");
    }
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
