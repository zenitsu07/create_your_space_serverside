import mongoose from "mongoose";

const userSchema =  mongoose.Schema({
    
    name:{
        type:String,
        required: true
    },

    username:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

})
//to apply userSchema on user Use mongoose.model
const user = mongoose.model('user',userSchema);

export default user;
