const express = require('express');
const { Page } = require('../models');
const router = express.Router();
const {addPage, wikiPage, main} = require('../views')

function slugCreate(title){
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

router.get('/', async(req, res, next) => {
    try {
        let pages = await Page.findAll()
        // res.json(pages)
        res.send(main(pages))
    } catch (error) {
        next(error)
    }
})

router.post('/', async(req, res, next) => {
    try {
        // console.log('req body is: ', req.body)
        const newPage = await Page.create({
            title: req.body.title,
            content: req.body.content
        })
        res.redirect(`/wiki/${newPage.slug}`);
    } catch (error) {
        next(error)
    }
})

router.get('/add', (req, res, next) => {
    try {
        res.send(addPage())
    } catch (error) {
        next(error)
    }
})

router.get('/:slug', async(req, res, next) => {
    try {
        let slugPage = await Page.findOne({
            where: {slug: req.params.slug}
        })
        res.send(wikiPage(slugPage))
    } catch (error) {
        next(error);
    }
})

module.exports = router