import mongoose from "mongoose";


const tokenSchema = mongoose.Schema({
    token:{
        type: String,
        required: true
    }
})
//now 'token' is a key in tokenSchema with value as a string passed
const token = mongoose.model('token', tokenSchema)
export default  token;
//for jwt auth run node=> require('crypto).randomBytes(64).toString('hex')