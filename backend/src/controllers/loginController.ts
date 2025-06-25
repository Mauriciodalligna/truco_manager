import { Request, Response } from "express"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

export class LoginController {
    doLogin = async (req: Request, res: Response) => {
        const{ email, password} = req.body 

        if(!email || !password) {
            res.status(400).send("credentials not found")
        }

        const token = jwt.sign({
            email: email
        }, process.env.TOKEN!, {
            expiresIn: '1h'
        })
        
        res.status(200).json({
            auth: true,
            token: token
        })
    }
}
