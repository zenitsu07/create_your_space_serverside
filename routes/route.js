import express from 'express'

import { signupUser,loginUser ,logoutUser} from "../controller/user-controller.js";
import { uploadImage, getImage } from '../controller/image-controller.js';
import upload from '../utils/upload.js';
import { createPost,updatePost,deletePost,getPost,getAllPosts } from '../controller/post-controller.js';
import { authenticateToken ,createNewToken} from '../controller/jwt-controller.js';

const router = express.Router();


// router.post('/signup',signupUser);
router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/logout', logoutUser);

router.post('/token', createNewToken);
     
//call middlware for single file upload to mongodb
router.post('/file/upload', upload.single('file') ,uploadImage)
router.get('/file/:filename', getImage);

// router.post('/create',authenticateToken,  createPost)
router.post('/create', createPost)
router.put('/update/:id', authenticateToken, updatePost);
// router.delete('/delete/:id', authenticateToken, deletePost);
router.delete('/delete/:id',  deletePost);

router.get('/post/:id', getPost);

router.get('/posts', getAllPosts);
export default router;