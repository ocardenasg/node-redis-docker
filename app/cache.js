const redis = require('redis');
const bluebird = require('bluebird');

// promises
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// redis url
const { REDIS_URL = 'redis://localhost:6379' } = process.env;

// redis client
const client = redis.createClient(REDIS_URL);

/**
 * Time to live in seconds
 * eg: 60 = 1 min
 */
const TIME_TO_LIVE = 60;

const cache = async (req, res, next) => {
  try {
    const { '0': path } = req.params;
    const cacheBody = await client.getAsync(path);

    // response info if exist in cache
    if (cacheBody) {
      const data = JSON.parse(cacheBody);
      return res.status(200).json(data);
    }

    req.apiPath = path;
    res.setCache = (data) =>
      client.setex(path, TIME_TO_LIVE, JSON.stringify(data));

    next();
  } catch (error) {
    console.trace(error);
    return res.status(500);
  }
};

module.exports = cache;
