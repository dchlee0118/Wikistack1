const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        res.send('got to get user')
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