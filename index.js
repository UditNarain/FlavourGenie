const https = require('https');
const apiKey = 'a2932d0d96614139baa8cca9dc754af2';

module.exports = async function (context, req) {
    const query = req.query.q;
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;
    
    https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            context.res = {
                body: JSON.parse(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            context.done();
        });
    }).on('error', (err) => {
        context.res = {
            status: 500,
            body: err.message
        };
        context.done();
    });
};