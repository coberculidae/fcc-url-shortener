const express = require('express')
const router = express.Router()
const { getURL, createShortURL} = require('../controllers/url.controller')

router.route('/api/shorturl/:id?').get(getURL)
router.route('/api/shorturl').post(createShortURL)

module.exports = router