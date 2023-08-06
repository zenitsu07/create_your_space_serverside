import mongoose from "mongoose"

export const Connection = async(username,password) =>{
    
    //connecting url from mongodb site
    const URL = `mongodb://${username}:${password}@ac-khixnvr-shard-00-00.mmh7usl.mongodb.net:27017,ac-khixnvr-shard-00-01.mmh7usl.mongodb.net:27017,ac-khixnvr-shard-00-02.mmh7usl.mongodb.net:27017/?ssl=true&replicaSet=atlas-7nj9l0-shard-0&authSource=admin&retryWrites=true&w=majority`
    try{
        //function is passed as 2nd argunment to parse the passed URL to connect fucntion and as previous url gets deprecated now
        await mongoose.connect(URL, {useNewUrlParser:true})
        console.log("database connected successfully")
    }

    catch(error) {
        console.log("error in connecting database",error)
    }
       
        
}