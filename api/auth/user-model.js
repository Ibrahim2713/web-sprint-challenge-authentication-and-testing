const db = require('../../data/dbConfig')


function findBy(filter) {
    return db('users').where(filter)
}



function findById(id) {
    return db('users').where('id', id).first()
}








 async function add(newUser) {
    const [id] = await db('users').insert(newUser)
    return findById(id)
}






module.exports = {
    add,
    findBy,
    findById
    
}