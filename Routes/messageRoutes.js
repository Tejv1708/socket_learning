import express from 'express'
import { createMessage, deleteMessage, data } from '../controller/messageController.js';
import { uploads } from '../utils/multer.js';
const router = express.Router();

router.post( '/', uploads.array( 'images', 6 ), createMessage )

router.get( '/', data )

router.delete( '/', deleteMessage )

export default router 