import { Request, Response } from "express";
import ApiError from "../classes/ApiError";

const handleRootRequest = (req: Request, res: Response) => {
  res.status(200).send({ status: true });
};

export default handleRootRequest;
