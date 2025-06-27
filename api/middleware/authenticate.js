import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.access_token
        if(!token){
            return next(403,'Unauthorized access');
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        // console.log('Decoded Token:', decodedToken);

        next();

    } catch (error) {
        next(500, error.message )
    }
}