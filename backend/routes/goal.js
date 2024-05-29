const zod = require("zod")
const {Goal , User} = require("../db")
const { authMiddleware } = require("../middleware")
const express = require('express');
const router = express.Router();

const creategoalbody = zod.object({
    goalName : zod.string(),
    goalDescription : zod.string(),
    goalStart : zod.string(),
    goalEnd : zod.string().optional(),
})
// create goal
router.post('/creategoal',authMiddleware, async(req,res) =>{
    const {success} = creategoalbody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message : "Incorrect inputs"
        })
    }
    const user =  await User.findOne({_id : req.userId});

    const newgoal = Goal({
        userId : req.userId,
        goalName : req.body.goalName,
        goalDescription : req.body.goalDescription,
        goalStart : req.body.goalStart,
        goalEnd : req.body.goalEnd,
})

    await newgoal.save();
    console.log(user.goal_list_id)
    user.goal_list_id.push(newgoal._id)
    await user.save(); 
    
    res.status(201).json({
        message: "Goal created successfully",

        })
})

const updategoalbody = zod.object({
    goalName : zod.string().optional(),
    goalDescription : zod.string().optional(),
    goalStart : zod.string().optional(),
    goalEnd : zod.string().optional(),
    goalId : zod.string(),
})

// update goal
router.post('/updategoal',authMiddleware, async(req,res) => {
    const {success} = updategoalbody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message : "Add a feild"
        })
    }
    //add frontend pass for goalId
    try{
        await Goal.updateOne({ _id: req.body.goalId }, req.body)
        res.status(201).json({
            message: "Goal updated successfully",
            })
    }catch{
        res.status(411).json({
            message: "Problem in creating goal",
            })
    }
})

const goal_completebody = zod.object({
    goalId : zod.string(),
    marked_unmarked : zod.string(),
})
// task complete mark 
router.post('/complete-goal',authMiddleware, async (req,res) =>{
    const {success} = goal_completebody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message : "Wrong input"
        })
    }

    // The increment to be done if the task has been done or not +1 for complete marked and -1 for not completed

    const incValue = Number(req.body.marked_unmarked);
    try{
        const updateResult = await Goal.findOneAndUpdate(
            { _id: req.body.goalId },
            { $inc: { datecompleted: incValue } })
        if (!updateResult) {
                return res.status(404).json({
                    message: "Goal not found"
                });
            }

        res.status(201).json({
            message: "Task completed successfully",
            })
    }catch{
        res.status(411).json({
            message: "Problem in marking complete task",
            })
        }

})

const delete_goalbody = zod.object({
    goalId : zod.string(),
})

router.post('/delete-goal', authMiddleware, async(req,res) =>{
    const {success} = delete_goalbody.safeParse(req.body)
    function findgoal(){
        if(value != req.goalId){
            return value;
        }else{
            return null;
        }
    }

    if(!success){
        return res.status(411).json({
            message : "Wrong input"
        })
    }

    try{

       const delete_goal = await Goal.deleteOne({_id : req.body.goalId})
       if(!delete_goal){
        return res.status(411).json({
            message : "the goal doesn't exist"
        })
       }
        // removing the goal from the goal_list_id

        const user = await User.findOne({_id : req.userId});
        const filtered = user.goal_list_id.filter(findgoal);
        user.goal_list_id = filtered;
        await user.save();

        res.status(201).json({
            message: "goal deleted successfully",
            })
    }catch{
        res.status(411).json({
            message: "Problem in deleting goal",
            })
        }

    } 

)

const addfriendbody = zod.object({
    goalId : zod.string(),
    user_friendId : zod.string()

})
router.post('/Addfriend',authMiddleware,async(req,res) => {
    const {success} = addfriendbody.safeParse(req.body)
    if(!success){
         return res.status(411).json({
            message : "Unable to add a friend 1"
        })
    }
    // procedure is add the goal to the friends goal list 
    const friend_add  = await User.findOne({_id : req.body.user_friendId})
    const goal_add = await Goal.findOne({_id : req.body.goalId})
     try{ 
        if (!friend_add) {
            return res.status(404).json({
                message: "Friend not found"
            });
        }

        if (!goal_add) {
            return res.status(404).json({
                message: "Goal not found"
            });
        }
        if (!friend_add.goal_list_id) {
            friend_add.goal_list_id = [];
        }
        // add goal id in the goal list of the friend as the goal id will be added when creating the goal for the creator
        console.log("Before update:", friend_add);
        friend_add.goal_list_id.push(req.body.goalId);
        console.log("After update:", friend_add);
        // add friend id in the goal schema as the user parameter will already set for the user that created the goal 
        goal_add.friends_id.push(req.body.user_friendId);

        await friend_add.save();
        await goal_add.save();
        return res.status(201).json({
            message: "friend added successfully",
        })
    }catch(error){
        return res.status(411).json({
            message : "Unable to add a friend",
            error : error.message
        })
    }
})

const deletefriendbody = zod.object({
    goalId : zod.string(),
    user_friendId : zod.string()

})

router.post('/deletefriend',authMiddleware, async(req,res) =>{
    const {success} = deletefriendbody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message : "Unable to delete a friend"
        })
    }
    try{
        const friend_delete = await User.findOne({_id : req.body.user_friendId})
        const goal_delete = await Goal.findOne({_id : req.body.goalId})
        if (!friend_delete) {
            return res.status(404).json({
                message: "Friend not found"
            });
        }

        if (!goal_delete) {
            return res.status(404).json({
                message: "Goal not found"
            });
        }
        // removing the friends id from the friends id in the goal model
        goal_delete.friends_id = goal_delete.friends_id[0].filter(id => id !== req.body.user_friendId);
        // removing the goal id from the friends goal list
        friend_delete.goal_list_id = friend_delete.goal_list_id[0].filter(id => id !== req.body.goalId);
        console.log("Before friend deletion:", friend_delete);
        console.log("Before goal deletion:", goal_delete);
        await goal_delete.save();
        await friend_delete.save();
        console.log("After friend deletion:", friend_delete);
        console.log("After goal deletion:", goal_delete);

        res.status(201).json({
            message: "friend deleted successfully",
        })
    }catch(error){
        res.status(411).json({
            message : "Unable to delete a friend",
            error : error.message
        })
    }
})


module.exports = router;