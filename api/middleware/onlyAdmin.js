import jwt from 'jsonwebtoken';

export const onlyAdmin = (req, res, next) => {
    try {
        const {token} = req.cookies.access_token
        if(!token){
            return next(403,'Unauthorized access');
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(decodedToken.role === 'admin') {
            req.user = decodedToken;
            next();
        } else {
            return next(403, 'Unauthorized access, admin only');
        }

    } catch (error) {
        next(500, error.message )
    }
}