const nedb = require('nedb-promise');
const database =  new nedb({filename: 'accounts.db', autoload: true});
const uuid = require('uuid-random');

const { hashPassword } = require('../utils/utils');



async function createUser(credentals){
    const pass = await hashPassword(credentals.password)

    database.insert({uuid: uuid(),
        username: credentals.username,
        email: credentals.email,
        password: pass
    })
}


async function findUserByUsername(username){
    return await database.findOne({ username: username });
}

async function findUserById(id){
    return await database.findOne({ uuid: id });

}


module.exports = {createUser, findUserByUsername, findUserById}