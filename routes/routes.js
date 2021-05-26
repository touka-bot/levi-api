const anime = require(`../tools/anime`);
const animekisa = require(`../tools/animekisa`);
const io = require('../tools/IO');
const https = require('https')
const cors = require('cors');

var appRouter = function (app) {

    app.get("/", function (req, res) {
        res.send("Levi API (v2)");
    });

    app.get("/touka/api/v2/getanime/animekisa/:title", function (req, res) {
        const url = `https://animekisa.tv/search?q=${req.params.title.toLowerCase().replace(" ", "+")}`;
        animekisa.getSearchResults(url, res);
    });

    app.get("/touka/api/v2/getanime/animekisa/:title/:index", function (req, res) {
        const url = `https://animekisa.tv/search?q=${req.params.title.toLowerCase().replace(" ", "+")}`;
        const index = req.params.index;
        animekisa.getTitle(url, index, res);
    });

    app.get("/touka/api/v2/getanime/animekisa/:title/:index/thumbnail", function (req, res) {
        const url = `https://animekisa.tv/search?q=${req.params.title.toLowerCase().replace(" ", "+")}`;
        const index = req.params.index;
        animekisa.getThumbnail(url, index, res);
    });

    app.get("/touka/api/v2/getanime/animekisa/:title/:index/:episode", function (req, res) {
        const url = `https://animekisa.tv/search?q=${req.params.title.toLowerCase().replace(" ", "+")}`;
        const index = req.params.index;
        const episode = req.params.episode;
        animekisa.getEpisode(url, index, episode, res);
    });

    app.get("/touka/api/v2/newest/animekisa", function (req, res) {
        animekisa.newest(res);
    });

    app.get("/touka/api/v2/keys/get/:key", function (req, res) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const key = req.params.key;
        const value = io.getValue(key);

        res.send(value);
    });

    app.get("/touka/api/v2/keys/add/:key/:value", function (req, res) {
        const key = req.params.key;
        const val = req.params.value;
        io.addKey(key, val);

        res.sendStatus(200);
    });

    app.get("/touka/api/v2/w2g/getsession/:url", function (req, res) {
        const url = Buffer.from(req.params.url, 'base64').toString();
        const data = JSON.stringify({
            "w2g_api_key": "9qyabwhovrlsbh38s6y0ojjojlken4brvra357d8zree4ozm3tq8stv3dfayfydj",
            "share": url
        })

        const options = {
            method: 'POST',
            hostname: 'w2g.tv',
            path: '/rooms/create.json',
            port: '443',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        const request = https.request(options, response => {
            console.log(`statusCode: ${response.statusCode}`)

            response.on('data', d => {
                res.send('https://w2g.tv/rooms/' + JSON.parse(d.toString()).streamkey);
            })
        })

        request.on('error', error => {
            console.error(error)
        })

        request.write(data);
        request.end();
    });

}

module.exports = appRouter;