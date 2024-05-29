const express = require('express');

const userRouter = require('./user');
const goalRouter = require('./goal');
const router = express.Router();
router.use('/user',userRouter);
router.use('/goal',goalRouter);
module.exports = router;