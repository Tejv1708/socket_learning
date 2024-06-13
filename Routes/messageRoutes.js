import express from 'express'
import { deleteMessage, getMessage, sendMessage } from '../controller/messageController.js';

const router = express.Router();

router.post( '/', sendMessage )

router.get( '/', getMessage )

router.delete( '/:id', deleteMessage )

export default router 