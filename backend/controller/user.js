const User = require("../models/User");


exports.getUserById = async (req,res,next,id) =>{
    try{
        const user = await User.findById(id);
        if(!user){
            res.status(400).json({
                error:"User not found"
            })
        }
        req.profile = user;
        next();
    }catch(err){
        res.status(400).json({
            error:err
        });
    }
}

exports.getUser = async (req,res) =>{
    req.profile.password = undefined;
    res.json(req.profile);
}

exports.getUsersAllQuetions = async (req,res) =>{
    try{
       const user =await User.findById(req.profile._id);
       res.json(user.completedQuetions)
    }catch(err){
        res.status(400).json({
            error:err
        })
    }
}

exports.getQuetionsSolvedCount = async (req,res) =>{
    try{
        const user = await User.findById(req.profile._id);
        res.json({
            completedCount : user.completedCount
        });



    }catch(err){
        res.status(400).json({
            error:"Something went Wrong"
        })
    }
}

exports.updateCompletedQuetions = async (req,res) =>{
    try{
            const myUser = await User.findById(req.profile._id);
            const problems = myUser.completedQuetions;
            problems.forEach(problem => {
                if (problem.title === req.quetion.title){
                   throw new Error("Problem is already completed");
                }
            })
           
            const user = await User.findByIdAndUpdate({
            _id:req.profile._id
        },{
            $push : {
                completedQuetions : req.quetion
            }
        },
        {new : true}
        );
       
        await user.save();
        res.json(user);
    }catch(err){
        res.json({
            error:"Problem is already completed"
        })
    }
};

exports.deleteCompletedQuetions = async (req,res) =>{
    try{
        const {title} = req.quetion;
        
        const user = await User.findByIdAndUpdate({
            _id:req.profile._id
        },{
            $pull : {
                completedQuetions : {
                    title : title
                }
            }
        },
        {new : true}
        );
       
        await user.save();
        res.json(user);
    }catch(err){
        res.json({
            error:"Failed to delete"
        })
    }
}

exports.increasePoints = async (req,res) =>{
    try{
        // const user = await User.findByIdAndUpdate(
        //     {_id:req.profile._id}, 
        //     {
        //         $inc : {points : 5}
        //     },
        //     {new : true}
        // );
        // await user.save();
        // res.json(user);
        res.json({msg:"hello"});

    }catch(err){
        res.json({
            error : "Something went wrong"
        })
    }
}

exports.decreasePoints = async (req,res) =>{
    try{
        const user = await User.findByIdAndUpdate(
            {_id:req.profile._id}, 
            {
                $inc : {points : 5}
            },
            {new : true}
        );
        await user.save();
        res.json(user);

    }catch(err){
        res.json({
            error : "Something went wrong"
        })
    }
}

exports.test = async (req, res) =>{
    res.send("hello test")
}