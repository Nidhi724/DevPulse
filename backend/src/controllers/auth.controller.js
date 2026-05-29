import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";


// REGISTER USER

export const registerUser = async (req, res) => {

  try {

    const { username, email, password } = req.body;

    // check existing user

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "User already exists"
      });

    }

    // hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    // create user

    const user = await User.create({

      username,
      email,
      password: hashedPassword

    });

    // generate token

    const token = jwt.sign(

      { id: user._id },

      process.env.JWT_SECRET,

      { expiresIn: "7d" }

    );

    res.status(201).json({

      success: true,

      message: "User registered successfully",

      token,

      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message

    });

  }

};




// LOGIN USER

export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    // find user

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({

        success: false,
        message: "Invalid credentials"

      });

    }

    // compare password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

      return res.status(400).json({

        success: false,
        message: "Invalid credentials"

      });

    }

    // generate token

    const token = jwt.sign(

      { id: user._id },

      process.env.JWT_SECRET,

      { expiresIn: "7d" }

    );

    res.status(200).json({

      success: true,

      message: "Login successful",

      token,

      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message

    });

  }

};




// GET CURRENT USER

export const getMe = async (req, res) => {

  try {

    res.status(200).json({

      success: true,
      user: req.user

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message

    });

  }

};