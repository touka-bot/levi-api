const jsdom = require("jsdom");
const got = require('got');
const utils = require("./utils");
const getUrls = require('get-urls');

const baseUrl = 'https://animekisa.tv';

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
    getThumbnail(url, index, res) {
        return getThumbnail(url, index, res)
    },
    getEpisode(url, index, episode, res) {
        return getEpisode(url, index, episode, res)
    }
}

function getSearchResults(url, res) {
    got(url).then(response => {

        const respo = new Array();

        const dom = new JSDOM(response.body);
        for (let o = 0; o < dom.window.document.getElementsByClassName(`similarboxmain`).length; o++) {
            const innerHTML = dom.window.document.getElementsByClassName(`similarboxmain`).item(o).innerHTML;


            const innerDom = new JSDOM(innerHTML);
            let result = innerDom.window.document.getElementsByClassName('an');

            for (let i = 0; i < result.length; i++) {
                if (!result.item(i).getAttribute('href').toString().endsWith("/"))
                    respo.push(baseUrl + result.item(i).getAttribute('href').toString());
            }
        }

        res.send(respo);
    }).catch(err => {
        res.send('4004');
        return err;
    });
}

function getTitle(url, index, res) {
    got(url).then(response => {
        const respo = new Array();

        const dom = new JSDOM(response.body);
        for (let o = 0; o < dom.window.document.getElementsByClassName(`similarboxmain`).length; o++) {
            const innerHTML = dom.window.document.getElementsByClassName(`similarboxmain`).item(o).innerHTML;


            const innerDom = new JSDOM(innerHTML);
            let result = innerDom.window.document.getElementsByClassName('an');

            for (let i = 0; i < result.length; i++) {
                if (!result.item(i).getAttribute('href').toString().endsWith("/"))
                    respo.push(baseUrl + result.item(i).getAttribute('href').toString());
            }
        }

        got(respo[index]).then(response => {
            const titleDom = new JSDOM(response.body);
            const titleHTML = titleDom.window.document.getElementsByClassName(`infoepbox`).item(0).innerHTML;

            const titleInnerDom = new JSDOM(titleHTML);
            const titleInnerHTML = titleInnerDom.window.document.getElementsByTagName(`a`);


            const innerRespo = new Array();
            for (let i = 0; i < titleInnerHTML.length; i++) {
                innerRespo.push(baseUrl + '/' + titleInnerHTML.item(i).getAttribute('href').toString())
            }

            res.send(innerRespo.reverse());
        })
    }).catch(err => {
        res.send('4004');
        return err;
    });
}

function getThumbnail(url, index, res) {
    got(url).then(response => {
        const respo = new Array();

        const dom = new JSDOM(response.body);
        for (let o = 0; o < dom.window.document.getElementsByClassName(`similarboxmain`).length; o++) {
            const innerHTML = dom.window.document.getElementsByClassName(`similarboxmain`).item(o).innerHTML;


            const innerDom = new JSDOM(innerHTML);
            let result = innerDom.window.document.getElementsByClassName('an');

            for (let i = 0; i < result.length; i++) {
                if (!result.item(i).getAttribute('href').toString().endsWith("/"))
                    respo.push(baseUrl + result.item(i).getAttribute('href').toString());
            }
        }

        got(respo[index]).then(response => {
            const titleDom = new JSDOM(response.body);
            res.send(baseUrl + '/' + titleDom.window.document.getElementsByClassName('posteri').item(0).getAttribute('src'));
        })
    }).catch(err => {
        res.send('4004');
        return err;
    });
}

function getEpisode(url, index, episode, res) {
    got(url).then(response => {
        const respo = new Array();

        const dom = new JSDOM(response.body);
        for (let o = 0; o < dom.window.document.getElementsByClassName(`similarboxmain`).length; o++) {
            const innerHTML = dom.window.document.getElementsByClassName(`similarboxmain`).item(o).innerHTML;


            const innerDom = new JSDOM(innerHTML);
            let result = innerDom.window.document.getElementsByClassName('an');

            for (let i = 0; i < result.length; i++) {
                if (!result.item(i).getAttribute('href').toString().endsWith("/"))
                    respo.push(baseUrl + result.item(i).getAttribute('href').toString());
            }
        }

        got(respo[index]).then(response => {
            const titleDom = new JSDOM(response.body);
            const titleHTML = titleDom.window.document.getElementsByClassName(`infoepbox`).item(0).innerHTML;

            const titleInnerDom = new JSDOM(titleHTML);
            const titleInnerHTML = titleInnerDom.window.document.getElementsByTagName(`a`);


            const innerRespo = new Array();
            for (let i = 0; i < titleInnerHTML.length; i++) {
                innerRespo.push(baseUrl + '/' + titleInnerHTML.item(i).getAttribute('href').toString())
            }

            got(innerRespo[episode]).then(r => {

                const urls = Array.from(getUrls(r.body));

                var destinationUrl;

                for (let x = 0; x < urls.length; x++) {
                    if (urls[x].toString().includes("vidstreaming.io"))
                        destinationUrl = urls[x];
                }

                got(destinationUrl).then(response => {

                    const destUrls = Array.from(getUrls(response.body));

                    for (let x = 0; x < destUrls.length; x++) {
                        if (destUrls[x].toString().includes("googleapis"))
                            res.send(destUrls[x]);
                    }

                    res.send('4004');


                })

            })
        })
    }).catch(err => {
        res.send('4004');
        return err;
    });
}