const TaskShortener = require('../models/url.model')
const { URL } = require('url');
const dns = require('dns')
const getURL = async (req, res) => {
    // let baseUrl = 'https://localhost:3000/api/shorturl/'
    const longUrl = await TaskShortener.find({ short_url: req.params.id })
    res.redirect(longUrl[0].original_url)
}

const createShortURL = async (req, res) => {
    if (req.body.url.includes('https://')) {
        let urlObject = new URL(req.body.url)
        dns.lookup(urlObject.hostname, async (err) => {
            if (err) {
                res.json({ error: 'invalid url' })
            } else {
                const url = {}
                url.original_url = new URL(req.body.url)
                url.short_url = String(Math.floor(Math.random() * 10000))
                const shortener = await TaskShortener.create(url)
                res.json(url)
            }
        }
        );
    } else {
        res.json({ error: 'invalid url' })
    }
}
module.exports = {
    getURL,
    createShortURL
}