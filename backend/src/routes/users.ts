import express, {Request, Response} from "express"
import User from "../models/user"
import jwt from "jsonwebtoken"
const router = express.Router();
import { check } from 'express-validator';
import {validationResult} from 'express-validator'

// /api/users/register
router.post("/register", [ // does all these checks and forwards the errors to response
    check("firstName", "First Name is Required").isString(),
    check("lastName", "Last Name is Required").isString(),
    check("email", "Email is Required").isEmail(),
    check("password", "Password is Required and must be 6+ Characters").isLength({min:6}),
], async(req: Request, res: Response) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return res.status(400).json({message: errors.array()})
    }
    try {
        let user = await User.findOne({
            email: req.body.email
        });

        if (user) { // if user already exists
            return res.status(400).json({message: "User already exists"});
        }

        user = new User(req.body); // if user doesn't exist
        await user.save();

        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET_KEY as string, {
                expiresIn: "1d"
            }
        );

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        })
        return res.sendStatus(200);
    } catch (error) {
        res.status(500).send({message:"An error occured"});
        console.log(error)
    }
})

export default router;