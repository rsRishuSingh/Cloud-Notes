
import jwt from 'jsonwebtoken' // Import jsonwebtoken for handling JWTs
import dotenv from 'dotenv' // Import dotenv for managing environment variables
dotenv.config() // Load environment variables from the .env file

const fetchUser = async (req, res, next) => {
    let status = true
    const authToken = req.header('auth-token'); // Retrieve the token from the 'auth-token' header
    if (!authToken) {
        status = false
        // Return a 401 response if the token is missing
        return res.status(401).json({ "status": status, errors: { "msg": "no token exits", "path": "null token" } })
    }
    try {
        // Verify the token using the secret key and extract user data
        const data = await jwt.verify(authToken, process.env.JWT_SECRET_KEY)
        req.user = data.user; // Attach the user data to the request object
        next(); // Proceed to the next middleware or route handler
    }
    catch (err) {
        // Return a 401 response if token verification fails
        res.status(401).json({ "status": status, errors: { "msg": "token verification failed", "path": "verification" } })
    }
}
export default fetchUser; // Export the middleware function
