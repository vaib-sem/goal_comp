const mongoose = require('mongoose');
const argon2 = require("argon2")

const { array, Schema, number } = require('zod');
const db_link = 'mongodb://admin:Vaibhav30072005@ac-fnpmszb-shard-00-00.9hhfgmn.mongodb.net:27017,ac-fnpmszb-shard-00-01.9hhfgmn.mongodb.net:27017,ac-fnpmszb-shard-00-02.9hhfgmn.mongodb.net:27017/?replicaSet=atlas-3ca8vf-shard-0&ssl=true&authSource=admin'
mongoose.connect(db_link);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
        },
    password_hash: {
        type: String,
        required: true
        },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
        },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
        },
    goal_list_id : [{
            type : Array,
            required : true,
            default :[],
        }]
});

userSchema.methods.createHash = async function (plainTextPassword) {
    return await argon2.hash(plainTextPassword);
};

userSchema.methods.validatePassword = async function (candidatePassword) {
  return await argon2.verify(this.password_hash, candidatePassword)
};

const datecompleteSchema  = new mongoose.Schema({
    id : String,
    completed_days : Number
})

const goalSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
        trim : true,
    },
    goalName : {
        type : String,
        required : true,
        trim : true,
    },
    goalDescription : {
        type : String,
        required : false,
        trim : true,
    },
    goalStart : {
        type : Date,
        required : true,
        trim : true
    },
    goalEnd : {
        type : Date,
        required : false,
        trim : true,
        default : 'Present'
    },
    datecompleted:[datecompleteSchema],
    
    friends_id : [{
        type : Array,
        required : true,
        default : [],
    }],
    last_completed : [{
        type : Date,
        required : false
    }]

})

const Goal =  mongoose.model('Goal', goalSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    Goal
}