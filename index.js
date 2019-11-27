const app = require('express')();
const bodyParser = require('body-parser');

const cache = require('./app/cache');
const resolver = require('./app/resolver');

const jsonpResolver = resolver({
  API: 'https://jsonplaceholder.typicode.com/',
});
const swapiResolver = resolver({ API: 'https://swapi.co/api/' });

// ports
const PORT = process.env.PORT || 5000;

// middlewares
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

// index route
app.get('/', (req, res) =>
  res
    .status(200)
    .send('Cache with Redis and Nodejs!')
    .end(),
);

// jsonplaceholder endpoints
app.get('/jsonp/*', cache, jsonpResolver);

// swapi endpoints
app.get('/swapi/*', cache, swapiResolver);

// listen on port
app.listen(PORT, () => console.log(`Running on port: ${PORT}`));
