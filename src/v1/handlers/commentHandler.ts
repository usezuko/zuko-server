import { Request, Response } from "express";
import ApiError from "../classes/ApiError";
import Comment from "../classes/Comment";

const postHandler = {
  create: async (req: Request, res: Response) => {
    const comment = new Comment();
    comment.set(req.body); // should be a comment object

    try {
      const result = await comment.create();
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(new ApiError(400, "Error" + err));
    }
  },

  read: async (req: Request, res: Response) => {
    const postId = Number(req.params.post_id);
    const vaultId = String(req.params.post_id);

    if (postId && vaultId) {
      const comment = new Comment();
      try {
        const comments = await comment.read(postId, vaultId);
        res.status(200).send(comments);
      } catch (err) {
        res.status(400).send(new ApiError(400, "Error" + err));
      }
    } else {
      res.status(403).send(new ApiError(403, "Error: post_id or vault_id missing"));
    }
  },

  update: async (req: Request, res: Response) => {
    // const comment = new Comment();
    // comment.set(req.body); // should be a comment object
    // try {
    //   const updatedPost = await comment.update();
    //   res.status(200).send(updatedPost);
    // } catch (err) {
    //   res.status(400).send(new ApiError(400, "Error" + err));
    // }
  },

  delete: async (req: Request, res: Response) => {
    const commentId = Number(req.params.comment_id);

    if (commentId) {
      const comment = new Comment();
      try {
        const result = await comment.delete(commentId);
        res.status(200).send(result);
      } catch (reject) {
        res.status(400).send(new ApiError(400, reject));
      }
    } else {
      res.status(403).send(new ApiError(403, "Error: comment_id missing"));
    }
  },
};

export default postHandler;
