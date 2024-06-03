const {User}  = require("../db");
const zod = require("zod")
const argon2 = require("argon2")
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");
JWT_SECRET = 'fbhjrsdnckzcueribnvejskzcnk4389w732';
const express = require('express');
const router = express.Router();

const signupbody = zod.object({
    username : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string().min(6)
});

router.post('/signup', async (req,res) => {
    const {success} = signupbody.safeParse(req.body);
    if (!success){
        return res.status(411).json({
            message : "Incorrect inputs"
        })
    } 
    console.log(req.body.username);

    const existingUser = await User.findOne({
        username : req.body.username,
    });
   

    if(existingUser){
         return res.status(411).json({
            message : "Email already taken",
        })
    }

    const newuser = User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        })

    //hashing
    var hashedPassword = await newuser.createHash(req.body.password);
    newuser.password_hash = hashedPassword;
    
    await newuser.save();
    
    const userId = newuser._id;
    const token = jwt.sign({
        userId
        }, JWT_SECRET);

    return res.status(201).json({
        message: "User created successfully",
        token : token
        })

})

const signinbody = zod.object({
    username : zod.string(),
    password : zod.string().min(6)
})

router.post('/signin',async (req,res) => {
    const {success} = signinbody.safeParse(req.body);
    if(!success) {
        res.status(411).json({
            message : "Incorrect inputs"
        })
    }

    const user =  await User.findOne({
        username : req.body.username
    })
   

    if(!user){
        res.status(411).json({
            message  : "User does not exist ,Please signup"
        })
    }else {
        if( await argon2.verify(user.password_hash,req.body.password))
        {
            const token = jwt.sign({
                userId: user._id
                }, JWT_SECRET);

            return res.status(200).json({
                message: "User Successfully Logged In",
                token : token
            })
        } else
        {
            return res.status(400).json({
                message: "Incorrect Password",
              });
        }
    }
    


})

const updatebody = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional(),
})

router.put('/updateuser', authMiddleware , async (req,res) => {
    const validation  = updatebody.safeParse(req.body);
    if(!validation.success) {
        return res.status(411).json({
            message : "Error while updating information",
            error  : validation.error.errors
        })
    }

    const updateuser = await User.updateOne({_id : req.userId}, req.body);
    if (updateuser.modifiedCount === 0) {
        return res.status(400).json({
            message: "No changes were made to the user",
        });
    }


    return res.status(201).json({
        message : "Update successfully",
    })
})

router.get('/bulk', async (req,res) =>{
    const name = req.query || '';

    const users = await User.find({
        $or : [{
            firstName : {
                "$regex" : name
            }
        },{
            lastName : {
                "$regex" : name
            }
        }]
    })

    res.json({
        user : users.map(user =>({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id

        }))
    })

})

router.get('/names',async(req,res)=>{
    const ids = req.body;
    let name = []
    try{
        const user_list = await Promise.all(ids.map(id => User.findOne({_id : id})))
        for(let i =0;i<user_list.length;i++){
            const user = user_list[i];
            if(!user){
               return res.status(411).json({
                    message : "User with id ${ids[i]} doesn't exist"
                })
            }
            name.push(user.firstName + " " + user.lastName)
        }
        res.status(200).json({
            name
        });
    }catch{
        res.status(500).json({
            message: "Error fetching user data",
            error: error.message
        });
    }
    
 
    })

    
    


module.exports = router;