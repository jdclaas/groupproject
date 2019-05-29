

const unirest = require('unirest');

const response = await unirest.get('https://listen-api.listennotes.com/api/v2/genres')
  .header('X-ListenAPI-Key', '37893efa5c564678ad4f7b9c78cf34ef')
response.toJSON();