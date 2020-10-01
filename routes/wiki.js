const express = require('express');
const { Page, User } = require('../models');
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
        let arr = await User.findOrCreate({where: {name: req.body.name, email: req.body.email}})
        let user = arr[0];

        const newPage = await Page.create({
            title: req.body.title,
            content: req.body.content
        })
        await newPage.setAuthor(user);
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
        let slugUser = await User.findOne({
            where: {id: slugPage.authorId}
        })
        res.send(wikiPage(slugPage, slugUser))
    } catch (error) {
        next(error);
    }
})

module.exports = router