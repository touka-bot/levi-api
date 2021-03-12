const jsdom = require("jsdom");
const got = require('got');
const utils = require("./utils");
const getUrls = require('get-urls');

const {
    JSDOM
} = jsdom;

module.exports = {
    getSearchResults(url, res) {
        return getSearchResults(url, res)
    },
    getTitle(url, index, res) {
        return getTitle(url, index, res)
    },
    getEpisode(url, index, episode, res) {
        return getEpisode(url, index, episode, res)
    }
}

function getSearchResults(url, res) {
    got(url).then(response => {
        const dom = new JSDOM(response.body);
        const innerHTML = dom.window.document.getElementsByClassName(`container`).item(0).innerHTML;

        const respo = new Array();
        const innerDom = new JSDOM(innerHTML);
        let result = innerDom.window.document.getElementsByTagName(`a`);
        for (let i = 1; i < result.length; i++) {
            respo.push(utils.extractUrls(result.item(i).href)[0]);
        }
        res.send(respo);
    }).catch(err => {
        return err;
    });
}

function getTitle(url, index, res) {
    got(url).then(response => {
        const dom = new JSDOM(response.body);
        const innerHTML = dom.window.document.getElementsByClassName(`container`).item(0).innerHTML;

        const respo = new Array();
        const innerDom = new JSDOM(innerHTML);
        let result = innerDom.window.document.getElementsByTagName(`a`);
        for (let i = 1; i < result.length; i++) {
            respo.push(utils.extractUrls(result.item(i).href)[0]);
        }

        got(respo[index]).then(response => {
            const titleDom = new JSDOM(response.body);
            const titleHTML = titleDom.window.document.getElementsByClassName(`episodes range active`)[0].innerHTML;

            const titleInnerDom = new JSDOM(titleHTML);
            const titleInnerHTML = titleInnerDom.window.document.getElementsByTagName(`a`);
            const episodes = new Array();
            for (let i = 0; i < titleInnerHTML.length; i++) {
                episodes.push(utils.extractUrls(titleInnerHTML.item(i).href)[0]);
            }
            res.send(episodes);
        })
    }).catch(err => {
        return err;
    });
}

function getEpisode(url, index, episode, res) {
    got(url).then(response => {
        const dom = new JSDOM(response.body);
        const innerHTML = dom.window.document.getElementsByClassName(`container`).item(0).innerHTML;

        console.log(innerHTML);

        const respo = new Array();
        const innerDom = new JSDOM(innerHTML);
        let result = innerDom.window.document.getElementsByTagName(`a`);
        for (let i = 1; i < result.length; i++) {
            respo.push(utils.extractUrls(result.item(i).href)[0]);
        }

        got(respo[index]).then(response => {
            const titleDom = new JSDOM(response.body);
            const titleHTML = titleDom.window.document.getElementsByClassName(`episodes range active`)[0].innerHTML;

            const titleInnerDom = new JSDOM(titleHTML);
            const titleInnerHTML = titleInnerDom.window.document.getElementsByTagName(`a`);
            const episodes = new Array();
            for (let i = 0; i < titleInnerHTML.length; i++) {
                episodes.push(utils.extractUrls(titleInnerHTML.item(i).href)[0]);
            }


            got(episodes[episode]).then(response => {
                const episodeDom = new JSDOM(response.body);
                const episodeHTML = episodeDom.window.document.body.innerHTML;

                const episodeInnerDom = new JSDOM(response.body);
                const urls = Array.from(getUrls(episodeInnerDom.window.document.body.innerHTML));
                for (let i = 0; i < urls.length; i++) {
                   if(urls[i].startsWith(`https://storage.googleapis.com`)) {
                        res.send(urls[i]);
                        break;
                   }
                }
                res.send(`4004`);
            })
        })
    }).catch(err => {
        return err;
    });
}