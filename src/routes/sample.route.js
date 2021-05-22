import { sampleFunction } from '../controllers/task/taskController';

import express from 'express';
const router = express.Router();

router
    .route('/')
    .get(sampleFunction)

module.exports = router;