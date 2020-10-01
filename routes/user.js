const express = require('express');
const { User } = require('../models');
const router = express.Router();
const {userList} = require('../views')

router.get('/', async(req, res, next) => {
    try {
        let users = await User.findAll();
        res.send(userList(users))
    } catch (error) {
        next(error)
    }
})

router.post('/', (req, res, next) => {
    try {
        res.send('got to post user')
    } catch (error) {
        next(error)
    }
})

router.get('/add', (req, res, next) => {
    try {
        res.send('got to get/add user')
    } catch (error) {
        next(error)
    }
})

module.exports = router