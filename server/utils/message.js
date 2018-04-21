const moment = require('moment');

const generateMessage = (from, text) => ({
  from,
  text,
  createdAt: moment.valueOf()
});

const generateLocationMessage = (from, lat, lng) => ({
  from,
  url: `https://www.google.com/maps/@${lat},${lng},15z`,
  createdAt: moment.valueOf()
});

module.exports = { generateMessage, generateLocationMessage };
