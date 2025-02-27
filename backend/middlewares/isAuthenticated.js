import jwt from "jsonwebtoken"
import { User } from "../modals/User.js"

const Authenticated = async(req, res, next) => {
    const token = req.header("Auth")
    if(!token){
        return res.json({
            message: "Login first",
            success: false
        })
    }
    const decode = jwt.verify(token, "!#$^%#$^&")
    const id = decode.userId;
    const user = await User.findById(id);
    if(!user){
        return res.json({
            message: "User not exist",
            success: false
        })
    }
    req.user = user;
    next();
}

export { Authenticated }