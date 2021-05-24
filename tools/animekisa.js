const jsdom = require("jsdom");
const got = require('got');
const utils = require("./utils");
const getUrls = require('get-urls');
const io = require('./IO');

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
    },
    newest(res) {
        return newest(res)
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

            var responseCode = '4003';
            const titleDom = new JSDOM(response.body);
            const titleHTML = titleDom.window.document.getElementsByClassName(`infoepbox`).item(0).innerHTML;

            const titleInnerDom = new JSDOM(titleHTML);
            const titleInnerHTML = titleInnerDom.window.document.getElementsByTagName(`a`);


            const innerRespo = new Array();
            for (let i = 0; i < titleInnerHTML.length; i++) {
                innerRespo.push(baseUrl + '/' + titleInnerHTML.item(i).getAttribute('href').toString())
            }

            got(innerRespo.reverse()[episode]).then(r => {

                var urls = Array.from(getUrls(r.body));

                var destinationUrl;

                for (let x = 0; x < urls.length; x++) {
                    const host = urls[x].toString();
                    if (host.includes("vidstreaming.io") || host.includes("gogo-stream.com") || host.includes("gogo-play.net"))
                        destinationUrl = urls[x];
                }

                got(destinationUrl).then(response => {

                    var destUrls = Array.from(getUrls(response.body));
                    var downPage;

                    for (let x = 0; x < destUrls.length; x++) {
                        if (destUrls[x].toString().includes("googleapis")) {
                            const videoId = makeid(5);
                            io.addKey(videoId, destUrls[x]);
                            res.send(videoId);
                            return;
                        } else if (destUrls[x].toString().includes("/download?")) {
                            downPage = destUrls[x];
                        }
                    }

                    got(downPage).then(ree => {
                        const downUrls = Array.from(getUrls(ree.body));
                        var portal;
                        for (let x = 0; x < downUrls.length; x++) {

                            if (downUrls[x].toString().includes("streamsb")) {
                                portal = downUrls[x];
                            } else if (downUrls[x].toString().includes("sbembed")) {
                                portal = downUrls[x];
                            }
                        }

                        got(portal).then(r => {
                            var requestAnother = true;

                            const portalDom = new JSDOM(new JSDOM(r.body).window.document.getElementsByTagName('tbody').item(0).innerHTML);
                            const porter = portalDom.window.document.getElementsByTagName('a');
                            const fin = porter.item(porter.length - 1).getAttribute('onclick').replace("download_video(", "").replace(")", "").replace(new RegExp("'", 'g'), "").split(',');
                            const portalDownload = `https://streamsb.net/dl?op=download_orig&id=${fin[0]}&mode=${fin[1]}&hash=${fin[2]}`;

                            var pDwDom;
                            getLinkFromPortal(portalDownload, res, pDwDom);

                        })

                    })

                })

            })
        })
    }).catch(err => {
        res.send('4014');
        return err;
    });
}

function newest(res) {
    const baseUrl = 'https://animekisa.tv';
    got(baseUrl).then(response => {

        const dom = new JSDOM(response.body);
        const current = new JSDOM(dom.window.document.getElementsByClassName('listAnimes').item(0).innerHTML);

        var r = new Array();

        for (let i = 0; i < current.window.document.getElementsByClassName('an').length; i++) {
            const href = current.window.document.getElementsByClassName('an').item(i).getAttribute('href');
            if (!r.toString().includes(href) && !href.endsWith('/'))
                r.push(baseUrl + href);
        }

        res.send(r);
    })
}

function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

function getLinkFromPortal(portalDownload, res, pDwDom) {
    got(portalDownload).then(r => {
        pDwDom = new JSDOM(new JSDOM(r.body).window.document.getElementsByTagName('span').item(0).outerHTML).window.document.getElementsByTagName('a');
        console.log(pDwDom.length);

        if (pDwDom.length >= 1) {
            for (let m = 0; m < pDwDom.length; m++) {

                if (pDwDom.item(m).attributes.length > 0) {
                    const videoId = makeid(5);
                    io.addKey(videoId, pDwDom.item(m).getAttribute('href').textContent);
                    responseCode = videoId;
                    requestAnother = false;
                    res.send(videoId);
                }
            }
        }else (
            getLinkFromPortal(portalDownload, res, pDwDom)
        )
    })
}