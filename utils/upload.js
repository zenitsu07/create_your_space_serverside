import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';

import dotenv from 'dotenv';

dotenv.config();
 
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({

    url: `mongodb://${username}:${password}@ac-khixnvr-shard-00-00.mmh7usl.mongodb.net:27017,ac-khixnvr-shard-00-01.mmh7usl.mongodb.net:27017,ac-khixnvr-shard-00-02.mmh7usl.mongodb.net:27017/?ssl=true&replicaSet=atlas-7nj9l0-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    
    file: (req, file) => {
    const match = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/webp"];

    if (match.indexOf(file.memeType) === -1) {
      return `${Date.now()}-blog-${file.originalname}`;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },

});

// Utilizing multer for image upload
const upload = multer({ storage });

export default upload;