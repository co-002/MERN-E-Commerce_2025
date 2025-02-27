import { User } from "../modals/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking user exist or not
    let user = await User.findOne({ email });
    if (user) {
      return res.json({
        message: "User already exist",
        success: false,
      });
    }

    // Encrypting password
    const hashPassword = await bcrypt.hash(password, 10);

    // Creating new user
    user = new User({ name, email, password: hashPassword });
    await user.save();
    res.json({
      message: "User registered successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.error("Registration error: " + error);
    res.json({
      message: error.message,
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "User not found",
        success: false,
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({
        message: "Invalid credential",
        success: false,
      });
    }
    const token = jwt.sign({userId: user._id}, "!#$^%#$^&", {
      expiresIn: "3d"
    })
    res.json({
      message: `Welcome ${user.name}`,
      token,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

const users = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({
      users,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

const profile = async(req, res) => {
  res.json({
    user: req.user,
    success: true
  })
}

export { register, login, users, profile };
