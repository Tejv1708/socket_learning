import express from 'express'
import { getAllActiveUser } from '../controller/activeUserController.js'


const router = express.Router()

router.get( '/', getAllActiveUser )

export default router