import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const fetchUser = async (req, res, next) => {
    let status = true
    const authToken = req.header('auth-token');
    if (!authToken) {
        status = false
        return res.status(401).json({ "status": status, errors: { "msg": "no token exits", "path": "null token" } })
    }
    try {

        const data = await jwt.verify(authToken, process.env.JWT_SECRET_KEY)
        req.user = data.user;
        // console.log(authToken)
        // console.log(process.env.JWT_SECRET_KEY)
        // console.log(data)
        next();
    }
    catch (err) {
        res.status(401).json({ "status": status, errors: { "msg": "token verification failed", "path": "verification" } })
    }
}
export default fetchUser;