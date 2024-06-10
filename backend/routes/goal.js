const zod = require("zod")
const {Goal , User} = require("../db")
const { authMiddleware } = require("../middleware")
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const cors = require('cors');
router.use(cors());
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
        // date completed is added with reference to the id the completed_days belongs
        datecompleted : [{
            id  : req.userId,
            completed_days : 0
        }]
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
    goalStart: zod.string().optional().transform(val => val ? new Date(val) : undefined),
    goalEnd: zod.string().optional().transform(val => val ? new Date(val) : undefined),
    goalId : zod.string(),
})

// update goal
router.post('/updategoal',authMiddleware, async(req,res) => {
    const parseResult= updategoalbody.safeParse(req.body)
    console.log(parseResult)
    if(!parseResult.success){
        console.log("Validation errors:", parseResult.error.errors);
        return res.status(411).json({
            message : "Add a feild"
        })
    }
    const validatedData = parseResult.data;
    //add frontend pass for goalId
    try{
        const result =  await Goal.updateOne({ _id: validatedData.goalId }, validatedData)
        if(result.nModified === 0){
            console.log("No documents were modified.");
            return res.status(400).json({
                message: "Goal update failed. No changes were made."
            });
        }
        console.log("Goal updated successfully:", result);
        res.status(201).json({
            message: "Goal updated successfully",
            })
    }catch{
        res.status(411).json({
            message: "Problem in creating goal",
            })
    }
})


router.get('/bulk', async (req, res) => {
    const id = req.query.id; 
    if (!id ) {
        return res.status(400).json({ error: "Invalid or missing id" });
    }

    try {
        const goal = await Goal.findById((id));;
        if (!goal) {
            console.error('goal not found')
            return res.status(404).json({ error: "Goal not found" });
        }

        res.json({
            goalName: goal.goalName,
            goalDescription: goal.goalDescription,
            goalStart: goal.goalStart,
            goalEnd: goal.goalEnd,
            datecompleted: goal.datecompleted,
            friends_id: goal.friends_id
        });
    } catch (error) {
        console.error('Error fetching goal:', error);
        res.status(500).json({ error: "Internal Server Error in backend" });
    }

});


goal_completebody = zod.object({
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
        // identifier used to find the id of the user in datecompleted and $inc to inc the value of completed_days by 1
        const update_date_goal = await Goal.findOneAndUpdate(
            { _id: req.body.goalId },
            {$inc : {"datecompleted.$[element].complted_days" : req.marked_unmarked}},
            {arrayFilters : [{"element.id":{$eq : req.userId}}]})
        
            if (!update_date_goal) {
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
router.post('/Addfriend', authMiddleware, async (req, res) => {
    const { success } = addfriendbody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Unable to add a friend "
        });
    }

    
    const friend_add = await User.findOne({ _id: req.body.user_friendId });
    const goal_add = await Goal.findOne({ _id: req.body.goalId });

    console.log("Before update:", friend_add);
    try {
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
        
        if (!Array.isArray(friend_add.goal_list_id)) {
            friend_add.goal_list_id = [];
        }

        friend_add.goal_list_id.push(req.body.goalId);

        if (!Array.isArray(goal_add.friends_id)) {
            goal_add.friends_id = [];
        }
        
        goal_add.friends_id.push(req.body.user_friendId);

        goal_add.datecompleted.push({
            id: req.body.user_friendId,
            completed_days: 0
        });

        console.log("After update:", goal_add);

        try {
            await friend_add.save();
            await goal_add.save();
            return res.status(201).json({
                message: "friend added successfully",
            });
        } catch (error) {
            return res.status(411).json({
                message: "Unable to add a goal",
                error: error.message
            });
        }

    } catch (error) {
        return res.status(411).json({
            message: "Unable to add a friend",
            error: error.message
        });
    }
});

const deletefriendbody = zod.object({
    goalId : zod.string(),
    user_friendId : zod.string()

})

router.post('/deletefriend',authMiddleware, async(req,res) =>{
    const {success} = deletefriendbody.safeParse(req.body)

    const filter = (object) => {
        var filtered = [];
        for(let i = 0; i<object.lenght ; i++){
            if(object[i].id != req.body.user_friendId){
                filtered.push(object[i]);
            }
        }
        return filtered;

    }

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
        goal_delete.datecompleted = filter(goal_delete.datecompleted);
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