import validator from "validator";
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";


const createToken = (id) => {
    return jwt.sign({ id }, "harikiran")
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, massage: "User Already exists" })
        }
        if (!validator.isEmail(email)) {

            return res.json({ success: false, massage: "Please Enter a valid email" })
        }
        if (password.length < 8) {

            return res.json({ success: false, massage: "Please enter a strong Password" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

const adminLogin = async (req, res) => {

    try {
        const { email, password } = req.body
        if (email ==="admin@gmail.com" && password === "admin123") {
            const token = jwt.sign(email + password, "harikiran");
            res.json({ success: true, token })
        } else {
            res.json({ success: false, massage: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}
const googleLogin = async (req, res) => {
    try {
      const { name, email } = req.body;
  
      if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
      }
  
      let user = await userModel.findOne({ email });
  
      if (!user) {
        user = await userModel.create({ name, email, password: "google-oauth", cartData: {} });
      }
  
      const token = createToken(user._id);
      return res.json({ success: true, token });
  
    } catch (error) {
      console.error("Google login failed:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };


export { loginUser, registerUser, adminLogin, googleLogin  }