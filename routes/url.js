const express = require('express')
const {handlegenerateNewShortUrl} = require('../controllers/url')

const router = express.Router();

router.post('/', handlegenerateNewShortUrl)

module.exports = router;