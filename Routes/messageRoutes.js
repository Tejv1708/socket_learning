import express from 'express'
import { createMessage, deleteMessage, getMessage } from '../controller/messageController.js';
import { uploads } from '../utils/multer.js';
const router = express.Router();

router.post( '/', uploads.array( 'images', 6 ), createMessage )

router.get( '/:receiver_id/:friendConversation_id', getMessage )

router.delete( '/', deleteMessage )

export default router 