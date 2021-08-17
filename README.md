# levi-api
[![Support Server](https://img.shields.io/discord/591914197219016707.svg?label=Discord&logo=Discord&colorB=7289da&style=for-the-badge)](https://discord.com/invite/tvDXKZSzqd)

This API is used to retrive Animes for the Touka Discord bot.

# How to run
Steps:
- navigate with a terminal into the project root folder.
- run `npm install`
- run `node app.js`
- API should be up now

The API is listening on port 3000

## Additional steps
If you want to use Watchtogether you should change the API key.
The key is located in `routes/routes.js`

```javascript
const data = JSON.stringify({
    "w2g_api_key": "YOUR KEY HERE",
    "share": url
})
```