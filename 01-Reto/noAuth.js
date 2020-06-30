const request = require("request");

const BR_BA_QUOTES = 'https://breaking-bad-quotes.herokuapp.com/v1/quotes';
request.get(BR_BA_QUOTES, (err, res, body) => {
    if (res.statusCode === 200) {
        const json = JSON.parse(body);
        console.log('La frase que te define hoy es:\n' + (json[0].quote) + '\n-' +(json[0].author));
        }
    else console.log(res.statusCode, err);
});