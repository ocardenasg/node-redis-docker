const fetch = require('node-fetch');

const fetcher = ({ API }) => {
  return async (pathname, options = {}) => {
    const request = await fetch(`${API}${pathname}`, { ...options });
    const data = await request.json();
    return data;
  };
};

module.exports = fetcher;
