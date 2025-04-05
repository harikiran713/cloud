import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({ success: false, message: " Not Authorized Login again" })
        }
        const token_decode = jwt.verify(token, "harikiran");
        if (token_decode !== "admin@gmail.com"+"admin123") {
            return res.json({ success: false, message: " Not Authorized Login again" })
        }
        next()
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export default adminAuth 