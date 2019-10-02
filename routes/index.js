const express = require('express')
const router = express.Router()
const fs = require('fs')
const apiRoutesPath = `${__dirname}/api`
const { removeExtensionFromFile } = require('../middleware/utils')

// Loop routes path and loads every file as a route except this file and Auth route
fs.readdirSync(apiRoutesPath).filter(file => {
  // Take filename and remove last part (extension)
  const routeFile = removeExtensionFromFile(file)
  // Prevents loading of this file and auth file
  return routeFile !== 'index' && routeFile !== 'auth'
    ? router.use(`/api/${routeFile}`, require(`./api/${routeFile}`))
    : ''
})

/*
 * Setup routes for index
 */
router.get('/', (req, res) => {
  res.render('index')
})

/*
 * Handle 404 error
 */
router.use('*', (req, res) => {
  res.status(404).json({
    errors: {
      msg: 'URL_NOT_FOUND'
    }
  })
})

module.exports = router