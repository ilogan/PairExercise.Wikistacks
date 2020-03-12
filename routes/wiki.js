const express = require('express')
const router = express.Router()
const { Page } = require('../models')
const addPage = require('../views/addPage')
router.get('/', (req, res, next) => {
  try{
res.send('wiki page')
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try{
    const { content, title } = req.body
    const page = new Page({
      title,
      content
    })
    console.log(page)
    await page.save()
    res.redirect(301, '/')
   //res.json(req.body)
  } catch(err) {
    next(err)
  }
})

router.get('/add', (req, res, next) => {
  try{
res.send(addPage())
  } catch(err) {
    next(err)
  }
})

module.exports = router
