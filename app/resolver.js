const resolver = ({ API }) => {
  // create custom fetcher
  const jsonpApi = require('./api')({ API });

  // custom resolver for api
  return async (req, res) => {
    try {
      const { apiPath } = req;
      const data = await jsonpApi(apiPath);
      res
        .status(200)
        .json(data)
        .setCache(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error!');
      return null;
    }
  };
};

module.exports = resolver;
