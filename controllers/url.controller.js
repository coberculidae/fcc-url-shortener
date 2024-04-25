const TaskShortener = require('../models/url.model')
const { URL } = require('url');
const dns = require('dns')
const getURL = async (req, res) => {
    // let baseUrl = 'https://localhost:3000/api/shorturl/'
    const longUrl = await TaskShortener.find({ short_url: req.params.id })
    res.redirect(longUrl[0].original_url)
}

const createShortURL = async (req, res) => {
    let valid = false
    // let urlHost = req.body.url.replace('www.',"")
    // if (req.body.url.includes('https://')) {
        let urlObject = new URL(req.body.url)
        console.log(urlObject)
        dns.lookup(urlObject.hostname, async (err) => {
            if (err) {
                res.json({ error: 'invalid url' })
            } else {
                const url = {}
                url.original_url = urlObject
                url.short_url = String(Math.floor(Math.random() * 10000))
                const shortener = await TaskShortener.create(url)
                res.json(url)
            }
        }
        );
    }

module.exports = {
    getURL,
    createShortURL
}