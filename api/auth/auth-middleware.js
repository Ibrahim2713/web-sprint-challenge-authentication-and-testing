const User = require('./user-model')


 async function checkUsernameFree(req,res,next) {
 
 
 
  try {
    const username = await User.findBy({username: req.body.username})
    if(!username.length){
        next()
    } else{
        res.status(404).res.json({message: 'username is taken'})
    }
  } catch(err) {
    next(err)
  } 
}

function registerErrors(req,res,next) {
  const {username, password} = req.body
  if(!username || !password){
    res.status(404).res.json({
      message:  "username and password required"
    })
  }
  next()
}





module.exports = {
    checkUsernameFree,
    registerErrors
    
}