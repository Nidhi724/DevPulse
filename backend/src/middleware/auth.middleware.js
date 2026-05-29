import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

const protect = async (req, res, next) => {

    try {

        let token = req.headers.authorization;

        // CHECK TOKEN

        if (!token || !token.startsWith("Bearer ")) {

            return res.status(401).json({

                success: false,
                message: "Not authorized"

            });

        }

        // REMOVE BEARER

        token = token.split(" ")[1];

        // VERIFY TOKEN

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // FIND USER FROM DATABASE

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        // ATTACH USER

        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({

            success: false,
            message: "Invalid token"

        });

    }

};

export default protect;