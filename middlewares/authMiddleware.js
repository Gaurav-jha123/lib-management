const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader =  req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token , 'My_Key', (err, user) => {
            if(err){
                return res.status(403).json({message : `Invalid or expired token`});
            }
            req.user = user;
            next();

        });
    }else{
        res.status(401).json({message : 'Authorization token required'});
    }
}

module.exports = authMiddleware;