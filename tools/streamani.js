const CryptoJS = require('crypto-js')

// Extracted from the website to encrypt the id
const ENCRYPTION_KEY = "25746538592938396764662879833288"

/**
 * Returns the finished url for streamani to request video url
 * @param {number} videoId - String length
 * @returns {String} streamani url
 */
function getRequestUrl(videoId) {
    const data = getIdAndTime(videoId)
    return `https://streamani.net/encrypt-ajax.php?id=${data[0]}&time=${data[1]}`
}

/**
 * Returns the id and time as strings to request the googleapis url
 * @returns {[String, String]} [videoID, time] 
 */
function getIdAndTime(videoId) {
    const generatedIv = randomNumString(16)
    const words = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY)
    const iv = CryptoJS.enc.Utf8.parse(generatedIv)

    var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES)

    const cypher = AES.encrypt(videoId, words, {
        "iv": iv
    });

    return [cypher.toString(), randomNumString(2) + generatedIv + randomNumString(2)]
}

/**
 * Creates a string with fixed length filled with random numbers
 * @param {number} lenght - generated string length
 * @returns {String} - string of numbers
 */
function randomNumString(lenght) {
    var x = ''
    while (lenght > 0) {
        lenght--
        x += Math.floor(Math.random() * 10)
    }
    return x;
}

module.exports = {
    getRequestUrl,
    getIdAndTime
}