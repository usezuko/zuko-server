import { Request, Response } from "express";
import User from "../classes/Auth";
import ApiError from "../classes/ApiError";
import Invite from "../classes/Invite";

const inviteHandler = {
    create: async (req: Request, res: Response) => {
        const invite = new Invite();
        invite.set(req.body); // should be a user object

        try {
            const result = await invite.create();
            res.status(200).send(result);
        } catch (err) {

            res.status(400).send(new ApiError(400, 'Error' + err));
        }
    },

    read: async (req: Request, res: Response) => {
        const invite_link = req.params.inviteLink;

        if (invite_link) {
            if (invite_link == invite_link) {
                const invite = new Invite();
                try {
                    const inv = await invite.read(invite_link);
                    res.status(200).send(inv);
                } catch (err) {
                    res.status(400).send(new ApiError(400, 'Error' + err));
                }
            } else {
                res.status(403).send(new ApiError(403, "Access denied, userid does not match"));
            }
        }
    },

    update: async (req: Request, res: Response) => {
        /*         const user = new User();
                user.set(req.body);
                const userId = Number(req.user.id);
        
                if (userId == Number(req.params.id)) {
                    try {
                        const updatedUser = await user.update(userId);
                        res.status(200).send(updatedUser);
                    } catch (err) {
                        res.status(400).send(new ApiError(400, 'Error' + err));
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

    loginUser: async (req: Request, res: Response) => {
        /*      const serviceprovider_name = req.params.serviceprovider_name;
             const user = new User();
     
             try {
                 const result = await user.loginUser(serviceprovider_name);
                 res.status(200).send(result);
             } catch (reason) {
                 res.status(400).send(new ApiError(400, reason));
             } */
    },
};

export default inviteHandler;
