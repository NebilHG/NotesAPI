const jwt = require('jsonwebtoken');
const { findUserById } = require('../models/user');


async function auth(req, res, next){
    const token = req.headers.authorization.replace('Bearer ', '');

    try{
        const data = jwt.verify(token, 'a1b1c1-hemligNyckel');
        const user = await findUserById(data.id);

        req.token = token;
        req.id = data.id;
        next()

    } catch (error){
        res.status(401).json({success: false, error: 'Invalid token'});
       
    }
}

module.exports = { auth }