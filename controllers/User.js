const User = require('../models/User')

exports.userDetails = async(req,res)=>{
    try{
        userId=req.user.id;
        const user=await User.findById(userId).select('-password')
        res.send(user)
    }catch(err){
        console.log(err.message);
            res.status(500).send("Something went wrong");
    }
}