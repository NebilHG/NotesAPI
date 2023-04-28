const Router = require('express');
const router = new Router();
const jwt = require('jsonwebtoken');



const {createUser, findUserByUsername, findUserById} = require('../models/user');
const { comparePassword } = require('../utils/utils');
const {auth} = require('../middleware/auth');





router.post('/signup', (req, res) => {
    const credentals = req.body;

    createUser(credentals);

    res.json({success: true});
});



router.post('/login', async(req, res)=>{
    const {username, password} = req.body

    const user = await findUserByUsername(username);

    const result = {
        success: false,
    }

    if(user){
        const correctPass = await comparePassword(password, user.password);

        if(correctPass){
            result.success = true;

            result.token = jwt.sign({id: user.uuid},'a1b1c1-hemligNyckel',{
                expiresIn: '1h'
            });
        }
    }
        res.json(result);
})

router.get('/account',auth, async (req, res) =>{
    const user = await findUserById(req.id)
    res.json({ success: true, email: user.email})
})



module.exports = router