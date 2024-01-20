const User = require('./user-model')


 async function checkUsernameFree(req,res,next) {
 
 
 
  try {
    const username = await User.findBy({username: req.body.username})
    if(!username.length){
        next()
    } else{
        next({message: 'username is taken', status: 401})
    }
  } catch(err) {
    next(err)
  } 
}

function registerErrors(req,res,next) {
  const {username, password} = req.body
  if(!username || !password){
    res.json({
      message:  "username and password required"
    })
  }
  next()
}





module.exports = {
    checkUsernameFree,
    registerErrors
    
}