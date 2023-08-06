import { request, response } from "express"
import mongoose ,{ mongo }  from "mongoose"
import grid from 'gridfs-stream'

const url = 'http://localhost:8000'

let gfs,gridfsBucket ;
const conn = mongoose.connection;

// we will need to stream pictures on bucket named fs

conn.once('open', ()=> {
    
    gridfsBucket =  new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });

    gfs = grid(conn.db, mongoose.mongo)
    gfs.collection('fs');

})

export const uploadImage = (req,res) =>{

    if(!req.file){
        return res.status(400).json( "File not found")
    }

    console.log(req.file)

    const imageUrl = `${url}/file/${req.file.filename}`
    res.status(200).json(imageUrl);  

}

//once uploaded picture url is generated according to db url and link is sent to mongdb collection fs.files

//Now to get that image from mongodb make a route for get request


// }

export const getImage = async (request, response) => {
    
    try {
      const file = await conn
        .db.collection("fs.files")
        .findOne({ filename: request.params.filename });
  
      if (!file) {
        return response.status(404).json({ msg: "File not found" });
      }
  
      const readStream = gridfsBucket.openDownloadStream(file._id);
      readStream.pipe(response);

    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
  };

//Since iage is in streams form import package gridfs-stream