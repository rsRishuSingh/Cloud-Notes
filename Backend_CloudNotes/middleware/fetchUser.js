import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const fetchUser = async (req, res, next) => {
    const authToken = req.header('auth-token');
    if (!authToken) {
        return res.status(401).send('authorization token not found')
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
        res.status(401).send('invalid authorization token')
    }
}
export default fetchUser;