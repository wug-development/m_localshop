'use strict'
const merge = require('webpack-merge')

module.exports = merge({
  NODE_ENV: '"development"',
  APIW_URL: '"/apiw"',
  APIS_URL: '"/apis"'
})
