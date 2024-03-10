const jwt = require('jsonwebtoken');
const Response = require('../provider/requestResponse');

const Authorization = async (req , res , next) => {
    const token = req.header('Authorization');
    if(!token) {
      return  res.status(401).json(new Response(false, 'Access denied', null));
    }

    try{
        const decoded = jwt.verify(token.split(" ")[1], process.env.PRIVATE_KEY);
        req.userId = decoded.userId;
        next();
    } catch(err) {
        res.status(500).json(err);
    }
}

module.exports = Authorization;