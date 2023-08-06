
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

import Token from "../model/token.js";
import User from "../model/user.js";


dotenv.config();//in orde to use env variables
// const SECRET_KEY = process.env.SECRET_KEY;



//File functiwons -> handle callback functions used in route.ks
//SIGNUP API
export const signupUser = async (request, response) =>{

    try {
        // const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(request.body.password, salt);
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        // bcrypt.hash()

        const user = { username: request.body.username, name: request.body.name, password: hashedPassword }

        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({ msg: 'Signup successfull' });
    } catch (error) {
        return response.status(500).json({ msg: 'Error while signing up user' });
    }

}


//LOGIN API with help of token JWT auth
export const loginUser = async(request,response) => {

    //not is json format convert using to JSON this user variable contains all values of user object found b User.finOne function in mongodb atlas
    let user = await User.findOne({ username: request.body.username });
    if(!user){
        return response.status(400).json({msg:"Error username n ot found"})
    }
    //use try and catch method to handle errors if user exists in db bcoz response still depends on cloud database
    try{
        //use bcrypt.compare to compare given andsaved pasword
        let match = await bcrypt.compare(request.body.password, user.password)
        
        //if passswords match then create a access toekn and refresh token with json Web Token JWT
        if(match){

            //accesstoekn is temporary avaibale set usually for 15 minutes
            //jstsign(body,secret key) create usign cypto 
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY , {expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)
            //we will create new access token with refresh token after 15m everytimes

            const newToken = new Token({ token: refreshToken})
            await newToken.save();

            //LOGIC -> if passwords match then both accestoken and refresh token are created for user and when 
            //accesstoken expires in 15 min tehn to generate new token for user we will check whteher refeesh token exists in dbms or not 
            //if exists then we will generate new token accesstoken for user to access the app

            return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username : user.username})

        }
        else{
            return response.status(400).json({msg: "password does not match"});
        }
    
    }
    
    catch(error){

        //this error when there is connectivity issue
        return response.status(500).json({ msg:'Error while login the user' })
    
    }

}
//these exports are then setup in router.js

export const logoutUser = async (request, response) => {

    const token = request.body.token;
    await Token.deleteOne({ token: token });

    response.status(204).json({ msg: 'logout successfull' });
    
}


// function Usercontroller(req, res, next) {

//     const authorization = req.headers.authorization;

//     if (!authorization) {
//         return res.status(401).json({
//             message: 'No Authorization Header'
//         })
//     }

//     try {
//         const token = authorization.split('Bearer ')[1];
//         if (!token) {
//             return res.status(401).json({
//                 message: 'Invalid Token Format'
//             })
//         }
        
//         const decode = jwt.verify(token, SECRET_KEY);
//         req.user = decode
//         // next()

//     }catch (error) {
//         if (error instanceof jwt.TokenExpiredError) {
//             return res.status(401).json({
//                 message: 'Session Expired',
//                 error: error.message,
//             })
//         }
//         if (error instanceof jwt.JsonWebTokenError || error instanceof TokenError) {
//             return res.status(401).json({
//                 message: 'Invalid Token',
//                 error: error.message,
//             })
//         }
//         res.status(500).json({
//             message: 'Internal server Error',
//             error: error.message,
//             stack: error.stack
//         });
//     }
// }

// export default Usercontroller