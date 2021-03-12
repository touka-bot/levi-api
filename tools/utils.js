function extractUrls(html) {
    const urlRegex = "((https?|ftp|gopher|telnet|file):((//)|(\\\\))+[\\w\\d:#@%/;$()~_?\\+-=\\\\\\.&]*)";
    return html.match(urlRegex);
}

module.exports = {
    extractUrls(html) {
        return extractUrls(html)
    }
}