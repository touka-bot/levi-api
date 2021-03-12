const anime = require(`../tools/anime`);
const animekisa = require(`../tools/animekisa`);
const cors = require('cors');

var appRouter = function (app) {

    app.get("/", function (req, res) {
        res.send("Levi API (v2)");
    });

    app.get("/touka/api/v2/getanime/4anime/:title", function (req, res) {
        const url = `https://4anime.to/?s=${req.params.title.toLowerCase().replace(" ", "+")}`;
        anime.getSearchResults(url, res);
    });

    app.get("/touka/api/v2/getanime/4anime/:title/:index", function (req, res) {
        const url = `https://4anime.to/?s=${req.params.title.toLowerCase().replace(" ", "+")}`;
        const index = req.params.index;
        anime.getTitle(url, index, res);
    });

    app.get("/touka/api/v2/getanime/4anime/:title/:index/:episode", function (req, res) {
        const url = `https://4anime.to/?s=${req.params.title.toLowerCase().replace(" ", "+")}`;
        const index = req.params.index;
        const episode = req.params.episode;
        anime.getEpisode(url, index, episode, res);
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

    app.get("/touka/api/v2/getanime/animekisa/:title/:index/:episode", function (req, res) {
        const url = `https://animekisa.tv/search?q=${req.params.title.toLowerCase().replace(" ", "+")}`;
        const index = req.params.index;
        const episode = req.params.episode;
        animekisa.getEpisode(url, index, episode, res);
    });
}

module.exports = appRouter;