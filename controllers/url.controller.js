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
    const urlPattern = new RegExp('^(https?:\\/\\/)?')
     try {
        let urlObject = new URL(req.body.url)
        console.log(urlObject)
        if (urlObject.protocol === 'http:' || 'https:') {
            dns.lookup(urlObject.hostname, async (err) => {
                if (err) {
                    console.log('dns')
                    res.json({ error: 'invalid url' })
                } else {
                    console.log('not dns')
                    const url = {}
                    url.original_url = urlObject
                    url.short_url = String(Math.floor(Math.random() * 10000))
                    const shortener = await TaskShortener.create(url)
                    res.json(url)
                }
            }
            );
        } else {
            res.json({ error: 'invalid url' })
        }
     } catch (error) {
        res.json({error : 'invalid url'})
     }
    }

module.exports = {
    getURL,
    createShortURL
}