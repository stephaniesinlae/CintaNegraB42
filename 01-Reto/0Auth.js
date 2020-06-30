const request = require("request");

const options = {
    'method': 'GET',
    'url': 'https://api.petfinder.com/v2/animals?access_token=M2yXk1koOqLUQ4wmYRELBkw1NJ11pv69mqHbIduf',
    'headers': {
    }
};
request(options, (error, response) => {
    if (error) throw new Error(error);
    console.log(response.body);
});
